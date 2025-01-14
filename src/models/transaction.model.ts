// transaction_id	INT (PK)	รหัสธุรกรรม
// user_id	INT (FK)	รหัสผู้ใช้
// account_id	INT (FK)	รหัสบัญชีใช้จ่าย
// category_id	INT (FK)	รหัสประเภทการใช้จ่าย
// amount_before	DECIMAL(10,2)	จำนวนเงินที่ใช้จ่าย/รับเข้า ก่อนหน้า
// amount_latest	DECIMAL(10,2)	จำนวนเงินที่ใช้จ่าย/รับเข้า ล่าสุด
// transaction_date	DATETIME	วันที่ทำธุรกรรม
// note	TEXT	หมายเหตุธุรกรรม (จัดการคำหยาบ)

import { Model } from 'sequelize'
import { sequelize } from "../utils/database"
import { DataType } from 'sequelize-typescript'

export class Transaction extends Model {
    transaction_id!: string
    user_id!: string
    account_id!: string
    category_id!: string
    amount_before!: number
    amount_latest!: number
    transaction_date!: Date
    note!: string
}

export const TransactionModel = sequelize.define<Transaction>(
    'Transaction',
    {
        transaction_id: {
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
        account_id: {
            type: DataType.UUID,
            allowNull: false,
            defaultValue: DataType.UUIDV4,
        },
        category_id: {
            type: DataType.UUID,
            allowNull: false,
            defaultValue: DataType.UUIDV4,
        },
        amount_before: {
            type: DataType.DECIMAL(),
            allowNull: false,
        },
        amount_latest: {
            type: DataType.DECIMAL(),
            allowNull: false,
        },
        transaction_date: {
            type: DataType.DATE(),
            allowNull: false,
        },
        note: {
            type: DataType.TEXT(),
            allowNull: false,
        }
    },
    {
        tableName: "Transaction", // ชื่อ Table ในฐานข้อมูล
        timestamps: true, // สร้าง createdAt และ updatedAt อัตโนมัติ
        freezeTableName: true, // ใช้ชื่อ Table ตามที่กำหนดไว้
    }
)

TransactionModel.sync({ alter: true }).then(() => console.log("Database synchronized!")).catch((error) => console.error("Error synchronizing database:", error));