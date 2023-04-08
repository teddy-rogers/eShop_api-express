import dotenv from 'dotenv';

dotenv.config();

export const sessionSecrets = [process.env.SESSION_SECRET as string];
