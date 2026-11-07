# API Daftar Produk: PostgreSQL dan Prisma

## Identitas

- Nama: I Made Tobby Anantha Adiwijaya
- NRP: 5027251064
- Kelas: Pemrograman Web (C)

## Deskripsi

REST API untuk mengelola data produk menggunakan Express.js, TypeScript, Prisma ORM, dan PostgreSQL. Data produk disimpan di database sehingga tetap tersedia setelah server Express dimulai ulang.

## Teknologi

- Node.js dan npm
- Express.js dan TypeScript
- PostgreSQL
- Prisma ORM
- Postman untuk mencoba endpoint

## Struktur proyek

```text
express-products-api/
├── assets/
│   ├── week9/                  # Screenshot tugas minggu ke-9
│   └── week10/
│       ├── database/           # Bukti perubahan data PostgreSQL
│       └── test-cases/         # Screenshot 13 testcase Postman
├── postman/
│   └── products-api.postman_collection.json
├── prisma/
│   ├── migrations/             # Riwayat perubahan struktur database
│   ├── schema.prisma           # Model Product
│   └── seed.ts                 # Data contoh Buku dan Pulpen
├── src/
│   ├── controllers/
│   │   └── product.controller.ts
│   ├── lib/
│   │   └── prisma.ts           # Prisma Client dan adapter PostgreSQL
│   ├── routes/
│   │   └── product.routes.ts
│   ├── app.ts
│   └── index.ts
├── .env.example              # Template DATABASE_URL lokal
├── .gitignore
├── laporan-evidence.md         # Hasil testcase dan bukti screenshot
├── prisma7.config.ts
├── package.json
├── package-lock.json
└── tsconfig.json
```

## Menjalankan proyek

### 1. Siapkan PostgreSQL

Pastikan server PostgreSQL berjalan dan buat database bernama `products_db` melalui pgAdmin atau SQL:

```sql
CREATE DATABASE products_db;
```

### 2. Pasang dependency

Clone repository, buka folder proyek, lalu jalankan:

```bash
npm install
```

### 3. Atur koneksi database

Salin `.env.example` menjadi `.env`:

```powershell
Copy-Item .env.example .env
```

Di macOS atau Linux, gunakan:

```bash
cp .env.example .env
```

Edit `DATABASE_URL` di `.env` sesuai username, password, host, port, dan nama database PostgreSQL Anda:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/products_db?schema=public"
```

Ganti `USER` dan `PASSWORD` dengan kredensial PostgreSQL lokal. Jika password berisi karakter khusus URL, lakukan URL encoding. Jangan commit `.env`; file tersebut berisi kredensial dan sudah diabaikan Git.

### 4. Buat Prisma Client dan terapkan migration

```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

Migration membuat tabel `Product` di database. Perintah seed menambahkan contoh `Buku` dan `Pulpen` jika tabel masih kosong. Jika sudah ada produk, seed dilewati agar tidak menambah duplikat atau mengubah data.

Seed juga dapat dijalankan lagi kapan saja dengan `npx prisma db seed`. Untuk melihat status migration:

```bash
npx prisma migrate status
```

### 5. Jalankan server

Mode pengembangan:

```bash
npm run dev
```

Server berjalan di `http://localhost:3000`.

Untuk menjalankan versi hasil build:

```bash
npm run build
npm start
```

## Endpoint API

Semua request dengan body menggunakan JSON.

| Method | Endpoint | Deskripsi | Hasil utama |
|---|---|---|---|
| GET | `/products` | Mengambil semua produk sebagai array | `200 OK` |
| GET | `/products/:id` | Mengambil satu produk berdasarkan ID | `200 OK`; `404 Not Found` jika ID tidak valid atau produk tidak ditemukan |
| POST | `/products` | Membuat produk baru | `201 Created`; `400 Bad Request` jika data tidak valid |
| PUT | `/products` | Memperbarui produk; `id` dikirim pada body JSON | `200 OK`; `400 Bad Request` jika body/data/ID tidak valid; `404 Not Found` jika produk tidak ditemukan |
| DELETE | `/products/:id` | Menghapus produk berdasarkan ID | `200 OK`; `400 Bad Request` jika format ID tidak valid; `404 Not Found` jika produk tidak ditemukan |

