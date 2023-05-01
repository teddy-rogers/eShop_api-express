import dotenv from 'dotenv';
import Redis from 'ioredis';

dotenv.config();

const { REDIS_URL } = process.env;

export const appCache = () => {
  if (process.env.NODE_ENV === 'dev') {
    return new Redis({
      host: process.env.CURRENT_LOCALE === 'dev' ? 'localhost' : 'cache',
      port: 6379,
    });
  }
  if (!REDIS_URL) throw 'REDIS_URL not provided';
  return new Redis(REDIS_URL);
};

(async function main() {
  try {
    appCache().on('error', (err) => console.error('error' + err));
  } catch (error) {
    setTimeout(main, 5000);
    throw error;
  }
})();
