import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: console.log, // ใช้สำหรับ Debug (ปิดใน Production)
});

// ทดสอบการเชื่อมต่อ
sequelize
  .authenticate()
  .then(() => console.log('Database connected!'))
  .catch((error) => console.error('Unable to connect to the database:', error));
