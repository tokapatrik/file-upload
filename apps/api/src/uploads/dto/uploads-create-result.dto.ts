export class UploadCreatedDto {
  id: string;
  fileName: string;
  uploadUrl: string;
  expiresAt: Date;
}

export class UploadsCreateResultDto {
  uploads: UploadCreatedDto[];
}
