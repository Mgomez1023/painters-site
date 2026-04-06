import {getAdminSession, getConfiguredAdminEmail, AuthError} from '../_lib/admin-auth.js';
import type {ApiRequest, ApiResponse} from '../_lib/http.js';
import type {AdminSessionResponse} from '../../src/features/photos/shared.js';

export default function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({
      ok: false,
      authenticated: false,
      message: 'Method not allowed.',
    } satisfies AdminSessionResponse);
  }

  try {
    const session = getAdminSession(req);

    if (!session) {
      return res.status(200).json({
        ok: true,
        authenticated: false,
      } satisfies AdminSessionResponse);
    }

    return res.status(200).json({
      ok: true,
      authenticated: true,
      email: getConfiguredAdminEmail(),
    } satisfies AdminSessionResponse);
  } catch (error) {
    const message =
      error instanceof AuthError
        ? error.message
        : 'We could not verify the admin session.';

    const statusCode = error instanceof AuthError ? error.statusCode : 500;

    return res.status(statusCode).json({
      ok: false,
      authenticated: false,
      message,
    } satisfies AdminSessionResponse);
  }
}
