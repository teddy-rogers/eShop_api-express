import dotenv from 'dotenv';

dotenv.config();

export const sessionSecrets = [
  process.env.SESSION_SECRET_1 as string,
  process.env.SESSION_SECRET_2 as string,
  process.env.SESSION_SECRET_3 as string,
  process.env.SESSION_SECRET_4 as string,
  process.env.SESSION_SECRET_5 as string,
];
