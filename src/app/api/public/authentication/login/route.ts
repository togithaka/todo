import {
  addSession,
  editSession,
  editUser,
  getSession,
  getUser,
} from '@library/handlers';
import {
  cookiePolicy,
  emailPolicy,
  jsonPolicy,
  loginPolicy,
  originPolicy,
  passwordPolicy,
} from '@library/policies';
import { enCipher, generateUuid, verifyHash } from '@library/utilities';
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
      return NextResponse.json(enforceOriginPolicy, { status: 400 });
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
      type: 'login',
    });
    if (!enforcePasswordPolicy.ok) {
      return NextResponse.json(enforcePasswordPolicy, {
        status: 400,
        headers: enforceOriginPolicy.data.headers,
      });
    }

    const user = await getUser({
      by: { email: enforceEmailPolicy.data.email },
    });
    if (!user.ok) {
      return NextResponse.json(user, {
        status: 400,
        headers: enforceOriginPolicy.data.headers,
      });
    }

    const enforceLoginPolicy = loginPolicy({
      attempts: user.data.user.password_reset_attempts,
    });
    if (!enforceLoginPolicy.ok) {
      return NextResponse.json(enforceLoginPolicy, {
        status: 400,
        headers: enforceOriginPolicy.data.headers,
      });
    }

    const checkHash = verifyHash({
      hash: user.data.user.hash,
      value: enforcePasswordPolicy.data.password,
      remainingAttempts: Number(user.data.user.password_reset_attempts) - 1,
    });
    if (!checkHash.ok) {
      const decrementPasswordResetAttempts = await editUser({
        by: { id: user.data.user.id },
        user: {
          password_reset_attempts:
            Number(user.data.user.password_reset_attempts) - 1,
        },
      });
      if (!decrementPasswordResetAttempts.ok) {
        return NextResponse.json(decrementPasswordResetAttempts, {
          status: 400,
          headers: enforceOriginPolicy.data.headers,
        });
      }

      return NextResponse.json(checkHash, {
        status: 400,
        headers: enforceOriginPolicy.data.headers,
      });
    }

    const resetPasswordResetAttempts = await editUser({
      by: { id: user.data.user.id },
      user: { password_reset_attempts: 3 },
    });
    if (!resetPasswordResetAttempts.ok) {
      return NextResponse.json(resetPasswordResetAttempts, {
        status: 400,
        headers: enforceOriginPolicy.data.headers,
      });
    }

    const newUuid = generateUuid();
    if (!newUuid.ok) {
      return NextResponse.json(newUuid, {
        status: 400,
        headers: enforceOriginPolicy.data.headers,
      });
    }

    const existingSession = await getSession({
      by: { user_id: user.data.user.id },
    });
    if (!existingSession.ok) {
      const newSession = await addSession({
        session: { id: newUuid.data.uuid, user_id: user.data.user.id },
      });
      if (!newSession.ok) {
        return NextResponse.json(newSession, {
          status: 400,
          headers: enforceOriginPolicy.data.headers,
        });
      }
    } else {
      const updateSession = await editSession({
        by: { user_id: user.data.user.id },
        session: {
          id: newUuid.data.uuid,
        },
      });
      if (!updateSession.ok) {
        return NextResponse.json(updateSession, {
          status: 400,
          headers: enforceOriginPolicy.data.headers,
        });
      }
    }

    const encipherSessionId = enCipher({ message: newUuid.data.uuid });
    if (!encipherSessionId.ok) {
      return NextResponse.json(encipherSessionId, {
        status: 400,
        headers: enforceOriginPolicy.data.headers,
      });
    }

    const createSessionIdCookie = await cookiePolicy({
      action: 'create',
      name: 'session_id',
      value: encipherSessionId.data.cipher,
    });
    if (!createSessionIdCookie.ok) {
      return NextResponse.json(createSessionIdCookie, {
        status: 400,
        headers: enforceOriginPolicy.data.headers,
      });
    }

    return NextResponse.json(
      { ok: true, data: { role: user.data.user.role } },
      {
        status: 200,
        headers: enforceOriginPolicy.data.headers,
      }
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
