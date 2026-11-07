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
| GET | `/products` | Mengambil semua produk | `200 OK` |
| GET | `/products/:id` | Mengambil produk berdasarkan ID | `200 OK`, atau `404 Not Found` |
| POST | `/products` | Menambahkan produk | `201 Created`, atau `400 Bad Request` |
| PUT | `/products` | Memperbarui produk berdasarkan `id` pada body | `200 OK`, `400 Bad Request`, atau `404 Not Found` |
| DELETE | `/products/:id` | Menghapus produk berdasarkan ID | `200 OK`, `400 Bad Request`, atau `404 Not Found` |

Produk memiliki `id` otomatis, `name` berupa string, dan `price` berupa angka positif. Validasi yang gagal menghasilkan respons `400`. Produk atau ID yang tidak ditemukan menghasilkan respons `404`.

### GET semua produk

```http
GET http://localhost:3000/products
```

Respons berupa array JSON, misalnya:

```json
[
  {
    "id": 1,
    "name": "Pensil",
    "price": 3000
  }
]
```

### GET produk berdasarkan ID

```http
GET http://localhost:3000/products/1
```

### POST produk baru

```http
POST http://localhost:3000/products
Content-Type: application/json
```

```json
{
  "name": "Pensil",
  "price": 3000
}
```

Nama tidak boleh kosong dan harga harus berupa angka positif yang valid.

### PUT memperbarui produk

ID produk dikirim di body bersama nama dan harga:

```http
PUT http://localhost:3000/products
Content-Type: application/json
```

```json
{
  "id": 1,
  "name": "Pensil 2B",
  "price": 3500
}
```

ID harus berupa bilangan bulat positif. API mengembalikan `404` jika produk dengan ID tersebut tidak ditemukan.

### DELETE produk

```http
DELETE http://localhost:3000/products/1
```

Jika berhasil, respons berisi pesan `Produk berhasil dihapus`.

## Catatan database dan dependency

- Dependency proyek tercatat di `package.json` dan `package-lock.json`; setelah clone, jalankan `npm install`.
- File `.env` dan kredensial PostgreSQL bersifat lokal dan tidak dimasukkan ke Git. Setiap pengguna perlu menyiapkan database serta `.env` sendiri.
- Migration mencatat struktur tabel, sedangkan seed menyiapkan data contoh secara eksplisit. Produk juga dapat ditambahkan melalui endpoint POST.
- PostgreSQL dapat dijalankan secara lokal; Docker tidak diperlukan untuk menjalankan proyek ini.

## Bukti pengujian dan screenshot

- [Laporan evidence dan hasil 13 testcase](laporan-evidence.md)
- [Postman collection untuk API produk](postman/products-api.postman_collection.json)
- Screenshot database dan testcase minggu ke-10 tersedia di `assets/week10/`.
- Screenshot tugas minggu ke-9 dipertahankan di `assets/week9/`:
  - [GET semua produk](assets/week9/%5BGET%5D%20All-Products.png)
  - [GET semua produk setelah POST](assets/week9/%5BGET%5D%20All-Products-After-POST.png)
  - [GET produk berdasarkan ID](assets/week9/%5BGET%5D%20Product-by-ID.png)
  - [POST membuat produk](assets/week9/%5BPOST%5D%20Create-Product.png)
  - [Produk tidak ditemukan](assets/week9/%5B404%5D%20Product-Not-Found.png)
