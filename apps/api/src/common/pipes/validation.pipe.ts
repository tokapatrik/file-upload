import { Injectable, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppValidationPipe extends ValidationPipe {
  constructor(configService: ConfigService) {
    super({
      enableDebugMessages: configService.get('NODE_ENV') !== 'production',
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    });
  }
}
