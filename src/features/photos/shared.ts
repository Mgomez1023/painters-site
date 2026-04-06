export const photosApiRoute = '/api/photos';
export const photoUploadApiRoute = '/api/photos/upload';
export const photoAdminApiRoute = '/api/photos/admin';
export const adminLoginApiRoute = '/api/admin/login';
export const adminLogoutApiRoute = '/api/admin/logout';
export const adminSessionApiRoute = '/api/admin/session';

export const portfolioRoute = '/photos';
export const portfolioImagePrefix = 'portfolio/images/';
export const portfolioMetadataPrefix = 'portfolio/meta/';

export const allowedPhotoContentTypes = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
] as const;

export const maxPhotoUploadBytes = 15 * 1024 * 1024;

export type PortfolioPhoto = {
  id: string;
  url: string;
  pathname: string;
  caption: string | null;
  uploadedAt: string;
};

export type StoredPhotoMetadata = {
  id: string;
  pathname: string;
  caption: string | null;
};

export type PortfolioPhotosResponse = {
  ok: boolean;
  photos: PortfolioPhoto[];
  message?: string;
};

export type AdminSessionResponse = {
  ok: boolean;
  authenticated: boolean;
  email?: string;
  message?: string;
};

export type AdminLoginRequest = {
  email: string;
  password: string;
};

export type AdminLoginResponse = AdminSessionResponse;

export type SavePhotoMetadataRequest = {
  id: string;
  pathname: string;
  caption?: string;
};

export type SavePhotoMetadataResponse = {
  ok: boolean;
  photo?: PortfolioPhoto;
  message?: string;
};

export type DeletePhotoRequest = {
  id: string;
  pathname: string;
};

export type DeletePhotoResponse = {
  ok: boolean;
  message?: string;
};

export type PendingPhotoUpload = {
  id: string;
  file: File;
  caption: string;
};

const allowedPhotoExtensions = new Set(['jpg', 'jpeg', 'png', 'webp', 'avif']);

export function createPhotoId() {
  return crypto.randomUUID();
}

export function buildPhotoImagePath(id: string, fileName: string) {
  const extension = getPhotoExtension(fileName);
  return `${portfolioImagePrefix}${id}.${extension}`;
}

export function buildPhotoMetadataPath(id: string) {
  return `${portfolioMetadataPrefix}${id}.json`;
}

export function getPhotoExtension(fileName: string) {
  const normalizedName = fileName.trim().toLowerCase();
  const extension = normalizedName.split('.').pop();

  if (!extension || !allowedPhotoExtensions.has(extension)) {
    throw new Error('Please upload a JPG, PNG, WEBP, or AVIF image.');
  }

  return extension;
}

export function extractPhotoIdFromPathname(pathname: string) {
  const normalizedPathname = pathname.trim();

  if (normalizedPathname.startsWith(portfolioImagePrefix)) {
    const fileName = normalizedPathname.slice(portfolioImagePrefix.length);
    return fileName.split('.')[0] || null;
  }

  if (normalizedPathname.startsWith(portfolioMetadataPrefix)) {
    const fileName = normalizedPathname.slice(portfolioMetadataPrefix.length);
    return fileName.replace(/\.json$/i, '') || null;
  }

  return null;
}

export function normalizePhotoCaption(caption: string | null | undefined) {
  const normalizedCaption = caption?.trim() ?? '';
  return normalizedCaption ? normalizedCaption.slice(0, 240) : null;
}

export function isAllowedPhotoContentType(contentType: string) {
  return allowedPhotoContentTypes.includes(
    contentType as (typeof allowedPhotoContentTypes)[number],
  );
}
