import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  STRIPE_SECRET: string;
  STRIPE_ENDPOINT_SECRET: string;
  STRIPE_CANCEL_URL: string;
  STRIPE_SUCCESS_URL: string;
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    STRIPE_SECRET: joi.string().required(),
    STRIPE_ENDPOINT_SECRET: joi.string().required(),
    STRIPE_CANCEL_URL: joi.string().required(),
    STRIPE_SUCCESS_URL: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  stripeSecret: envVars.STRIPE_SECRET,
  stripeEndpointSecret: envVars.STRIPE_ENDPOINT_SECRET,
  stripeCancelUrl: envVars.STRIPE_CANCEL_URL,
  stripeSuccessUrl: envVars.STRIPE_SUCCESS_URL,
};
