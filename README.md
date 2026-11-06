# Tugas: API Daftar Produk

## Identitas
Nama    : I Made Tobby Anantha Adiwijaya  
NRP     : 5027251064  
Kelas   : Pemrograman Web (C)  

## Deskripsi
Proyek ini merupakan tugas kelas, yakni Tugas: API Daftar Produk. Di sini kita implementasikan REST API sederhana menggunakan ExpressJS dan TypeScript untuk mengelola data produk.

## Persyaratan
Beberapa hal yang diperlukan:
- Node.js dan npm
- Visual Studio Code
- Postman

## Cara Menjalankan Program

1. **Download atau clone repository**, kemudian buka folder proyek menggunakan Visual Studio Code.

2. **Buka terminal** pada folder proyek.

3. **Install dependencies** dengan menjalankan perintah:

   ```bash
   npm install
   ```

4. **Jalankan server dalam mode development** menggunakan perintah:

   ```bash
   npm run dev
   ```

5. Jika berhasil, terminal akan menampilkan:

   ```text
   Server berjalan di http://localhost:3000
   ```

6. Server sekarang sudah berjalan dan dapat diuji menggunakan Postman.

## Daftar Endpoint API

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/products` | Mengambil seluruh data produk |
| GET | `/products/:id` | Mengambil data produk berdasarkan ID, di contoh pakai ID = 1 |
| GET | `/products/999` | Menguji coba produk tidak ditemukan |
| POST | `/products` | Menambahkan produk baru |

### Contoh Pengujian

**1. GET Semua Produk**

URL:
```text
http://localhost:3000/products
```

**2. GET Produk Berdasarkan ID**

URL:
```text
http://localhost:3000/products/1
```

**3. GET Produk dengan ID Tidak Ditemukan**

URL:
```text
http://localhost:3000/products/999
```

**4. POST Tambah Produk**

URL:
```text
http://localhost:3000/products
```

Pilih Body, lalu klik raw, pilih opsi JSON, kemudian masukkan contoh:

```json
{
  "name": "Pensil",
  "price": 3000
}
```

## Build dan Production

Untuk melakukan compile TypeScript menjadi JavaScript, jalankan:

```bash
npm run build
```

Setelah proses build berhasil, jalankan server menggunakan:

```bash
npm start
```

## Notes

- Data produk disimpan dalam array di dalam aplikasi.
- Data produk yang ditambahkan melalui POST hanya tersimpan selama server berjalan.
- Ketika server dihentikan atau dijalankan ulang, data tambahan akan kembali ke kondisi awal.
- Server harus tetap berjalan ketika melakukan pengujian menggunakan Postman.