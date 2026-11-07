import type { Request, Response } from 'express';
import prisma from '../lib/prisma.js';

// GET /products
export async function getProducts(_req: Request, res: Response): Promise<void> {
  const products = await prisma.product.findMany();

  res.status(200).json(products);
}

// GET /product by ID
export async function getProductById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(404).json({
      message: 'Produk tidak ditemukan',
    });
    return;
  }

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    res.status(404).json({
      message: 'Produk tidak ditemukan',
    });
    return;
  }

  res.status(200).json(product);
}

// POST /products
export async function createProduct(req: Request, res: Response): Promise<void> {
  const { name, price } = req.body;

  if (
    typeof name !== 'string' ||
    name.trim() === '' ||
    typeof price !== 'number' ||
    !Number.isFinite(price) ||
    price <= 0
  ) {
    res.status(400).json({
      message: 'Nama dan harga produk tidak valid',
    });
    return;
  }

  const newProduct = await prisma.product.create({
    data: {
      name: name.trim(),
      price,
    },
  });

  res.status(201).json(newProduct);
}

// PUT /products
export async function updateProduct(req: Request, res: Response): Promise<void> {
  const body: unknown = req.body;

  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    res.status(400).json({
      message: 'Data produk tidak valid',
    });
    return;
  }

  const { id, name, price } = body as Record<string, unknown>;

  if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) {
    res.status(400).json({
      message: 'ID produk tidak valid',
    });
    return;
  }

  if (
    typeof name !== 'string' ||
    name.trim() === '' ||
    typeof price !== 'number' ||
    !Number.isFinite(price) ||
    price <= 0
  ) {
    res.status(400).json({
      message: 'Nama dan harga produk tidak valid',
    });
    return;
  }

  const existingProduct = await prisma.product.findUnique({
    where: { id },
  });

  if (!existingProduct) {
    res.status(404).json({
      message: 'Produk tidak ditemukan',
    });
    return;
  }

  const updatedProduct = await prisma.product.update({
    where: { id },
    data: {
      name: name.trim(),
      price,
    },
  });

  res.status(200).json(updatedProduct);
}
