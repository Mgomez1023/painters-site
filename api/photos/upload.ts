import {handleUpload} from '@vercel/blob/client';
import {
  AuthError,
  requireAdminSession,
} from '../_lib/admin-auth.js';
import {normalizeRequestBody, type ApiRequest, type ApiResponse} from '../_lib/http.js';
import {
  allowedPhotoContentTypes,
  buildPhotoImagePath,
  isAllowedPhotoContentType,
  maxPhotoUploadBytes,
} from '../../src/features/photos/shared.js';

type UploadClientPayload = {
  id: string;
  fileName: string;
  contentType: string;
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      ok: false,
      message: 'Method not allowed.',
    });
  }

  try {
    requireAdminSession(req);

    const body = normalizeRequestBody(req.body);

    if (!body) {
      return res.status(400).json({
        ok: false,
        message: 'Upload details are required.',
      });
    }

    const jsonResponse = await handleUpload({
      body: body as Parameters<typeof handleUpload>[0]['body'],
      request: req as Parameters<typeof handleUpload>[0]['request'],
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const payload = parseUploadClientPayload(clientPayload);
        const expectedPathname = buildPhotoImagePath(payload.id, payload.fileName);

        if (pathname !== expectedPathname) {
          throw new Error('Upload path validation failed.');
        }

        if (!isAllowedPhotoContentType(payload.contentType)) {
          throw new Error('Only JPG, PNG, WEBP, and AVIF images are allowed.');
        }

        return {
          addRandomSuffix: false,
          allowedContentTypes: [...allowedPhotoContentTypes],
          maximumSizeInBytes: maxPhotoUploadBytes,
        };
      },
    });

    return res.status(200).json(jsonResponse);
  } catch (error) {
    const statusCode = error instanceof AuthError ? error.statusCode : 400;
    const message =
      error instanceof Error
        ? error.message
        : 'We could not start the photo upload.';

    return res.status(statusCode).json({
      ok: false,
      message,
    });
  }
}

function parseUploadClientPayload(clientPayload: string | null): UploadClientPayload {
  if (!clientPayload) {
    throw new Error('Upload details are missing.');
  }

  let payload: Partial<UploadClientPayload>;

  try {
    payload = JSON.parse(clientPayload) as Partial<UploadClientPayload>;
  } catch {
    throw new Error('Upload details are invalid.');
  }

  if (
    typeof payload.id !== 'string' ||
    typeof payload.fileName !== 'string' ||
    typeof payload.contentType !== 'string'
  ) {
    throw new Error('Upload details are invalid.');
  }

  return {
    id: payload.id.trim(),
    fileName: payload.fileName.trim(),
    contentType: payload.contentType.trim(),
  };
}
