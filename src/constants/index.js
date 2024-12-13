// index.js
import path from 'node:path';

export const TEMPLATES_DIR = path.resolve("src", "templates");
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');

// Ці налаштування дозволяють зберігати завантажені файли у визначеній директорії з унікальними іменами, що забезпечить організоване та безпечне управління файлами на сервері.

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const THIRTY_DAY = 30 * 24 * 60 * 60 * 1000;

export const SMTP = {
    SMTP_HOST: 'SMTP_HOST',
    SMTP_PORT: 'SMTP_PORT',
    SMTP_USER: 'SMTP_USER',
    SMTP_PASSWORD: 'SMTP_PASSWORD',
    SMTP_FROM: 'SMTP_FROM',
};

export const CLOUDINARY = {
    CLOUD_NAME: 'CLOUD_NAME',
    API_KEY: 'API_KEY',
    API_SECRET: 'API_SECRET',
};

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');