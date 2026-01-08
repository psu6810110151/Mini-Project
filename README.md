# 🚆 CoE Railway - Train Ticket Booking System

![Project Banner](frontend/src/bg-head.png)
> *ระบบจองตั๋วรถไฟออนไลน์ที่ทันสมัย สะดวก และรวดเร็ว*

**CoE Railway** คือเว็บแอปพลิเคชันสำหรับจองตั๋วรถไฟออนไลน์ที่พัฒนาด้วย **React + TypeScript** และ **NestJS** (Mock Database) มุ่งเน้นการมอบประสบการณ์การใช้งานที่ลื่นไหล สวยงาม และฟังก์ชันที่ครบถ้วน รองรับการทำงานทั้งในฝั่งผู้ใช้งานทั่วไป (User) และผู้ดูแลระบบ (Admin)

---

## ✨ ฟีเจอร์หลัก (Key Features)

### 👤 สำหรับผู้ใช้งาน (User)
* **🔍 ค้นหาเที่ยวรถ (Search Trains):** ค้นหาขบวนรถไฟได้ง่ายๆ เพียงระบุต้นทาง ปลายทาง วันเดินทาง และจำนวนผู้โดยสาร
* **🕒 ตารางเดินรถเรียลไทม์:** แสดงข้อมูลเวลาออก-ถึง ระยะเวลาเดินทาง และราคาตั๋วที่คำนวณตามระยะทางจริงและประเภทที่นั่ง
* **💺 เลือกที่นั่ง (Seat Selection):** ระบบเลือกที่นั่งแบบ Interactive เห็นผังที่นั่งชัดเจน แยกฝั่งทางเดินและหน้าต่าง
* **🎫 จัดการตั๋ว (My Tickets):** ดูประวัติการจองทั้งหมด ตรวจสอบสถานะ (Confirmed/Cancelled) และดูรายละเอียด PNR
* **🖨️ พิมพ์ตั๋ว (Print Ticket):** ฟังก์ชันใหม่! สามารถกดพิมพ์ตั๋วโดยสารออกมาเป็นกระดาษหรือบันทึกเป็น PDF ได้ทันที
* **❌ ยกเลิกตั๋ว:** ผู้ใช้สามารถกดยกเลิกการจองได้ด้วยตนเอง (หากยังไม่ถึงกำหนดเวลาเดินทาง)

### 🛡️ สำหรับผู้ดูแลระบบ (Admin)
* **📊 แดชบอร์ด (Dashboard):** ดูภาพรวมของระบบ เช่น ยอดขายรวม, จำนวนตั๋วที่ขายแล้ว และจำนวนเที่ยวรถทั้งหมด
* **➕ เพิ่มเที่ยวรถ (Add Train):** ฟอร์มสำหรับเพิ่มขบวนรถใหม่ กำหนดรายละเอียดได้ครบถ้วน (ชื่อ, เวลา, ประเภทรถ, ราคาฐาน)
* **🗑️ จัดการเที่ยวรถ (Manage Trains):** ตารางแสดงรายการรถไฟทั้งหมด พร้อมปุ่มลบเที่ยวรถที่ไม่ต้องการออกจากระบบ
* **📝 ตรวจสอบการจอง:** ดูรายการจองล่าสุดของผู้ใช้ทุกคนในระบบ

---

## 📸 ภาพตัวอย่าง (Screenshots)

| หน้าแรก (Home) | การเลือกที่นั่ง (Seat Selection) |
| :---: | :---: |
| <img src="path/to/image_d38f87.jpg" width="400" /> | <img src="path/to/Screenshot_2026-01-09_015746.jpg" width="400" /> |

| แดชบอร์ด Admin | ตัวอย่างตั๋ว (Ticket Print) |
| :---: | :---: |
| <img src="path/to/Screenshot_2026-01-09_015825.png" width="400" /> | <img src="path/to/Screenshot_2026-01-09_015808.png" width="400" /> |

*(หมายเหตุ: กรุณาอัปโหลดรูปภาพเข้าในโฟลเดอร์ของโปรเจกต์ และแก้ไข path ให้ถูกต้อง)*

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

* **Frontend:** React, TypeScript
* **Styling:** Bootstrap 5, CSS Modules
* **Icons:** React Icons (FontAwesome)
* **State Management:** React Hooks (`useState`, `useEffect`) + LocalStorage
* **Tools:** Vite, Git, VS Code

---

## 🚀 วิธีการติดตั้งและรันโปรเจกต์ (Installation)

1.  **Clone โปรเจกต์**
    ```bash
    git clone [https://github.com/psu6810110151/Mini-Project.git](https://github.com/psu6810110151/Mini-Project.git)
    ```
2.  **เข้าสู่โฟลเดอร์ frontend**
    ```bash
    cd frontend
    ```
3.  **ติดตั้ง Dependencies**
    ```bash
    npm install
    ```
4.  **รันโปรเจกต์**
    ```bash
    npm run dev
    ```

---

## 👥 คณะผู้พัฒนา (Developers)

โปรเจกต์นี้เป็นส่วนหนึ่งของรายวิชา **Computer Engineering** คณะวิศวกรรมศาสตร์ มหาวิทยาลัยสงขลานครินทร์

| ชื่อ - นามสกุล | รหัสนักศึกษา | หน้าที่รับผิดชอบ |
| :--- | :---: | :--- |
| **1. Thanchanok Malikaew** | **6810110151** | Frontend Developer / System Design |
| **2. Puntippa Decharun** | **6810110648** | Backend Logic / Database / Testing |

---
