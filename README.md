# 🎓 Schoola — School Management System

Schoola adalah aplikasi **manajemen data sekolah** yang membantu dalam mengelola:

- 👨‍🎓 Data Siswa
- 👩‍🏫 Data Guru
- 📘 Data Mata Pelajaran
- 🔗 Enrollment (relasi siswa ke pelajaran)

---

## 🛠️ Tech Stack

| Layer    | Technology          |
| -------- | ------------------- |
| Frontend | Vue.js              |
| Backend  | Strapi Headless CMS |
| Database | MySQL               |
| Styling  | Tailwind CSS        |

---

## 📊 Apa itu Normalisasi Basis Data?

Normalisasi basis data adalah proses menyusun struktur tabel dalam basis data relational untuk mengurangi **redundansi** data (pengulangan) dan meningkatkan **integritas** data (data lebih konsisten dan rapi).

---

## 📋 Contoh Tabel yang Belum Dinormalisasi (UNF, unnormalized form)

Data pada satu tabel memiliki banyak nilai dalam satu kolom:

| student_name | nisn | lesson_name   | teacher     |
| ------------ | ---- | ------------- | ----------- |
| Joko         | 001  | Math, Science | John, Jordi |
| Johan        | 002  | Math          | John        |

---

## 📈 Proses Normalisasi

Proses normalisasi terdiri dari beberapa tahap, yaitu : **1NF**, **2NF**, dan **3NF**.

### 1NF (First Normal Form)

- Kolom harus bernilai **atomik**
- Tidak boleh ada **repeating group** / pengulangan kolom sejenis

### 2NF (Second Normal Form)

- Sudah memenuhi 1NF
- Setiap kolom non-primary key harus bergantung **sepenuhnya** pada primary key (tidak hanya sebagian)

### 3NF (Third Normal Form)

- Sudah memenuhi 2NF
- Tidak ada **transitive dependency** (kolom non-primary tidak boleh bergantung pada kolom non-primary lain)

---

## 🗃️ Tabel yang Sudah Dinormalisasi

### Tabel `teacher`

| id  | teacher_name |
| --- | ------------ |
| 1   | John         |
| 2   | Jordi        |

### Tabel `lesson`

| id  | lesson_name | teacher_id |
| --- | ----------- | ---------- |
| 1   | Math        | 1          |
| 2   | Science     | 2          |

### Tabel `student`

| id  | student_name | nisn |
| --- | ------------ | ---- |
| 1   | Joko         | 001  |
| 2   | Johan        | 002  |
| 3   | Putri        | 003  |

### Tabel `student_lesson`

| id  | student_id | lesson_id |
| --- | ---------- | --------- |
| 1   | 1          | 1         |
| 2   | 1          | 2         |
| 3   | 2          | 1         |

Setelah dilakukan normalisasi data dibagi menjadi 3 tabel terpisah, agar memenuhi aturan normalisasi:

- Setiap kolom bernilai atomik
- Tidak ada pengulangan kolom sejenis
- Setiap kolom non-primary key bergantung sepenuhnya pada primary key
- Tidak ada transitive dependency antar kolom non-primary

---

## ✨ Key Features

| Fitur               | Keterangan                       |
| ------------------- | -------------------------------- |
| CRUD Siswa          | Tambah, edit, hapus data siswa   |
| CRUD Guru           | Kelola guru pengajar             |
| CRUD Mata Pelajaran | Terhubung dengan data guru       |
| Enrollment          | Relasi dinamis siswa — pelajaran |
| Pencarian Cepat     | Live search pada setiap list     |
| UI Modern           | User-friendly dashboard          |

---

## 🚀 Installation & Setup

## Instalasi Aplikasi – Vue.js + Strapi

Repositori ini berisi dua bagian utama:

- **frontend/**: Aplikasi frontend menggunakan VueJS
- **backend/**: API backend menggunakan Strapi

---

## Prasyarat

- [Node.js](https://nodejs.org/) v18+
- [MySQL](https://www.mysql.com/)

## Panduan Instalasi

### 1. Clone Repository

```bash
https://github.com/aalfath7/test_app.git
cd test_app
```

### 2. Persiapan Basis Data

Jalankan MySQL server (misalnya menggunakan XAMPP).

Buat basis data baru dengan nama `school_db` di MySQL.

Import file `school_db.sql` di folder backend ke dalam basis data tersebut.

### 3. Install & Run Backend (Strapi)

```
cd backend
```

Install dependencies

```
npm install
```

Salin file .env.example menjadi .env

```
cp .env.example .env
```

Jalankan Strapi

```
npm run develop
```

Akses Strapi di:

```
http://localhost:1337/admin
```

Buat akun admin terlebih dahulu.

<img src="strapi-regis.png" alt="Daftar Akun Admin" width="240"/>

Setelah itu, akan masuk ke dashboard Strapi.

### 4. Install & Run Frontend (Vue.js)

buka terminal baru

```
cd frontend
```

Install dependencies

```
npm install
```

Jalankan development server

```
npm run dev
```

Akses aplikasi Vue di:

```
http://localhost:5173
```

Login menggunakan username : `tes` dan password : `123456`.

atau buat user baru di dashboard Strapi.

---
