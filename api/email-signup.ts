import {
  BrevoSignupError,
  upsertBrevoEmailSignup,
} from './_lib/brevo.js';
import {normalizeRequestBody, type ApiRequest, type ApiResponse} from './_lib/http.js';

type EmailSignupRequest = {
  email?: unknown;
  firstName?: unknown;
  sourcePath?: unknown;
  sourceTitle?: unknown;
  honeypot?: unknown;
};

type EmailSignupResponse = {
  ok: boolean;
  message: string;
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      ok: false,
      message: 'Method not allowed.',
    } satisfies EmailSignupResponse);
  }

  const parsed = parseEmailSignup(normalizeRequestBody(req.body));

  if (parsed.ok === false) {
    return res.status(parsed.statusCode).json({
      ok: false,
      message: parsed.message,
    } satisfies EmailSignupResponse);
  }

  try {
    await upsertBrevoEmailSignup(parsed.signup);

    return res.status(200).json({
      ok: true,
      message: 'Thanks — you’re on the list.',
    } satisfies EmailSignupResponse);
  } catch (error) {
    const statusCode = error instanceof BrevoSignupError ? error.statusCode : 500;
    const isConfigError =
      error instanceof BrevoSignupError &&
      error.message.toLowerCase().includes('not configured');

    console.error('Email signup failed.', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      details: error instanceof BrevoSignupError ? error.details : undefined,
    });

    return res.status(statusCode >= 400 && statusCode < 500 ? statusCode : 500).json({
      ok: false,
      message: isConfigError
        ? 'Email signup is not configured yet. Please try again later.'
        : 'We could not add you to the list right now. Please try again later.',
    } satisfies EmailSignupResponse);
  }
}

function parseEmailSignup(body: unknown):
  | {
      ok: true;
      signup: {
        email: string;
        firstName?: string;
        sourcePath?: string;
        sourceTitle?: string;
      };
    }
  | {
      ok: false;
      statusCode: number;
      message: string;
    } {
  if (!body || typeof body !== 'object') {
    return invalidSignup('Invalid request body.');
  }

  const input = body as EmailSignupRequest;
  const honeypot = getOptionalString(input.honeypot);

  if (honeypot) {
    return invalidSignup('Signup could not be accepted.');
  }

  const email = getOptionalString(input.email).toLowerCase();

  if (!email) {
    return invalidSignup('Please provide your email address.');
  }

  if (!isValidEmail(email)) {
    return invalidSignup('Please provide a valid email address.');
  }

  return {
    ok: true,
    signup: {
      email,
      firstName: getOptionalString(input.firstName),
      sourcePath: getOptionalString(input.sourcePath),
      sourceTitle: getOptionalString(input.sourceTitle),
    },
  };
}

function invalidSignup(message: string) {
  return {
    ok: false as const,
    statusCode: 400,
    message,
  };
}

function getOptionalString(value: unknown) {
  return typeof value === 'string' ? value.trim().slice(0, 500) : '';
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
