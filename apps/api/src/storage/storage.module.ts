import { Module } from '@nestjs/common';
import { S3Module } from './providers/s3/s3.module';
import { StorageService } from './storage.service';
import { S3Service } from './providers/s3/s3.service';

@Module({
  imports: [S3Module],
  providers: [
    {
      provide: StorageService,
      useClass: S3Service
    }
  ],
  exports: [StorageService]
})
export class StorageModule {}
