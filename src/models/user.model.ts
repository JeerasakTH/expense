// user_id	INT (PK)	รหัสผู้ใช้
// username	VARCHAR(50)	ชื่อผู้ใช้งาน
// password	VARCHAR(255)	รหัสผ่าน (เก็บแบบ Hash)
// email	VARCHAR(100)	อีเมลผู้ใช้งาน
// created_at	DATETIME	วันที่สร้างบัญชี

import { Model } from "sequelize"
import { DataType } from "sequelize-typescript"
import { sequelize } from "../utils/database"

export class User extends Model {
    user_id!: string
    username!: string
    password!: string
    email!: string
    createAt!: Date
}

const UserModel = sequelize.define<User>(
    'User',
    {
        user_id: {
            type: DataType.UUID(),
            primaryKey: true,
            allowNull: false,
            defaultValue: DataType.UUIDV4(),
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
        tableName: "users", // ชื่อ Table ในฐานข้อมูล
        timestamps: true, // สร้าง createdAt และ updatedAt อัตโนมัติ
        freezeTableName: true, // ใช้ชื่อ Table ตามที่กำหนดไว้
    }
)

UserModel
    .sync({ alter: true }) // ใช้ alter เพื่อปรับโครงสร้างตารางตาม Model
    .then(() => console.log("Database synchronized!"))
    .catch((error) => console.error("Error synchronizing database:", error));