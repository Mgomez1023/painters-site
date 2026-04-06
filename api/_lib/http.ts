export type ApiRequest = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string | string[] | undefined>;
};

export type ApiResponse = {
  setHeader: (name: string, value: string | string[]) => void;
  status: (code: number) => {
    json: (body: Record<string, unknown>) => void;
  };
};

export function normalizeRequestBody(body: unknown) {
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
