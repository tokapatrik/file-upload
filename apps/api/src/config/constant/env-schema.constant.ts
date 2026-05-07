import * as joi from 'joi';

export const envValidationSchema = joi.object({
  NODE_ENV: joi.string().valid('development', 'production').required(),
  PORT: joi.number().port().required(),
  DATABASE_HOST: joi.string().hostname().required(),
  DATABASE_PORT: joi.number().port().required(),
  DATABASE_USERNAME: joi.string().required(),
  DATABASE_PASSWORD: joi.string().required(),
  DATABASE_NAME: joi.string().required()
});
