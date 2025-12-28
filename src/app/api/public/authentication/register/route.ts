import { addUser, getUser } from '@library/handlers';
import {
  emailPolicy,
  jsonPolicy,
  originPolicy,
  passwordPolicy,
} from '@library/policies';
import { generateHash, generateUuid } from '@library/utilities';
import { NextRequest, NextResponse } from 'next/server';

export async function OPTIONS(request: NextRequest) {
  const enforceOriginPolicy = await originPolicy(request);
  if (!enforceOriginPolicy.ok) {
    return NextResponse.json(enforceOriginPolicy, {
      status: 400,
    });
  }

  return new NextResponse(null, {
    status: 204,
    headers: enforceOriginPolicy.data.headers,
  });
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<API.Success | API.Failure>> {
  try {
    const enforceOriginPolicy = await originPolicy(request);
    if (!enforceOriginPolicy.ok) {
      return NextResponse.json(enforceOriginPolicy, {
        status: 400,
      });
    }

    const enforceJsonPolicy = await jsonPolicy(request);
    if (!enforceJsonPolicy.ok) {
      return NextResponse.json(enforceJsonPolicy, {
        status: 400,
        headers: enforceOriginPolicy.data.headers,
      });
    }

    const body = enforceJsonPolicy.data;

    const enforceEmailPolicy = emailPolicy({
      email: body.email,
      returnFieldName: 'email',
    });
    if (!enforceEmailPolicy.ok) {
      return NextResponse.json(enforceEmailPolicy, {
        status: 400,
        headers: enforceOriginPolicy.data.headers,
      });
    }

    const enforcePasswordPolicy = passwordPolicy({
      password: body.password,
      confirmPassword: body.confirmPassword,
      type: 'register',
    });
    if (!enforcePasswordPolicy.ok) {
      return NextResponse.json(enforcePasswordPolicy, {
        status: 400,
        headers: enforceOriginPolicy.data.headers,
      });
    }

    const confirmUser = await getUser({
      by: {
        email: enforceEmailPolicy.data.email,
      },
    });
    if (confirmUser.ok) {
      return NextResponse.json({
        ok: false,
        error: {
          message: 'The email already exists. Login or try another email.',
          origin: 'routes',
          method: 'POST',
          field: 'email',
        },
        status: 400,
        headers: enforceOriginPolicy.data.headers,
      });
    }

    const uuid = generateUuid();
    if (!uuid.ok) {
      return NextResponse.json(uuid, {
        status: 400,
        headers: enforceOriginPolicy.data.headers,
      });
    }

    const hash = generateHash({ value: enforcePasswordPolicy.data.password });
    if (!hash.ok) {
      return NextResponse.json(hash, {
        status: 400,
        headers: enforceOriginPolicy.data.headers,
      });
    }

    const user = await addUser({
      user: {
        id: uuid.data.uuid,
        email: enforceEmailPolicy.data.email,
        hash: hash.data.hash,
        role: 'user',
      },
    });
    if (!user.ok) {
      return NextResponse.json(user, {
        status: 400,
        headers: enforceOriginPolicy.data.headers,
      });
    }

    return NextResponse.json(
      { ok: true },
      { status: 200, headers: enforceOriginPolicy.data.headers }
    );
  } catch (e: unknown) {
    const error = e as Error;
    return NextResponse.json(
      {
        ok: false,
        error: {
          message: 'Internal server error.',
          origin: 'routes',
          method: 'POST',
          raw: {
            name: error.name,
            message: error.message,
          },
        },
      },
      { status: 500 }
    );
  }
}
