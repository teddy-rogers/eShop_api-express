import dotenv from 'dotenv';
import Redis from 'ioredis';
dotenv.config();

export const appCache = new Redis({
  host: process.env.NODE_ENV === 'dev' ? 'localhost' : 'cache',
  port: 6379,
});

(async function main() {
  try {
    appCache.on('success', () => console.log('CACHE CONNECTED'));
    appCache.on('error', (err) => console.error('error' + err));
  } catch (error) {
    setTimeout(main, 5000);
    throw error;
  }
})();
