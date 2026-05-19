import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';

import { StorageModule } from '../storage/storage.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Upload } from './entities/upload.entity';
import { SqsModule } from '@ssut/nestjs-sqs';
import { ConfigService } from '@nestjs/config';
import {
  MalwareScanResultHandler,
  UPLOAD_SCAN_RESULTS_QUEUE
} from './handlers/malware-scan-result.handler';

@Module({
  imports: [
    StorageModule,
    TypeOrmModule.forFeature([Upload]),
    SqsModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        consumers: [
          {
            name: UPLOAD_SCAN_RESULTS_QUEUE,
            queueUrl: configService.getOrThrow<string>('AWS_UPLOAD_SQS_QUEUE_URL'),
            region: configService.getOrThrow<string>('AWS_REGION')
          }
        ]
      })
    })
  ],
  controllers: [UploadsController],
  providers: [UploadsService, MalwareScanResultHandler]
})
export class UploadsModule {}
