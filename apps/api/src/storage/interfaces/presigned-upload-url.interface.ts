export type CreatePresignedUploadUrlParams = {
  key: string;
  contentType: string;
};

export type PresignedUploadUrl = {
  key: string;
  url: string;
  expiresInSeconds: number;
};
