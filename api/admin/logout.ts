import {clearAdminSessionCookie} from '../_lib/admin-auth.js';
import type {ApiRequest, ApiResponse} from '../_lib/http.js';
import type {AdminSessionResponse} from '../../src/features/photos/shared.js';

export default function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      ok: false,
      authenticated: false,
      message: 'Method not allowed.',
    } satisfies AdminSessionResponse);
  }

  clearAdminSessionCookie(res);

  return res.status(200).json({
    ok: true,
    authenticated: false,
  } satisfies AdminSessionResponse);
}
