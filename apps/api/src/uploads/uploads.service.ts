import { Injectable } from '@nestjs/common';
import { StorageService } from 'src/storage/storage.service';
import { UploadsCreateDto } from './dto/uploads-create.dto';
import { UploadsCreateResultDto } from './dto/uploads-create-result.dto';
import { Upload } from './entities/upload.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GuardDutyMalwareScanResultDetail } from './interfaces/guard-duty-malware-scan-result.interface';
import {
  MALWARE_SCAN_STATUS_LOOKUP,
  UPLOAD_STATUS_LOOKUP
} from './constants/malware-scan-status-lookup.constant';

@Injectable()
export class UploadsService {
  private readonly presignedUrlExpiresInSeconds = 60 * 5; // 5 minutes

  constructor(
    private readonly storageService: StorageService,
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>
  ) {}

  async createUploads(dto: UploadsCreateDto): Promise<UploadsCreateResultDto> {
    const expiresAt = new Date(Date.now() + this.presignedUrlExpiresInSeconds * 1000);
    const uploads = this.uploadRepository.create(
      dto.files.map((file) => ({
        file_name: file.fileName,
        content_type: file.contentType,
        size: file.size,
        presigned_url_expires_at: expiresAt
      }))
    );

    const savedUploads = await this.uploadRepository.save(uploads);

    const uploadsWithPresignedUrls = await Promise.all(
      savedUploads.map(async (upload) => ({
        id: upload.id,
        fileName: upload.file_name,
        uploadUrl: await this.storageService.createPresignedUrl({
          key: upload.id,
          contentType: upload.content_type,
          expiresAt: upload.presigned_url_expires_at
        }),
        expiresAt: upload.presigned_url_expires_at
      }))
    );

    return {
      uploads: uploadsWithPresignedUrls
    };
  }

  async handleMalwareScanResult(scanResult: GuardDutyMalwareScanResultDetail): Promise<void> {
    const upload = await this.uploadRepository.findOneByOrFail({
      id: scanResult.s3ObjectDetails.objectKey
    });

    upload.status = UPLOAD_STATUS_LOOKUP[scanResult.scanResultDetails.scanResultStatus];
    upload.scan_status = MALWARE_SCAN_STATUS_LOOKUP[scanResult.scanResultDetails.scanResultStatus];

    await this.uploadRepository.save(upload);
  }
}
