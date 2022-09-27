require('dotenv').config();
const Joi = require('joi');

const envVarsSchema = Joi.object()
  .keys({
    DB_HOST: Joi.string().required().description('postgres DB host'),
    DB_PORT: Joi.number().required().description('postgres DB port'),
    DB_TABLE: Joi.string().required().description('postgres DB name'),
    DB_USER: Joi.string().required().description('postgres DB user'),
    DB_PASS: Joi.string().required().description('postgres DB password'),
    DB_DIALECT: Joi.string().required().description('postgres DB dialect'),
    RPC_ORAIN: Joi.string().required().description('rpc orain'),
    RPC_EVMOS_COSMOS: Joi.string().required().description('rpc evmos cosmos'),
    TELEGRAM_BOT_TOKEN: Joi.string().required().description('telegram bot token'),
    TELEGRAM_CHAT_ID: Joi.string().required().description('telegram chat id'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  postgres: {
    host: envVars.DB_HOST,
    port: envVars.DB_PORT,
    name: envVars.DB_TABLE,
    user: envVars.DB_USER,
    password: envVars.DB_PASS,
    dialect: envVars.DB_DIALECT,
  },
  rpc: {
    orain: envVars.RPC_ORAIN,
    evmosCosmos: envVars.RPC_EVMOS_COSMOS,
  },
  telegram: {
    botToken: envVars.TELEGRAM_BOT_TOKEN,
    chatId: envVars.TELEGRAM_CHAT_ID,
  }
};
