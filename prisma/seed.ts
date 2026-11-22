import prisma from '../src/lib/prisma.js';

const sampleProducts = [
  { name: 'Pulpen', price: 5000 },
  { name: 'Buku Tulis', price: 12000 },
  { name: 'Spidol', price: 8000 },
  { name: 'Penggaris', price: 6000 },
  { name: 'Penghapus', price: 3000 },
];

async function main(): Promise<void> {
  const result = await prisma.$transaction(async (transaction) => {
    await transaction.$executeRawUnsafe(
      'TRUNCATE TABLE "Product" RESTART IDENTITY',
    );

    return transaction.product.createMany({ data: sampleProducts });
  });

  console.log(`${result.count} produk contoh berhasil di-seed ulang.`);
}

main()
  .catch((error: unknown) => {
    console.error('Gagal menjalankan seed produk:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
