import * as joi from 'joi';

export const envValidationSchema = joi.object({
  NODE_ENV: joi.string().valid('development', 'production').required(),
  PORT: joi.number().port().required(),
  DATABASE_HOST: joi.string().hostname().required(),
  DATABASE_PORT: joi.number().port().required(),
  DATABASE_USERNAME: joi.string().required(),
  DATABASE_PASSWORD: joi.string().required(),
  DATABASE_NAME: joi.string().required(),
  AWS_ACCESS_KEY_ID: joi.string().when('NODE_ENV', {
    is: 'development',
    then: joi.string().required(),
    otherwise: joi.string().optional()
  }),
  AWS_SECRET_ACCESS_KEY: joi.string().when('NODE_ENV', {
    is: 'development',
    then: joi.string().required(),
    otherwise: joi.string().optional()
  }),
  AWS_REGION: joi.string().when('NODE_ENV', {
    is: 'development',
    then: joi.string().required(),
    otherwise: joi.string().optional()
  }),
  AWS_UPLOAD_SQS_QUEUE_URL: joi.string().uri().required(),
  AWS_S3_UPLOAD_BUCKET_NAME: joi.string().required()
});
