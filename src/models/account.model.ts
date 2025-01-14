// account_id	INT (PK)	รหัสบัญชี
// user_id	INT (FK)	รหัสผู้ใช้
// account_name	VARCHAR(100)	ชื่อบัญชี เช่น บัญชีธนาคาร
// balance	DECIMAL(10,2)	ยอดคงเหลือ
// created_at	DATETIME	วันที่สร้างบัญชี

import { sequelize } from "../utils/database"
import { Model } from "sequelize";
import { DataType } from "sequelize-typescript";

export class Account extends Model {
    account_id!: string
    user_id!: string
    account_name!: string
    balance!: number
    createdAt!: Date
}

export const AccountModel = sequelize.define<Account>(
    'Account',
    {
        account_id: {
            type: DataType.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataType.UUIDV4,
        },
        user_id: {
            type: DataType.UUID,
            allowNull: false,
            defaultValue: DataType.UUIDV4,
        },
        account_name: {
            type: DataType.STRING(),
            allowNull: true
        },
        balance: {
            type: DataType.INTEGER(),
            allowNull: true
        },
        createdAt: {
            type: DataType.DATE(),
            allowNull: false,
        }
    },
    {
        tableName: "Account", // ชื่อ Table ในฐานข้อมูล
        timestamps: true, // สร้าง createdAt และ updatedAt อัตโนมัติ
        freezeTableName: true, // ใช้ชื่อ Table ตามที่กำหนดไว้
    }
)

AccountModel.sync({ alter: true }).then(() => console.log("Database synchronized!")).catch((error) => console.error("Error synchronizing database:", error));