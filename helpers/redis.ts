import dotenv from 'dotenv';
import Redis from 'ioredis';
dotenv.config();

export const appCache = new Redis({
  host: process.env.REDIS_HOST!! as string,
  port: parseInt(process.env.REDIS_PORT!!) as number,
});

(async function main() {
  try {
    appCache.on('error', (err) => console.error('error' + err));
  } catch (error) {
    setTimeout(main, 5000);
    throw error;
  }
})();
