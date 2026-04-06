import {
  clearAdminSessionCookie,
  getConfiguredAdminEmail,
  setAdminSessionCookie,
  verifyAdminCredentials,
  AuthError,
} from '../_lib/admin-auth.js';
import {normalizeRequestBody, type ApiRequest, type ApiResponse} from '../_lib/http.js';
import type {
  AdminLoginRequest,
  AdminLoginResponse,
} from '../../src/features/photos/shared.js';

export default function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      ok: false,
      authenticated: false,
      message: 'Method not allowed.',
    } satisfies AdminLoginResponse);
  }

  try {
    const body = normalizeRequestBody(req.body) as Partial<AdminLoginRequest> | null;
    const email = body?.email?.trim().toLowerCase() ?? '';
    const password = body?.password ?? '';

    if (!email || !password) {
      clearAdminSessionCookie(res);

      return res.status(400).json({
        ok: false,
        authenticated: false,
        message: 'Enter your email and password.',
      } satisfies AdminLoginResponse);
    }

    if (!verifyAdminCredentials(email, password)) {
      clearAdminSessionCookie(res);

      return res.status(401).json({
        ok: false,
        authenticated: false,
        message: 'Incorrect email or password.',
      } satisfies AdminLoginResponse);
    }

    setAdminSessionCookie(res, email);

    return res.status(200).json({
      ok: true,
      authenticated: true,
      email: getConfiguredAdminEmail(),
    } satisfies AdminLoginResponse);
  } catch (error) {
    const message =
      error instanceof AuthError
        ? error.message
        : 'We could not log you in right now.';

    const statusCode = error instanceof AuthError ? error.statusCode : 500;

    return res.status(statusCode).json({
      ok: false,
      authenticated: false,
      message,
    } satisfies AdminLoginResponse);
  }
}
