import {listPortfolioPhotos} from './_lib/photos.js';
import type {ApiRequest, ApiResponse} from './_lib/http.js';
import type {PortfolioPhotosResponse} from '../src/features/photos/shared.js';

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({
      ok: false,
      photos: [],
      message: 'Method not allowed.',
    } satisfies PortfolioPhotosResponse);
  }

  try {
    const photos = await listPortfolioPhotos();

    return res.status(200).json({
      ok: true,
      photos,
    } satisfies PortfolioPhotosResponse);
  } catch (error) {
    console.error('Failed to list portfolio photos.', {error});

    return res.status(500).json({
      ok: false,
      photos: [],
      message: 'The photo gallery is temporarily unavailable.',
    } satisfies PortfolioPhotosResponse);
  }
}
