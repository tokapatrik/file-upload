import { Global, Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { UploadsModule } from './uploads/uploads.module';
import { AppValidationPipe } from './common/pipes/validation.pipe';

@Global()
@Module({
  imports: [ConfigModule, DatabaseModule, UploadsModule],
  providers: [
    {
      provide: 'APP_PIPE',
      useClass: AppValidationPipe
    }
  ]
})
export class AppModule {}
