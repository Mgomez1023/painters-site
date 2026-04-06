import {useEffect, useMemo, useRef, useState} from 'react';
import type {ChangeEvent} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Expand,
  ImagePlus,
  LoaderCircle,
  Save,
  Trash2,
  X,
} from 'lucide-react';
import {deletePhoto, savePhotoMetadata, uploadPortfolioImage} from './api';
import {
  createPhotoId,
  portfolioRoute,
  type PendingPhotoUpload,
  type PortfolioPhoto,
} from './shared';
import {usePortfolioPhotos} from './usePortfolioPhotos';

type PhotosPageProps = {
  authenticated: boolean;
  adminEmail?: string;
  onLogout: () => Promise<void>;
};

type QueuedPhotoUpload = PendingPhotoUpload & {
  previewUrl: string;
  progress: number;
  status: 'idle' | 'uploading' | 'error';
  error: string;
};

const masonryCardStyles = [
  'aspect-[4/5]',
  'aspect-[5/4]',
  'aspect-[3/4]',
  'aspect-[1/1]',
  'aspect-[4/3]',
];

export function PhotosPage({
  authenticated,
  adminEmail,
  onLogout,
}: PhotosPageProps) {
  const {photos, setPhotos, isLoading, error, refreshPhotos} = usePortfolioPhotos();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [captionDrafts, setCaptionDrafts] = useState<Record<string, string>>({});
  const [queuedUploads, setQueuedUploads] = useState<QueuedPhotoUpload[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFeedback, setUploadFeedback] = useState('');
  const [adminFeedback, setAdminFeedback] = useState('');
  const [busyPhotoId, setBusyPhotoId] = useState('');
  const queuedUploadsRef = useRef<QueuedPhotoUpload[]>([]);

  useEffect(() => {
    queuedUploadsRef.current = queuedUploads;
  }, [queuedUploads]);

  useEffect(
    () => () => {
      queuedUploadsRef.current.forEach((uploadItem) => {
        URL.revokeObjectURL(uploadItem.previewUrl);
      });
    },
    [],
  );

  useEffect(() => {
    setCaptionDrafts((currentDrafts) => {
      const nextDrafts = {...currentDrafts};

      photos.forEach((photo) => {
        nextDrafts[photo.id] = currentDrafts[photo.id] ?? photo.caption ?? '';
      });

      Object.keys(nextDrafts).forEach((photoId) => {
        if (!photos.some((photo) => photo.id === photoId)) {
          delete nextDrafts[photoId];
        }
      });

      return nextDrafts;
    });
  }, [photos]);

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxIndex(null);
      }

      if (event.key === 'ArrowRight') {
        setLightboxIndex((currentIndex) =>
          currentIndex === null ? currentIndex : (currentIndex + 1) % photos.length,
        );
      }

      if (event.key === 'ArrowLeft') {
        setLightboxIndex((currentIndex) =>
          currentIndex === null
            ? currentIndex
            : (currentIndex - 1 + photos.length) % photos.length,
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, photos.length]);

  const activePhoto =
    lightboxIndex === null ? null : photos[lightboxIndex] ?? null;

  const queuedCountLabel = useMemo(() => {
    if (queuedUploads.length === 1) {
      return '1 photo ready';
    }

    return `${queuedUploads.length} photos ready`;
  }, [queuedUploads.length]);

  function handleQueuedFiles(event: ChangeEvent<HTMLInputElement>) {
    const {files} = event.target;

    if (!files?.length) {
      return;
    }

    const nextUploads = Array.from(files).map((file: File) => ({
      id: createPhotoId(),
      file,
      caption: '',
      previewUrl: URL.createObjectURL(file),
      progress: 0,
      status: 'idle' as const,
      error: '',
    }));

    setQueuedUploads((currentUploads) => [...currentUploads, ...nextUploads]);
    setUploadFeedback('');
    event.target.value = '';
  }

  function updateQueuedUpload(
    id: string,
    updater: (uploadItem: QueuedPhotoUpload) => QueuedPhotoUpload,
  ) {
    setQueuedUploads((currentUploads) =>
      currentUploads.map((uploadItem) =>
        uploadItem.id === id ? updater(uploadItem) : uploadItem,
      ),
    );
  }

  function removeQueuedUpload(id: string) {
    setQueuedUploads((currentUploads) => {
      const uploadToRemove = currentUploads.find((uploadItem) => uploadItem.id === id);

      if (uploadToRemove) {
        URL.revokeObjectURL(uploadToRemove.previewUrl);
      }

      return currentUploads.filter((uploadItem) => uploadItem.id !== id);
    });
  }

  async function handleUploadAll() {
    if (!queuedUploads.length || isUploading) {
      return;
    }

    setIsUploading(true);
    setUploadFeedback('');
    let uploadedCount = 0;

    try {
      for (const uploadItem of queuedUploadsRef.current) {
        updateQueuedUpload(uploadItem.id, (currentUpload) => ({
          ...currentUpload,
          status: 'uploading',
          progress: 0,
          error: '',
        }));

        try {
          const blob = await uploadPortfolioImage(
            uploadItem.id,
            uploadItem.file,
            (progress) => {
              updateQueuedUpload(uploadItem.id, (currentUpload) => ({
                ...currentUpload,
                progress,
              }));
            },
          );

          await savePhotoMetadata({
            id: uploadItem.id,
            pathname: blob.pathname,
            caption: uploadItem.caption,
          });

          uploadedCount += 1;
          removeQueuedUpload(uploadItem.id);
        } catch (uploadError) {
          updateQueuedUpload(uploadItem.id, (currentUpload) => ({
            ...currentUpload,
            status: 'error',
            error:
              uploadError instanceof Error
                ? uploadError.message
                : 'Upload failed.',
          }));
        }
      }
    } finally {
      setIsUploading(false);
    }

    await refreshPhotos();

    if (uploadedCount) {
      setUploadFeedback(
        uploadedCount === 1
          ? '1 photo uploaded successfully.'
          : `${uploadedCount} photos uploaded successfully.`,
      );
    } else {
      setUploadFeedback('No photos were uploaded. Review the errors and try again.');
    }
  }

  async function handleSaveCaption(photo: PortfolioPhoto) {
    const caption = captionDrafts[photo.id] ?? '';

    setBusyPhotoId(photo.id);
    setAdminFeedback('');

    try {
      const updatedPhoto = await savePhotoMetadata({
        id: photo.id,
        pathname: photo.pathname,
        caption,
      });

      setPhotos((currentPhotos) =>
        currentPhotos.map((currentPhoto) =>
          currentPhoto.id === updatedPhoto.id ? updatedPhoto : currentPhoto,
        ),
      );

      setAdminFeedback('Photo details updated.');
    } catch (saveError) {
      setAdminFeedback(
        saveError instanceof Error
          ? saveError.message
          : 'We could not update that photo.',
      );
    } finally {
      setBusyPhotoId('');
    }
  }

  async function handleDeletePhoto(photo: PortfolioPhoto) {
    const confirmed = window.confirm('Delete this photo from the public portfolio?');

    if (!confirmed) {
      return;
    }

    setBusyPhotoId(photo.id);
    setAdminFeedback('');

    try {
      await deletePhoto({
        id: photo.id,
        pathname: photo.pathname,
      });

      setPhotos((currentPhotos) =>
        currentPhotos.filter((currentPhoto) => currentPhoto.id !== photo.id),
      );

      setAdminFeedback('Photo removed.');
    } catch (deleteError) {
      setAdminFeedback(
        deleteError instanceof Error
          ? deleteError.message
          : 'We could not delete that photo.',
      );
    } finally {
      setBusyPhotoId('');
    }
  }

  return (
    <div className="bg-white pt-24 text-ink">
      <section className="border-b border-blue-border/60 bg-[linear-gradient(180deg,rgba(245,249,255,0.95),rgba(255,255,255,0.96))] py-16 md:py-20">
        <div className="section-container">
          <a
            href="/"
            className="mb-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary-light transition-colors hover:text-gold-accent"
          >
            <ArrowLeft size={14} />
            Back To Home
          </a>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_22rem] lg:items-end">
            <div className="max-w-3xl">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-px w-6 bg-primary-light"></div>
                <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-primary-light">
                  Portfolio
                </span>
              </div>
              <h1 className="text-4xl font-bold text-primary md:text-6xl">
                Finished rooms, trim, and detail work with a cleaner presentation.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
                Browse recent painting and trim projects from homes across Chicago
                and the North Shore. Each image opens full-screen for a closer look.
              </p>
            </div>

            <div className="border-l border-gold-accent/50 bg-white/80 px-5 py-6 shadow-lg">
              <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-primary-light">
                Curated Work
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                Public visitors always see the latest uploaded photos. Admin tools
                stay hidden unless the secure footer login is active.
              </p>
              {authenticated ? (
                <div className="mt-5 flex items-center justify-between gap-4 border-t border-blue-border/60 pt-4">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary-light">
                      Admin Mode
                    </p>
                    <p className="mt-1 text-xs text-gray-500">{adminEmail}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => void onLogout()}
                    className="text-[10px] font-bold uppercase tracking-widest text-primary transition-colors hover:text-gold-accent"
                  >
                    Log Out
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {authenticated ? (
        <section className="border-b border-blue-border/40 bg-blue-bg/30 py-8">
          <div className="section-container">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]">
              <div className="bg-white p-5 shadow-lg border-t-4 border-gold-accent md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-primary-light">
                      Add Photos
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-primary">
                      Upload new portfolio images
                    </h2>
                  </div>
                  <label className="inline-flex cursor-pointer items-center gap-3 bg-primary px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition-colors hover:bg-primary-light">
                    <ImagePlus size={14} />
                    Select Photos
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif"
                      multiple
                      className="hidden"
                      onChange={handleQueuedFiles}
                    />
                  </label>
                </div>

                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-500">
                  Choose one or more images, add captions if you want them, then upload.
                  New photos appear publicly as soon as they finish processing.
                </p>

                {queuedUploads.length ? (
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-primary-light">
                        {queuedCountLabel}
                      </p>
                      <button
                        type="button"
                        onClick={() => void handleUploadAll()}
                        className="btn-gold px-5 py-3 disabled:cursor-not-allowed disabled:opacity-70"
                        disabled={isUploading}
                      >
                        {isUploading ? 'Uploading...' : 'Upload Selected'}
                      </button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      {queuedUploads.map((uploadItem) => (
                        <div
                          key={uploadItem.id}
                          className="border border-blue-border/70 bg-soft-bg p-3"
                        >
                          <div className="flex gap-3">
                            <img
                              src={uploadItem.previewUrl}
                              alt=""
                              className="h-24 w-24 shrink-0 object-cover"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <p className="truncate text-sm font-bold text-primary">
                                    {uploadItem.file.name}
                                  </p>
                                  <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                    {(uploadItem.file.size / (1024 * 1024)).toFixed(1)} MB
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeQueuedUpload(uploadItem.id)}
                                  className="text-gray-400 transition-colors hover:text-primary"
                                  aria-label={`Remove ${uploadItem.file.name}`}
                                >
                                  <X size={16} />
                                </button>
                              </div>
                              <label className="mt-3 block text-[9px] font-bold uppercase tracking-widest text-gray-400">
                                Caption
                              </label>
                              <input
                                type="text"
                                className="form-input mt-1"
                                placeholder="Optional caption"
                                value={uploadItem.caption}
                                onChange={(event) =>
                                  updateQueuedUpload(uploadItem.id, (currentUpload) => ({
                                    ...currentUpload,
                                    caption: event.target.value,
                                    error: '',
                                  }))
                                }
                              />
                              {uploadItem.status === 'uploading' ? (
                                <div className="mt-3">
                                  <div className="h-1.5 bg-blue-border/70">
                                    <div
                                      className="h-full bg-gold-accent transition-[width] duration-300"
                                      style={{width: `${uploadItem.progress}%`}}
                                    ></div>
                                  </div>
                                  <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-primary-light">
                                    {Math.round(uploadItem.progress)}% uploaded
                                  </p>
                                </div>
                              ) : null}
                              {uploadItem.error ? (
                                <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-red-500">
                                  {uploadItem.error}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 border border-dashed border-blue-border bg-blue-bg/40 px-5 py-8 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary-light">
                      Ready When You Are
                    </p>
                    <p className="mx-auto mt-2 max-w-xl text-sm text-gray-500">
                      Select finished project photos to start building the public portfolio.
                    </p>
                  </div>
                )}

                {uploadFeedback ? (
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-primary-light">
                    {uploadFeedback}
                  </p>
                ) : null}
              </div>

              <div className="bg-primary px-5 py-6 text-white shadow-lg">
                <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-gold-accent">
                  Manage Existing Photos
                </p>
                <div className="mt-4 space-y-3">
                  {photos.length ? (
                    photos.map((photo) => (
                      <div
                        key={photo.id}
                        className="border border-white/10 bg-white/5 p-3"
                      >
                        <div className="flex gap-3">
                          <img
                            src={photo.url}
                            alt=""
                            className="h-16 w-16 shrink-0 object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                              {new Date(photo.uploadedAt).toLocaleDateString()}
                            </p>
                            <input
                              type="text"
                              className="mt-2 w-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-gold-accent"
                              placeholder="Optional caption"
                              value={captionDrafts[photo.id] ?? ''}
                              onChange={(event) =>
                                setCaptionDrafts((currentDrafts) => ({
                                  ...currentDrafts,
                                  [photo.id]: event.target.value,
                                }))
                              }
                            />
                            <div className="mt-3 flex gap-2">
                              <button
                                type="button"
                                onClick={() => void handleSaveCaption(photo)}
                                className="inline-flex items-center gap-2 border border-gold-accent px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-gold-accent transition-colors hover:bg-gold-accent hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
                                disabled={busyPhotoId === photo.id}
                              >
                                <Save size={12} />
                                Save
                              </button>
                              <button
                                type="button"
                                onClick={() => void handleDeletePhoto(photo)}
                                className="inline-flex items-center gap-2 border border-white/10 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white/70 transition-colors hover:border-red-400 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-70"
                                disabled={busyPhotoId === photo.id}
                              >
                                <Trash2 size={12} />
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="border border-white/10 bg-white/5 p-4">
                      <p className="text-sm text-white/70">
                        Uploaded photos will appear here for caption updates and removal.
                      </p>
                    </div>
                  )}
                </div>
                {adminFeedback ? (
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-gold-accent">
                    {adminFeedback}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-10 md:py-14">
        <div className="section-container">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-primary-light">
                Photo Library
              </p>
              <h2 className="mt-2 text-3xl font-bold text-primary md:text-4xl">
                Project details at full scale
              </h2>
            </div>
            <a
              href={portfolioRoute}
              className="hidden text-[10px] font-bold uppercase tracking-widest text-primary-light lg:inline-flex"
            >
              {photos.length ? `${photos.length} photos live` : 'Updating regularly'}
            </a>
          </div>

          {isLoading ? (
            <div className="flex min-h-[18rem] items-center justify-center border border-blue-border/60 bg-blue-bg/30">
              <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-primary-light">
                <LoaderCircle size={18} className="animate-spin" />
                Loading Photos
              </div>
            </div>
          ) : error ? (
            <div className="border border-blue-border/60 bg-blue-bg/30 px-6 py-10 text-center">
              <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-primary-light">
                Portfolio Unavailable
              </p>
              <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500">{error}</p>
            </div>
          ) : photos.length ? (
            <div className="columns-1 gap-4 sm:columns-2 xl:columns-3">
              {photos.map((photo, index) => (
                <motion.figure
                  key={photo.id}
                  initial={{opacity: 0, y: 16}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.35, delay: Math.min(index * 0.03, 0.2)}}
                  className="mb-4 break-inside-avoid overflow-hidden border border-blue-border/50 bg-white shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    className="group block w-full text-left"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={photo.url}
                        alt={photo.caption || 'Portfolio project photo'}
                        className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${
                          masonryCardStyles[index % masonryCardStyles.length]
                        }`}
                      />
                      <div className="absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/18"></div>
                      <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center bg-white/90 text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                        <Expand size={16} />
                      </div>
                    </div>
                    {photo.caption ? (
                      <figcaption className="px-4 py-3 text-sm leading-relaxed text-gray-600">
                        {photo.caption}
                      </figcaption>
                    ) : null}
                  </button>
                </motion.figure>
              ))}
            </div>
          ) : (
            <div className="border border-blue-border/60 bg-[linear-gradient(180deg,rgba(245,249,255,0.9),rgba(255,255,255,0.96))] px-6 py-14 text-center">
              <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-primary-light">
                Portfolio Coming Into Focus
              </p>
              <h3 className="mt-3 text-2xl font-bold text-primary">
                Fresh project photos are being added soon.
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-500">
                Check back shortly for more before-and-after style craftsmanship,
                clean trim lines, and finished-room details from recent projects.
              </p>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {activePhoto ? (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="fixed inset-0 z-[80] bg-ink/90 px-4 py-4 md:px-8"
          >
            <button
              type="button"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center bg-white/10 text-white transition-colors hover:bg-white/20"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close photo viewer"
            >
              <X size={20} />
            </button>

            {photos.length > 1 ? (
              <>
                <button
                  type="button"
                  className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-white/10 text-white transition-colors hover:bg-white/20"
                  onClick={() =>
                    setLightboxIndex(
                      (lightboxIndex! - 1 + photos.length) % photos.length,
                    )
                  }
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-white/10 text-white transition-colors hover:bg-white/20"
                  onClick={() =>
                    setLightboxIndex((lightboxIndex! + 1) % photos.length)
                  }
                  aria-label="Next photo"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            ) : null}

            <div className="flex min-h-full items-center justify-center">
              <motion.div
                initial={{opacity: 0, scale: 0.98}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 0.98}}
                className="w-full max-w-6xl"
              >
                <img
                  src={activePhoto.url}
                  alt={activePhoto.caption || 'Portfolio project photo'}
                  className="max-h-[78vh] w-full object-contain"
                />
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-white">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-gold-accent">
                      {photos.length > 1
                        ? `${lightboxIndex! + 1} of ${photos.length}`
                        : 'Portfolio Detail'}
                    </p>
                    {activePhoto.caption ? (
                      <p className="mt-2 max-w-2xl text-sm text-white/75">
                        {activePhoto.caption}
                      </p>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
