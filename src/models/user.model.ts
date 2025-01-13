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

User.init(
    {
        user_id: {
            type: DataType.STRING(),
            allowNull: false,
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
            type: DataType.DATE(),
            allowNull: false,
        },
        createAt: {
            type: DataType.DATE(),
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'user',
        freezeTableName: true
    }
)