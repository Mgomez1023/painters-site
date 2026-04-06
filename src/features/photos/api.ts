import {upload} from '@vercel/blob/client';
import {
  adminLoginApiRoute,
  adminLogoutApiRoute,
  adminSessionApiRoute,
  buildPhotoImagePath,
  photoAdminApiRoute,
  photoUploadApiRoute,
  photosApiRoute,
  type AdminLoginRequest,
  type AdminLoginResponse,
  type AdminSessionResponse,
  type DeletePhotoRequest,
  type DeletePhotoResponse,
  type PortfolioPhotosResponse,
  type SavePhotoMetadataRequest,
  type SavePhotoMetadataResponse,
} from './shared';

const fallbackPortfolioError =
  'The portfolio is temporarily unavailable. Please try again shortly.';

export async function fetchPortfolioPhotos() {
  const response = await fetch(photosApiRoute, {
    method: 'GET',
  });
  const responseBody = await readJson<PortfolioPhotosResponse>(response);

  if (!response.ok || !responseBody?.ok) {
    throw new Error(responseBody?.message || fallbackPortfolioError);
  }

  return responseBody.photos;
}

export async function fetchAdminSession() {
  let response: Response;

  try {
    response = await fetch(adminSessionApiRoute, {
      method: 'GET',
      credentials: 'same-origin',
    });
  } catch {
    throw new Error('We could not verify the admin session.');
  }

  const responseBody = await readJson<AdminSessionResponse>(response);

  if (!response.ok || !responseBody?.ok) {
    throw new Error(responseBody?.message || 'We could not verify the admin session.');
  }

  return responseBody;
}

export async function loginAdmin(payload: AdminLoginRequest) {
  let response: Response;

  try {
    response = await fetch(adminLoginApiRoute, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('We could not log you in right now.');
  }

  const responseBody = await readJson<AdminLoginResponse>(response);

  if (!response.ok || !responseBody?.ok) {
    throw new Error(responseBody?.message || 'We could not log you in right now.');
  }

  return responseBody;
}

export async function logoutAdmin() {
  let response: Response;

  try {
    response = await fetch(adminLogoutApiRoute, {
      method: 'POST',
      credentials: 'same-origin',
    });
  } catch {
    throw new Error('We could not log you out right now.');
  }

  const responseBody = await readJson<AdminSessionResponse>(response);

  if (!response.ok || !responseBody?.ok) {
    throw new Error(responseBody?.message || 'We could not log you out right now.');
  }

  return responseBody;
}

export async function uploadPortfolioImage(
  id: string,
  file: File,
  onUploadProgress?: (progress: number) => void,
) {
  return upload(buildPhotoImagePath(id, file.name), file, {
    access: 'public',
    contentType: file.type,
    handleUploadUrl: photoUploadApiRoute,
    clientPayload: JSON.stringify({
      id,
      fileName: file.name,
      contentType: file.type,
    }),
    multipart: file.size > 5 * 1024 * 1024,
    onUploadProgress: onUploadProgress
      ? ({percentage}) => {
          onUploadProgress(percentage);
        }
      : undefined,
  });
}

export async function savePhotoMetadata(payload: SavePhotoMetadataRequest) {
  let response: Response;

  try {
    response = await fetch(photoAdminApiRoute, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('We could not save the photo details.');
  }

  const responseBody = await readJson<SavePhotoMetadataResponse>(response);

  if (!response.ok || !responseBody?.ok || !responseBody.photo) {
    throw new Error(responseBody?.message || 'We could not save the photo details.');
  }

  return responseBody.photo;
}

export async function deletePhoto(payload: DeletePhotoRequest) {
  let response: Response;

  try {
    response = await fetch(photoAdminApiRoute, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('We could not delete that photo.');
  }

  const responseBody = await readJson<DeletePhotoResponse>(response);

  if (!response.ok || !responseBody?.ok) {
    throw new Error(responseBody?.message || 'We could not delete that photo.');
  }
}

async function readJson<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}
