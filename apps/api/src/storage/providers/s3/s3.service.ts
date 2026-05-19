import { PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectS3, S3 } from 'nestjs-s3';
import { CreatePresignedUploadUrlParams } from 'src/storage/interfaces/presigned-upload-url.interface';
import { StorageService } from 'src/storage/storage.service';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service implements StorageService {
  private readonly bucketName: string;

  constructor(
    @InjectS3() private readonly s3: S3,
    private readonly configService: ConfigService
  ) {
    this.bucketName = this.configService.getOrThrow<string>('AWS_S3_UPLOAD_BUCKET_NAME');
  }

  async createPresignedUrl(params: CreatePresignedUploadUrlParams): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: params.key,
      ContentType: params.contentType
    });

    return await getSignedUrl(this.s3, command, {
      expiresIn: Math.max(1, Math.ceil((params.expiresAt.getTime() - Date.now()) / 1000)),
      unhoistableHeaders: new Set(['content-type'])
    });
  }
}
