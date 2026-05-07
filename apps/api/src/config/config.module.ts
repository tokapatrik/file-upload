import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { envValidationSchema } from './constant/env-schema.constant';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      validationSchema: envValidationSchema,
      cache: true
    })
  ],
  exports: [NestConfigModule]
})
export class ConfigModule {}
