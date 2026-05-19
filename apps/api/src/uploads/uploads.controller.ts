import { Body, Controller, Post } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsCreateDto } from './dto/uploads-create.dto';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  createUploads(@Body() dto: UploadsCreateDto): Promise<any> {
    return this.uploadsService.createUploads(dto);
  }
}
