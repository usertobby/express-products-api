# Laporan Evidence: API Daftar Produk

## Identitas

- Nama: I Made Tobby Anantha Adiwijaya
- NRP: 5027251064
- Kelas: Pemrograman Web (C)

## Tujuan

Laporan ini mencatat skenario pengujian API produk dengan Express, Prisma, dan PostgreSQL. Collection `postman/products-api.postman_collection.json` mengikuti format file referensi, dengan URL lengkap localhost dan deskripsi hasil yang diharapkan pada setiap request.

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

4. Import file collection ke Postman. Semua URL memakai `http://localhost:3000` dan endpoint yang sesuai.
5. Jalankan request secara berurutan. Testcase detail dan hapus mengasumsikan database baru yang di-seed: `Buku` memiliki ID 1 dan `Pulpen` memiliki ID 2. Jika ID berbeda, sesuaikan path atau ID pada body request. Seed hanya menambahkan produk contoh jika tabel masih kosong.

### Melihat tabel Product di pgAdmin

1. Buka **Servers → server PostgreSQL → Databases → products_db → Schemas → public → Tables**.
2. Klik kanan **Tables**, lalu pilih **Refresh**.
3. Klik kanan tabel **Product**, lalu pilih **View/Edit Data → All Rows**.
4. Setelah menjalankan request POST, PUT, atau DELETE, refresh tabel untuk melihat perubahan.

