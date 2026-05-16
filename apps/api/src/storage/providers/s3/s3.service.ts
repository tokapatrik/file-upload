import { PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectS3, S3 } from 'nestjs-s3';
import {
  CreatePresignedUploadUrlParams,
  PresignedUploadUrl
} from 'src/storage/interfaces/presigned-upload-url.interface';
import { StorageService } from 'src/storage/storage.service';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service implements StorageService {
  private readonly bucketName: string;
  private readonly presignedUrlExpiresInSeconds = 60 * 5; // 5 minutes

  constructor(
    @InjectS3() private readonly s3: S3,
    private readonly configService: ConfigService
  ) {
    this.bucketName = this.configService.getOrThrow<string>('AWS_S3_UPLOAD_BUCKET_NAME');
  }

  async createPresignedUrl(params: CreatePresignedUploadUrlParams): Promise<PresignedUploadUrl> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: params.key,
      ContentType: params.contentType
    });

    const url = await getSignedUrl(this.s3, command, {
      expiresIn: this.presignedUrlExpiresInSeconds
    });

    return {
      key: params.key,
      url,
      expiresInSeconds: this.presignedUrlExpiresInSeconds
    };
  }

  async createPresignedUrls(
    params: CreatePresignedUploadUrlParams[]
  ): Promise<PresignedUploadUrl[]> {
    return Promise.all(params.map((param) => this.createPresignedUrl(param)));
  }
}
