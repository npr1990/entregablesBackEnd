const express = require('express');
const ProductManager = require('../../productManager');
const router = express.Router();

const manager = new ProductManager();


// GET all products
router.get('/', (req, res) => {
  const limit = req.query.limit;
  if (limit) {
    res.json(products.slice(0, limit));
  } else {
    res.json(manager.getProducts());
  }
});

// GET a specific product by ID
router.get('/:pid', (req, res) => {
  const pid = req.params.pid;
  const product = manager.getProductById(pid);
  if (!product) {
    res.status(404).json({ error: `Producto con ID ${pid} no encontrado` });
  } else {
    res.json(product);
  }
});


router.post('/', (req, res) => {
  const product = req.body;
  const newProduct = manager.addProduct(
    product.title,
    product.description,
    product.price,
    product.thumbnail,
    product.code,
    product.stock,
  );
  res.status(201).json(newProduct);
});


router.put('/:pid', (req, res) => {
  const id = req.params.pid;
  try {
    const productoActualizado = manager.updateProduct(id, req.body);
    res.json(productoActualizado);
  } catch (error) {
    res.status(400).json({ error });
  }
});


router.delete('/:pid', (req, res) => {
  const id = req.params.pid;
  try {
    const productoEliminado = manager.deleteProduct(id);
    res.json(productoEliminado);
  } catch (error) {
    res.status(404).json({ error });
  }
});

module.exports = router;
