// transaction_id	INT (PK)	รหัสธุรกรรม
// user_id	INT (FK)	รหัสผู้ใช้
// account_id	INT (FK)	รหัสบัญชีใช้จ่าย
// category_id	INT (FK)	รหัสประเภทการใช้จ่าย
// amount	DECIMAL(10,2)	จำนวนเงินที่ใช้จ่าย/รับเข้า
// transaction_date	DATETIME	วันที่ทำธุรกรรม
// note	TEXT	หมายเหตุธุรกรรม (จัดการคำหยาบ)