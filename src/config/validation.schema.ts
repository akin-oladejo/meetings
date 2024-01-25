import * as joi from '@hapi/joi';

export const validationSchema = joi.object({
  NODE_ENV: joi.string().required(),
  // POSTGRES_URL: joi.string().required(),
  REDIS_URL: joi.string().required(),
  MONGO_URL: joi.string().required()
  // ACCESS_SECRET: joi.string().required(),
  // ACCESS_TIME: joi.number().required()
});
