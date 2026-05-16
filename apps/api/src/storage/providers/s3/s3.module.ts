import { Module } from '@nestjs/common';
import { S3Module as NestS3Module } from 'nestjs-s3';
import { ConfigService } from '@nestjs/config';
import { S3Service } from './s3.service';

@Module({
  imports: [
    NestS3Module.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const credentials =
          configService.get('NODE_ENV') === 'development'
            ? {
                accessKeyId: configService.getOrThrow<string>('AWS_ACCESS_KEY_ID'),
                secretAccessKey: configService.getOrThrow<string>('AWS_SECRET_ACCESS_KEY')
              }
            : undefined;

        return {
          config: {
            credentials,
            region: configService.getOrThrow<string>('AWS_REGION'),
            forcePathStyle: true,
            signatureVersion: 'v4'
          }
        };
      }
    })
  ],
  providers: [S3Service],
  exports: [S3Service]
})
export class S3Module {}
