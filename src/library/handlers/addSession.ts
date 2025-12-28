import { accessPostgreSQL } from '@library/utilities';

interface Props {
  session: {
    id: string;
    user_id: string;
  };
}

export default async function addSession({
  session,
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
      INSERT INTO sessions (
        id,
        user_id
      )
      VALUES (
        $1,
        $2
      )
      RETURNING *;
    `;

    const values = [session.id, session.user_id];

    const result = await client.query(query, values);

    await client.query('COMMIT');

    return {
      ok: true,
      data: { session: result.rows[0] },
    };
  } catch (e: unknown) {
    if (client) {
      await client.query('ROLLBACK');
    }

    const error = e as Error;

    return {
      ok: false,
      error: {
        message: 'Failed to add session.',
        origin: 'handlers',
        method: 'addSession',
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
