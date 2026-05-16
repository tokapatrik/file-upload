import { Injectable } from '@nestjs/common';
import { StorageService } from 'src/storage/storage.service';

@Injectable()
export class UploadsService {
  constructor(private readonly storageService: StorageService) {}

  async initiateUpload(): Promise<string> {
    const presignedUrls = await this.storageService.createPresignedUrl({
      key: 'demo',
      contentType: 'image/png'
    });

    return presignedUrls.url;
  }
}
