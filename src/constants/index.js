import path from 'node:path';

export const TEMPLATES_DIR = path.resolve("src", "templates");

// export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
// Ці налаштування дозволяють зберігати завантажені файли у визначеній директорії з унікальними іменами, що забезпечить організоване та безпечне управління файлами на сервері.
export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');

export const CLOUDINARY = {
    CLOUD_NAME: 'CLOUD_NAME',
    API_KEY: 'API_KEY',
    API_SECRET: 'API_SECRET',
};
