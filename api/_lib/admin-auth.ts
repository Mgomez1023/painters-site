import {createHmac, timingSafeEqual} from 'node:crypto';
import type {ApiRequest, ApiResponse} from './http.js';

const adminSessionCookieName = 'gomez_admin_session';
const adminSessionTtlSeconds = 60 * 60 * 24 * 14;

type AdminSession = {
  email: string;
  exp: number;
};

type AuthCredentials = {
  email: string;
  password: string;
  sessionSecret: string;
};

export class AuthError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 401) {
    super(message);
    this.name = 'AuthError';
    this.statusCode = statusCode;
  }
}

export function getConfiguredAdminEmail() {
  return getAuthCredentials().email;
}

export function verifyAdminCredentials(email: string, password: string) {
  const configuredCredentials = getAuthCredentials();

  return (
    safeCompare(email.trim().toLowerCase(), configuredCredentials.email) &&
    safeCompare(password, configuredCredentials.password)
  );
}

export function setAdminSessionCookie(res: ApiResponse, email: string) {
  const session: AdminSession = {
    email,
    exp: Date.now() + adminSessionTtlSeconds * 1000,
  };

  const encodedPayload = Buffer.from(JSON.stringify(session)).toString('base64url');
  const signature = signValue(encodedPayload);

  res.setHeader(
    'Set-Cookie',
    serializeCookie(adminSessionCookieName, `${encodedPayload}.${signature}`, {
      httpOnly: true,
      maxAge: adminSessionTtlSeconds,
      path: '/',
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
    }),
  );
}

export function clearAdminSessionCookie(res: ApiResponse) {
  res.setHeader(
    'Set-Cookie',
    serializeCookie(adminSessionCookieName, '', {
      httpOnly: true,
      maxAge: 0,
      path: '/',
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
    }),
  );
}

export function getAdminSession(req: ApiRequest) {
  const cookieHeader = req.headers?.cookie;
  const cookieValue = parseCookieHeader(cookieHeader)[adminSessionCookieName];

  if (!cookieValue) {
    return null;
  }

  const [encodedPayload, signature] = cookieValue.split('.');

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signValue(encodedPayload);

  if (!safeCompare(signature, expectedSignature)) {
    return null;
  }

  try {
    const session = JSON.parse(
      Buffer.from(encodedPayload, 'base64url').toString('utf8'),
    ) as AdminSession;

    if (
      typeof session.email !== 'string' ||
      typeof session.exp !== 'number' ||
      session.exp <= Date.now()
    ) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export function requireAdminSession(req: ApiRequest) {
  const session = getAdminSession(req);

  if (!session) {
    throw new AuthError('Please log in to manage portfolio photos.');
  }

  return session;
}

function getAuthCredentials(): AuthCredentials {
  const email = process.env.PORTFOLIO_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.PORTFOLIO_ADMIN_PASSWORD;
  const sessionSecret = process.env.PORTFOLIO_ADMIN_SESSION_SECRET;

  if (!email || !password || !sessionSecret) {
    throw new AuthError(
      'Portfolio admin authentication is not configured on the server.',
      500,
    );
  }

  return {
    email,
    password,
    sessionSecret,
  };
}

function signValue(value: string) {
  return createHmac('sha256', getAuthCredentials().sessionSecret)
    .update(value)
    .digest('base64url');
}

function parseCookieHeader(
  headerValue: string | string[] | undefined,
): Record<string, string> {
  const normalizedHeader = Array.isArray(headerValue)
    ? headerValue.join('; ')
    : headerValue ?? '';

  return normalizedHeader
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce<Record<string, string>>((cookies, part) => {
      const separatorIndex = part.indexOf('=');

      if (separatorIndex === -1) {
        return cookies;
      }

      const key = part.slice(0, separatorIndex).trim();
      const value = part.slice(separatorIndex + 1).trim();

      cookies[key] = decodeURIComponent(value);
      return cookies;
    }, {});
}

function serializeCookie(
  name: string,
  value: string,
  options: {
    httpOnly?: boolean;
    maxAge?: number;
    path?: string;
    sameSite?: 'Lax' | 'Strict' | 'None';
    secure?: boolean;
  },
) {
  const parts = [`${name}=${encodeURIComponent(value)}`];

  if (typeof options.maxAge === 'number') {
    parts.push(`Max-Age=${Math.max(0, Math.floor(options.maxAge))}`);
  }

  parts.push(`Path=${options.path ?? '/'}`);

  if (options.httpOnly) {
    parts.push('HttpOnly');
  }

  if (options.sameSite) {
    parts.push(`SameSite=${options.sameSite}`);
  }

  if (options.secure) {
    parts.push('Secure');
  }

  return parts.join('; ');
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}
