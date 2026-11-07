import prisma from '../src/lib/prisma.js';

async function main(): Promise<void> {
  const productCount = await prisma.product.count();

  if (productCount > 0) {
    console.log(`Seed dilewati; database sudah memiliki ${productCount} produk.`);
    return;
  }

  const result = await prisma.product.createMany({
    data: [
      { name: 'Buku', price: 15000 },
      { name: 'Pulpen', price: 5000 },
    ],
  });

  console.log(`${result.count} produk contoh berhasil ditambahkan.`);
}

main()
  .catch((error: unknown) => {
    console.error('Gagal menjalankan seed produk:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