Body POST dan PUT harus berisi `name` yang tidak kosong dan `price` berupa angka finite lebih besar dari nol. ID produk dibuat otomatis oleh PostgreSQL. ID pada body PUT harus berupa bilangan bulat positif. DELETE mengembalikan `400` untuk ID dengan format tidak valid, sedangkan ID valid yang tidak memiliki produk menghasilkan `404`.

### GET semua produk

```http
GET http://localhost:3000/products
```

Contoh respons `200 OK` setelah seed:

```json
[
  {
    "id": 1,
    "name": "Buku",
    "price": 15000
  },
  {
    "id": 2,
    "name": "Pulpen",
    "price": 5000
  }
]
```

### GET produk berdasarkan ID

```http
GET http://localhost:3000/products/1
```

Contoh respons `200 OK`:

```json
{
  "id": 1,
  "name": "Buku",
  "price": 15000
}
```

Jika produk tidak ditemukan, misalnya `GET /products/999`, API mengembalikan `404 Not Found`:

```json
{
  "message": "Produk tidak ditemukan"
}
```

### POST produk baru

```http
POST http://localhost:3000/products
Content-Type: application/json
```

```json
{
  "name": "Produk Postman",
  "price": 12000
}
```

Contoh respons `201 Created`:

```json
{
  "id": 3,
  "name": "Produk Postman",
  "price": 12000
}
```

Nama tidak boleh kosong dan harga harus berupa angka positif yang valid. Jika validasi gagal, API mengembalikan `400 Bad Request` dengan pesan `Nama dan harga produk tidak valid`.

### PUT memperbarui produk

ID produk dikirim di body bersama nama dan harga:

```http
PUT http://localhost:3000/products
Content-Type: application/json
```

```json
{
  "id": 1,
  "name": "Buku Postman Diubah",
  "price": 15000
}
```

Contoh respons `200 OK` berisi data produk yang telah diperbarui:

```json
{
  "id": 1,
  "name": "Buku Postman Diubah",
  "price": 15000
}
```

ID harus berupa bilangan bulat positif. ID tidak valid menghasilkan `400 Bad Request`; ID produk yang tidak ditemukan menghasilkan `404 Not Found`.

### DELETE produk

```http
DELETE http://localhost:3000/products/2
```

Contoh ini menghapus Pulpen dengan ID `2`. Jika berhasil, API mengembalikan `200 OK`:

```json
{
  "message": "Produk berhasil dihapus"
}
```

ID tidak valid menghasilkan `400 Bad Request`, sedangkan ID yang tidak ditemukan menghasilkan `404 Not Found`. Setelah penghapusan, `GET /products/2` mengembalikan `404 Not Found`.

## Catatan database dan dependency

- Dependency proyek tercatat di `package.json` dan `package-lock.json`; setelah clone, jalankan `npm install`.
- File `.env` dan kredensial PostgreSQL bersifat lokal dan tidak dimasukkan ke Git. Setiap pengguna perlu menyiapkan database serta `.env` sendiri.
- Migration mencatat struktur tabel, sedangkan seed menyiapkan data contoh secara eksplisit. Produk juga dapat ditambahkan melalui endpoint POST.
- PostgreSQL dapat dijalankan secara lokal; Docker tidak diperlukan untuk menjalankan proyek ini.

## Bukti pengujian dan screenshot

- [Laporan evidence dan hasil 13 testcase](laporan-evidence.md)
- [Postman collection untuk API produk](postman/products-api.postman_collection.json)
- Screenshot database dan testcase minggu ke-10 tersedia di `assets/week10/`.
- Screenshot tugas minggu ke-9 tersedia di [galeri Week 9](assets/week9/README.md).
