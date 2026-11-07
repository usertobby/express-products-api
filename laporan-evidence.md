# Laporan Evidence: API Daftar Produk

## Identitas

- Nama: I Made Tobby Anantha Adiwijaya
- NRP: 5027251064
- Kelas: Pemrograman Web (C)

## Tujuan

Laporan ini mencatat skenario pengujian API produk dengan Express, Prisma, dan PostgreSQL. Jalankan request dari atas ke bawah menggunakan collection `postman/products-api.postman_collection.json`; beberapa request memakai ID yang disimpan otomatis oleh collection.

## Persiapan

1. Pastikan PostgreSQL berjalan dan database `products_db` tersedia.
2. Isi `DATABASE_URL` pada `.env` dengan kredensial PostgreSQL lokal.
3. Pasang dependency dan siapkan database:

   ```bash
   npm install
   npx prisma generate
   npx prisma migrate dev
   npx prisma db seed
   npm run dev
   ```

4. Import file collection ke Postman. Base URL collection menggunakan `http://localhost:3000`.
5. Jalankan semua request berurutan melalui Collection Runner. Seed mengisi dua produk contoh hanya jika tabel masih kosong.

### Melihat tabel Product di pgAdmin

1. Buka **Servers → server PostgreSQL → Databases → products_db → Schemas → public → Tables**.
2. Klik kanan **Tables**, lalu pilih **Refresh**.
3. Klik kanan tabel **Product**, lalu pilih **View/Edit Data → All Rows**.
4. Setelah menjalankan request POST, PUT, atau DELETE, refresh tabel untuk melihat perubahan.

