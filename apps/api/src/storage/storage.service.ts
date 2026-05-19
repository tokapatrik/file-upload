import { CreatePresignedUploadUrlParams } from './interfaces/presigned-upload-url.interface';

export abstract class StorageService {
  abstract createPresignedUrl(params: CreatePresignedUploadUrlParams): Promise<string>;
}
