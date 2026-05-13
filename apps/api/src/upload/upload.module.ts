import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { S3Module } from 'nestjs-s3';

@Module({
  imports: [
    S3Module.forRootAsync({
      useFactory: () => ({
        config: {
          credentials: {
            accessKeyId: 'minio',
            secretAccessKey: 'password'
          },
          // region: 'us-east-1',
          endpoint: 'http://localhost:9000',
          forcePathStyle: true,
          signatureVersion: 'v4'
        }
      })
    })
  ],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
