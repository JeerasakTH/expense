// user_id	INT (PK)	รหัสผู้ใช้
// username	VARCHAR(50)	ชื่อผู้ใช้งาน
// password	VARCHAR(255)	รหัสผ่าน (เก็บแบบ Hash)
// email	VARCHAR(100)	อีเมลผู้ใช้งาน
// created_at	DATETIME	วันที่สร้างบัญชี

import { Model } from "sequelize"
import { DataType } from "sequelize-typescript"
import { sequelize } from "../utils/database"
import { CreateOne, GetOne } from "../utils/repository"
import bcrypt from "bcrypt";

export class User extends Model {
    user_id!: string
    username!: string
    password!: string
    email!: string
    createdAt!: Date
}

export const UserModel = sequelize.define<User>(
    'User',
    {
        user_id: {
            type: DataType.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataType.UUIDV4,
        },
        username: {
            type: DataType.STRING(),
            allowNull: false,
        },
        password: {
            type: DataType.STRING(),
            allowNull: false,
        },
        email: {
            type: DataType.STRING(),
            allowNull: false,
            unique: true,
        },
        createdAt: {
            type: DataType.DATE(),
            allowNull: false,
        }
    },
    {
        tableName: "User", // ชื่อ Table ในฐานข้อมูล
        timestamps: true, // สร้าง createdAt และ updatedAt อัตโนมัติ
        freezeTableName: true, // ใช้ชื่อ Table ตามที่กำหนดไว้
    }
)

UserModel
    .sync({ alter: true }) // ใช้ alter เพื่อปรับโครงสร้างตารางตาม Model
    .then(async () => {
        const existingAdmin = await GetOne(UserModel, { username: "admin" })
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash("admin", 10);
            await CreateOne(UserModel, {
                username: "admin",
                password: hashedPassword,
                email: "admin@example.com",
                createdAt: new Date()
            })
        }
    })
    .then(() => console.log("Database synchronized!"))
    .catch((error) => console.error("Error synchronizing database:", error));