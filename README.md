# expense

ระบบจัดการธุรกรรม (Transaction Management System)
ระบบจัดการธุรกรรมช่วยในการจัดการและบันทึกข้อมูลเกี่ยวกับธุรกรรมทางการเงิน โดยรองรับการบันทึกบัญชี รายการใช้จ่าย รายการรับเงิน และการสรุปรายงานต่าง ๆ

คุณสมบัติของระบบ

- จัดการผู้ใช้งาน
- บันทึกข้อมูลธุรกรรม (รหัสบัญชี, ประเภท, จำนวนเงิน, วันที่ และหมายเหตุ)
- รองรับการกรองข้อมูลตามช่วงเวลา
- สรุปยอดรวมรายรับ/รายจ่าย
- ใช้ฐานข้อมูล PostgreSQL
- พัฒนาโดยใช้ Node.js และ TypeScript
- ใช้ Sequelize เป็น ORM สำหรับจัดการฐานข้อมูล

ระบบที่จะพัฒนาในอนาคต

- สร้างผู้ใช้งานเพิ่ม
- เปลี่ยนรหัสผ่าน
- แก้ไขธุรกรรม
- แจ้งเตือนผ่านแอปหรืออีเมล
- เชื่อมต่อกับ API ภายนอก

ขั้นตอนการใช้งานระบบ

1. Clone Repository ไปลงเครื่อง
2. เข้าไปที่ Directory ของโฟลเดอร์นี้
3. ใช้คำสั่ง npm i ใน command เพื่อดาวน์โหลด package ที่จำเป็นในการใช้งาน
4. ใช้คำสั่ง npm run build
5. ใช้คำสั่ง npm run serve
6. ทดสอบ API ตาม Postman ได้เลย

API ที่สามารถใช้งานได้

1. http://localhost:3001/api/v1/auth/login
   - ใช้สำหรับ Login เพื่อรับ Token โดนจะใส่ไว้ใน cookie
2. http://localhost:3001/api/v1/account
   - ใช้สำหรับดูบัญชีทั้งหมด
3. http://localhost:3001/api/v1/account/get_page?page=1&limit=10
   - ใช้สำหรับดูบัญชีโดยสามารถกำหนดจำนวนที่ต้องการดูได้
4. http://localhost:3001/api/v1/account/create
   - ใช้สำหรับสร้างบัญชี
5. http://localhost:3001/api/v1/account/delete
   - ใช้สำหรับลบบัญชี
6. http://localhost:3001/api/v1/category
   - ใช้สำหรับดูประเภทของการใช้จ่ายทั้งหมด
7. http://localhost:3001/api/v1/category/get_page?page=1&limit=10
   - ใช้สำหรับดูประเภทของการใช้จ่ายโดยสามารถกำหนดจำนวนที่ต้องการดูได้
8. http://localhost:3001/api/v1/category/create
   - ใช้สร้างประเภทการใช้จ่าย
9. http://localhost:3001/api/v1/category/delete
   - ใช้ลบประเภทการสช้จ่าย
10. http://localhost:3001/api/v1/transaction

- ใช้ดูประวัติธุรกรรมทั้งหมด

11. http://localhost:3001/api/v1/transaction/get_page?page=1&limit=10

- ใช้ดูประวัติธุรกรรมโดนสามารถกำหนดจำนวนที่ต้องการดูได้

12. http://localhost:3001/api/v1/transaction/create

- ใช้สร้างธุรกรรม

13. http://localhost:3001/api/v1/transaction/summary

- ใช้ดูยอดธุรกรรมที่ทำทั้งหมด

หมายเหตุ table จะถูกสร้างขึ้นเองด้วย sequelize
หมายเหตุ(2) file env ไม่ได้ ignore ไว้เนื่องจากจำเป็นต้องใช้งานด้วย
หมายเหตุ(3) DB_USER, DB_PASSWORD ให้ใช้ตามที่ได้ติดตั้งลงไปในเครื่องที่ต้องการใช้งานโปรแกรม
