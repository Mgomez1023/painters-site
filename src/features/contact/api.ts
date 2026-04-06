import {contactApiRoute} from './types';
import type {
  ContactSubmissionRequest,
  ContactSubmissionResponse,
} from './types';

const FALLBACK_ERROR_MESSAGE =
  'We could not send your message right now. Please call or email us directly.';

export async function submitContactSubmission(
  payload: ContactSubmissionRequest,
): Promise<ContactSubmissionResponse> {
  let response: Response;

  try {
    response = await fetch(contactApiRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(FALLBACK_ERROR_MESSAGE);
  }

  const responseBody = await readResponseBody(response);

  if (!response.ok || !responseBody?.ok) {
    throw new Error(responseBody?.message || FALLBACK_ERROR_MESSAGE);
  }

  return responseBody;
}

async function readResponseBody(
  response: Response,
): Promise<ContactSubmissionResponse | null> {
  try {
    return (await response.json()) as ContactSubmissionResponse;
  } catch {
    return null;
  }
}
