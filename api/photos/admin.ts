import {
  AuthError,
  requireAdminSession,
} from '../_lib/admin-auth.js';
import {
  deletePortfolioPhoto,
  savePortfolioPhotoMetadata,
} from '../_lib/photos.js';
import {normalizeRequestBody, type ApiRequest, type ApiResponse} from '../_lib/http.js';
import type {
  DeletePhotoRequest,
  DeletePhotoResponse,
  SavePhotoMetadataRequest,
  SavePhotoMetadataResponse,
} from '../../src/features/photos/shared.js';

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    res.setHeader('Allow', ['POST', 'DELETE']);
    return res.status(405).json({
      ok: false,
      message: 'Method not allowed.',
    });
  }

  try {
    requireAdminSession(req);

    if (req.method === 'POST') {
      const body = normalizeRequestBody(req.body) as SavePhotoMetadataRequest | null;
      const id = body?.id?.trim() ?? '';
      const pathname = body?.pathname?.trim() ?? '';

      if (!id || !pathname) {
        return res.status(400).json({
          ok: false,
          message: 'Photo details are required.',
        } satisfies SavePhotoMetadataResponse);
      }

      const photo = await savePortfolioPhotoMetadata({
        id,
        pathname,
        caption: body?.caption,
      });

      return res.status(200).json({
        ok: true,
        photo,
      } satisfies SavePhotoMetadataResponse);
    }

    const body = normalizeRequestBody(req.body) as DeletePhotoRequest | null;
    const id = body?.id?.trim() ?? '';
    const pathname = body?.pathname?.trim() ?? '';

    if (!id || !pathname) {
      return res.status(400).json({
        ok: false,
        message: 'Photo details are required.',
      } satisfies DeletePhotoResponse);
    }

    await deletePortfolioPhoto({
      id,
      pathname,
    });

    return res.status(200).json({
      ok: true,
    } satisfies DeletePhotoResponse);
  } catch (error) {
    const statusCode =
      error instanceof AuthError ? error.statusCode : 500;
    const message =
      error instanceof Error
        ? error.message
        : 'We could not update the photo library right now.';

    return res.status(statusCode).json({
      ok: false,
      message,
    });
  }
}
