import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  ValidateNested
} from 'class-validator';
import { MAX_UPLOAD_FILE_SIZE_IN_BYTES } from '../constants/max-upload-file-size-in-bytes.constant';
import {
  ALLOWED_UPLOAD_CONTENT_TYPES,
  AllowedUploadContentType
} from '../constants/allowed-upload-content-types.constant';

export class UploadFileDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  fileName: string;

  @IsIn(ALLOWED_UPLOAD_CONTENT_TYPES)
  contentType: AllowedUploadContentType;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(MAX_UPLOAD_FILE_SIZE_IN_BYTES)
  size: number;
}

export class UploadsCreateDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => UploadFileDto)
  files: UploadFileDto[];
}
