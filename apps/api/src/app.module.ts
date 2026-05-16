import { Global, Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { UploadsModule } from './uploads/uploads.module';

@Global()
@Module({
  imports: [ConfigModule, DatabaseModule, UploadsModule]
})
export class AppModule {}
