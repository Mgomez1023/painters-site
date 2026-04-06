import {
  buildSuccessMessage,
  parseContactSubmission,
  sendContactSubmissionEmail,
} from './_lib/contact-email';

type ApiRequest = {
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  setHeader: (name: string, value: string | string[]) => void;
  status: (code: number) => {
    json: (body: Record<string, unknown>) => void;
  };
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      ok: false,
      message: 'Method not allowed.',
    });
  }

  const parsedSubmission = parseContactSubmission(normalizeRequestBody(req.body));

  if (parsedSubmission.ok === false) {
    return res.status(parsedSubmission.statusCode).json({
      ok: false,
      message: parsedSubmission.message,
    });
  }

  try {
    await sendContactSubmissionEmail(parsedSubmission.submission);

    return res.status(200).json({
      ok: true,
      message: buildSuccessMessage(parsedSubmission.submission.formType),
    });
  } catch (error) {
    const statusCode =
      error instanceof Error &&
      'statusCode' in error &&
      typeof error.statusCode === 'number'
        ? error.statusCode
        : 500;

    const message =
      error instanceof Error
        ? error.message
        : 'We could not send your message right now. Please call or email us directly.';

    console.error('Failed to send contact submission email.', {
      error,
      message,
      requestBody: req.body,
    });

    return res.status(statusCode).json({
      ok: false,
      message,
    });
  }
}

function normalizeRequestBody(body: unknown) {
  if (typeof body === 'string') {
    return tryParseJson(body);
  }

  if (typeof Buffer !== 'undefined' && Buffer.isBuffer(body)) {
    return tryParseJson(body.toString('utf8'));
  }

  return body;
}

function tryParseJson(value: string) {
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return null;
  }
}
