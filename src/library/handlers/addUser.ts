import { accessPostgreSQL } from '@library/utilities';

interface Props {
  user: {
    id: string;
    email: string;
    hash: string;
    role?: string;
    password_otp?: string | null;
    password_otp_expiry?: string | null;
    password_reset_attempts?: number | null;
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    date_of_birth?: string;
    sex?: string;
    phone?: string;
    country?: string;
    avatar_url?: string;
  };
}

export default async function addUser({
  user,
}: Props): Promise<API.Success | API.Failure> {
  const postgres = accessPostgreSQL();

  if (!postgres.ok) {
    return {
      ok: false,
      error: {
        message: postgres.error.message,
        origin: postgres.error.origin,
        method: postgres.error.method,
        raw: {
          name: postgres.error.raw?.name,
          message: postgres.error.raw?.message,
        },
      },
    };
  }

  const client = await postgres.data.pool.connect();

  try {
    await client.query('BEGIN');

    const query = `
      INSERT INTO users (
        id,
        email,
        hash,
        role,
        password_otp,
        password_otp_expiry,
        password_reset_attempts,
        first_name,
        middle_name,
        last_name,
        date_of_birth,
        sex,
        phone,
        country,
        avatar_url
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11,
        $12,
        $13,
        $14,
        $15
      )
      RETURNING *;
    `;

    const values = [
      user.id,
      user.email,
      user.hash,
      user.role ?? null,
      user.password_otp ?? null,
      user.password_otp_expiry ?? null,
      user.password_reset_attempts ?? 3,
      user.first_name ?? null,
      user.middle_name ?? null,
      user.last_name ?? null,
      user.date_of_birth ?? null,
      user.sex ?? null,
      user.phone ?? null,
      user.country ?? null,
      user.avatar_url ?? null,
    ];

    const result = await client.query(query, values);

    await client.query('COMMIT');

    return {
      ok: true,
      data: { user: result.rows[0] },
    };
  } catch (e: unknown) {
    if (client) {
      await client.query('ROLLBACK');
    }

    const error = e as Error;

    return {
      ok: false,
      error: {
        message: 'Failed to add user.',
        origin: 'handlers',
        method: 'addUser',
        raw: {
          name: error.name,
          message: error.message,
        },
      },
    };
  } finally {
    client.release();
  }
}
