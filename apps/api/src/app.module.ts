import { Global, Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { UploadModule } from './upload/upload.module';

@Global()
@Module({
  imports: [ConfigModule, DatabaseModule, UploadModule]
})
export class AppModule {}
