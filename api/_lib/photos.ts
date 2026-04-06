import {del, get, head, list, put} from '@vercel/blob';
import {
  buildPhotoMetadataPath,
  extractPhotoIdFromPathname,
  normalizePhotoCaption,
  portfolioImagePrefix,
  portfolioMetadataPrefix,
  type PortfolioPhoto,
  type StoredPhotoMetadata,
} from '../../src/features/photos/shared.js';

export async function listPortfolioPhotos(): Promise<PortfolioPhoto[]> {
  const [imageBlobs, metadataBlobs] = await Promise.all([
    listAllBlobs(portfolioImagePrefix),
    listAllBlobs(portfolioMetadataPrefix),
  ]);

  const metadataEntries = await Promise.all(
    metadataBlobs.map(async (blob) => {
      const photoId = extractPhotoIdFromPathname(blob.pathname);

      if (!photoId) {
        return null;
      }

      const metadata = await readStoredMetadata(blob.pathname);
      return metadata ? [photoId, metadata] : null;
    }),
  );

  const metadataById = new Map(
    metadataEntries.filter(Boolean) as Array<[string, StoredPhotoMetadata]>,
  );

  return imageBlobs
    .map((blob) => {
      const id = extractPhotoIdFromPathname(blob.pathname);

      if (!id) {
        return null;
      }

      const metadata = metadataById.get(id);

      return {
        id,
        url: blob.url,
        pathname: blob.pathname,
        caption:
          metadata?.pathname === blob.pathname
            ? normalizePhotoCaption(metadata.caption)
            : null,
        uploadedAt: blob.uploadedAt.toISOString(),
      } satisfies PortfolioPhoto;
    })
    .filter((photo): photo is PortfolioPhoto => Boolean(photo))
    .sort(
      (left, right) =>
        new Date(right.uploadedAt).getTime() - new Date(left.uploadedAt).getTime(),
    );
}

export async function savePortfolioPhotoMetadata(input: {
  id: string;
  pathname: string;
  caption?: string;
}) {
  const blobDetails = await head(input.pathname);
  const photoId = extractPhotoIdFromPathname(blobDetails.pathname);

  if (!photoId || photoId !== input.id) {
    throw new Error('That image path is invalid.');
  }

  const caption = normalizePhotoCaption(input.caption);

  const metadata: StoredPhotoMetadata = {
    id: input.id,
    pathname: blobDetails.pathname,
    caption,
  };

  await put(buildPhotoMetadataPath(input.id), JSON.stringify(metadata), {
    access: 'public',
    allowOverwrite: true,
    contentType: 'application/json',
    cacheControlMaxAge: 60,
  });

  return {
    id: input.id,
    url: blobDetails.url,
    pathname: blobDetails.pathname,
    caption,
    uploadedAt: blobDetails.uploadedAt.toISOString(),
  } satisfies PortfolioPhoto;
}

export async function deletePortfolioPhoto(input: {
  id: string;
  pathname: string;
}) {
  const photoId = extractPhotoIdFromPathname(input.pathname);

  if (!photoId || photoId !== input.id) {
    throw new Error('That image path is invalid.');
  }

  await del([input.pathname, buildPhotoMetadataPath(input.id)]);
}

async function readStoredMetadata(pathname: string) {
  const blob = await get(pathname, {
    access: 'public',
  });

  if (!blob || blob.statusCode !== 200) {
    return null;
  }

  try {
    const metadata = JSON.parse(
      await new Response(blob.stream).text(),
    ) as StoredPhotoMetadata;

    if (
      typeof metadata.id !== 'string' ||
      typeof metadata.pathname !== 'string' ||
      (metadata.caption !== null && typeof metadata.caption !== 'string')
    ) {
      return null;
    }

    return metadata;
  } catch {
    return null;
  }
}

async function listAllBlobs(prefix: string) {
  const blobs: Awaited<ReturnType<typeof list>>['blobs'] = [];
  let cursor: string | undefined;

  do {
    const response = await list({
      cursor,
      limit: 1000,
      prefix,
    });

    blobs.push(...response.blobs);
    cursor = response.hasMore ? response.cursor : undefined;
  } while (cursor);

  return blobs;
}
