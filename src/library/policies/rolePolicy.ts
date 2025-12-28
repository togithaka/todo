interface Props {
  userRole: 'superuser' | 'user';
  targetRole: 'superuser' | 'user';
}

export default function rolePolicy({
  userRole,
  targetRole,
}: Props): API.Success | API.Failure {
  if (!userRole) {
    return {
      ok: false,
      error: {
        message: "The user's role is required.'",
        origin: 'policies',
        method: 'rolePolicy',
      },
    };
  }

  if (!targetRole) {
    return {
      ok: false,
      error: {
        message: 'The target role is required.',
        origin: 'policies',
        method: 'rolePolicy',
      },
    };
  }

  if (userRole !== targetRole) {
    return {
      ok: false,
      error: {
        message: `Access denied, ${userRole} role cannot access ${targetRole} role resources.`,
        origin: 'policies',
        method: 'rolePolicy',
      },
    };
  }

  return { ok: true };
}
