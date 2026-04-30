const BREVO_API_BASE_URL = 'https://api.brevo.com/v3';

type BrevoConfig = {
  apiKey: string;
  listId: number;
};

export type EmailSignupInput = {
  email: string;
  firstName?: string;
  sourcePath?: string;
  sourceTitle?: string;
};

type BrevoErrorBody = {
  code?: string;
  message?: string;
};

type BrevoRequestOptions = {
  method: 'POST' | 'PUT';
  path: string;
  body: Record<string, unknown>;
  config: BrevoConfig;
};

const signupAttributeDefinitions = [
  {name: 'FIRSTNAME', type: 'text'},
  {name: 'SOURCE_PATH', type: 'text'},
  {name: 'SOURCE_TITLE', type: 'text'},
  {name: 'SIGNUP_SOURCE', type: 'text'},
  {name: 'OPTED_IN', type: 'boolean'},
] as const;

export class BrevoSignupError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = 'BrevoSignupError';
  }
}

export async function upsertBrevoEmailSignup(input: EmailSignupInput) {
  const config = getBrevoConfig();
  const attributes = buildSignupAttributes(input);

  await ensureSignupAttributes(config);

  try {
    await createOrUpdateBrevoContact(input.email, attributes, config);
  } catch (error) {
    if (!shouldRetryWithoutAttributes(error)) {
      throw error;
    }

    console.error('Brevo rejected signup attributes. Retrying contact save without attributes.', {
      error,
      email: input.email,
      attributeNames: Object.keys(attributes),
    });

    await createOrUpdateBrevoContact(input.email, {}, config);
  }
}

function getBrevoConfig(): BrevoConfig {
  const apiKey = process.env.BREVO_API_KEY?.trim();
  const rawListId = process.env.BREVO_EMAIL_LIST_ID?.trim();
  const listId = rawListId ? Number(rawListId) : Number.NaN;

  if (!apiKey || !rawListId || !Number.isInteger(listId) || listId <= 0) {
    throw new BrevoSignupError(
      500,
      'Email signup is not configured. Missing BREVO_API_KEY or BREVO_EMAIL_LIST_ID.',
    );
  }

  return {
    apiKey,
    listId,
  };
}

function buildSignupAttributes(input: EmailSignupInput) {
  const attributes: Record<string, string | boolean> = {
    SIGNUP_SOURCE: 'website',
    OPTED_IN: true,
  };

  if (input.firstName) {
    attributes.FIRSTNAME = input.firstName;
  }

  if (input.sourcePath) {
    attributes.SOURCE_PATH = input.sourcePath;
  }

  if (input.sourceTitle) {
    attributes.SOURCE_TITLE = input.sourceTitle;
  }

  return attributes;
}

async function ensureSignupAttributes(config: BrevoConfig) {
  await Promise.all(
    signupAttributeDefinitions.map(async (attribute) => {
      try {
        await brevoRequest({
          method: 'POST',
          path: `/contacts/attributes/normal/${attribute.name}`,
          body: {
            type: attribute.type,
          },
          config,
        });
      } catch (error) {
        if (!isAlreadyExistsError(error)) {
          console.error('Could not ensure Brevo contact attribute.', {
            attribute: attribute.name,
            error,
          });
        }
      }
    }),
  );
}

async function createOrUpdateBrevoContact(
  email: string,
  attributes: Record<string, string | boolean>,
  config: BrevoConfig,
) {
  const body: Record<string, unknown> = {
    email,
    listIds: [config.listId],
    updateEnabled: true,
    emailBlacklisted: false,
  };

  if (Object.keys(attributes).length) {
    body.attributes = attributes;
  }

  await brevoRequest({
    method: 'POST',
    path: '/contacts',
    body,
    config,
  });
}

async function brevoRequest({method, path, body, config}: BrevoRequestOptions) {
  const response = await fetch(`${BREVO_API_BASE_URL}${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-key': config.apiKey,
    },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    return response.status === 204 ? null : readBrevoBody(response);
  }

  const errorBody = await readBrevoBody(response);

  throw new BrevoSignupError(
    response.status,
    getBrevoErrorMessage(errorBody) || 'Brevo API request failed.',
    {
      path,
      status: response.status,
      errorBody,
    },
  );
}

async function readBrevoBody(response: Response): Promise<BrevoErrorBody | null> {
  try {
    return (await response.json()) as BrevoErrorBody;
  } catch {
    return null;
  }
}

function getBrevoErrorMessage(errorBody: BrevoErrorBody | null) {
  return errorBody?.message?.trim() || errorBody?.code?.trim() || '';
}

function isAlreadyExistsError(error: unknown) {
  if (!(error instanceof BrevoSignupError)) {
    return false;
  }

  const message = error.message.toLowerCase();

  return (
    error.statusCode === 400 &&
    (message.includes('already') || message.includes('duplicate'))
  );
}

function shouldRetryWithoutAttributes(error: unknown) {
  if (!(error instanceof BrevoSignupError)) {
    return false;
  }

  const message = error.message.toLowerCase();

  return (
    error.statusCode === 400 &&
    (message.includes('attribute') ||
      message.includes('invalid_parameter') ||
      message.includes('not found'))
  );
}
