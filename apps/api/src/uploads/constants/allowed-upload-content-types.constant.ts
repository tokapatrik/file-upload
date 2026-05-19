export const ALLOWED_UPLOAD_CONTENT_TYPES = [
  'application/pdf',
  'application/zip',
  'application/x-zip-compressed',
  'image/jpeg',
  'image/png'
] as const;

export type AllowedUploadContentType = (typeof ALLOWED_UPLOAD_CONTENT_TYPES)[number];
