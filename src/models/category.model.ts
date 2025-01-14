// category_id	INT (PK)	รหัสประเภทการใช้จ่าย
// user_id	INT (FK)	รหัสผู้ใช้
// category_name	VARCHAR(100)	ชื่อประเภทการใช้จ่าย
// created_at	DATETIME	วันที่สร้าง

import { Model } from 'sequelize'
import { sequelize } from "../utils/database"
import { DataType } from 'sequelize-typescript'

export class Category extends Model {
    category_id!: string
    user_id!: string
    category_name!: string
    createdAt!: Date
}

export const CategoryModel = sequelize.define<Category>(
    "Category",
    {
        category_id: {
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
        category_name: {
            type: DataType.STRING(),
            allowNull: false,
        },
        createdAt: {
            type: DataType.DATE(),
            allowNull: false,
        }
    },
    {
        tableName: "Category", // ชื่อ Table ในฐานข้อมูล
        timestamps: true, // สร้าง createdAt และ updatedAt อัตโนมัติ
        freezeTableName: true, // ใช้ชื่อ Table ตามที่กำหนดไว้
    }
)

CategoryModel.sync({ alter: true }).then(() => console.log("Database synchronized!")).catch((error) => console.error("Error synchronizing database:", error));