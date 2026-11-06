import type { Request, Response } from 'express';

const products = [
  { id: 1, name: 'Buku', price: 15000 },
  { id: 2, name: 'Pulpen', price: 5000 },
];

// GET /products
export function getProducts(req: Request, res: Response) {
  res.status(200).json(products);
}

// GET /product by ID
export function getProductById(req: Request, res: Response) {
  const id = Number(req.params.id);

  const product = products.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({
      message: 'Produk tidak ditemukan',
    });
  }

  return res.status(200).json(product);
}

// POST /products
export function createProduct(req: Request, res: Response) {
  const { name, price } = req.body;

  if (
    typeof name !== 'string' ||
    name.trim() === '' ||
    typeof price !== 'number' ||
    !Number.isFinite(price) ||
    price <= 0
  ) {
    return res.status(400).json({
      message: 'Nama dan harga produk tidak valid',
    });
  }

  const newId = Math.max(...products.map((item) => item.id)) + 1;

  const newProduct = {
    id: newId,
    name: name.trim(),
    price: price,
  };

  products.push(newProduct);

  return res.status(201).json(newProduct);
}
