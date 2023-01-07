import 'dotenv/config';

const config = {
  host: process.env.SRV_HOST,
  port: process.env.SRV_PORT,
  security: {
    salt: process.env.SECURITY_KEY,
    expiresIn: process.env.SECURITY_EXPIRES,
  },
  dateLocale: process.env.DEFAULT_LOCALE,
};

export default config;
