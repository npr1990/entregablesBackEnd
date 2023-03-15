const express = require('express');
const CartManager = require('../../cartManager');
const router = express.Router();

const manager = new CartManager();


router.post('/', (req, res) => {
  const cart = req.body;
  const newCart = manager.addCart(
    cart,
  );
  res.status(201).json(newCart);
});


router.get('/', (req, res) => {
  const limit = req.query.limit;
  if (limit) {
    res.json(products.slice(0, limit));
  } else {
    res.json(manager.getCarts());
  }
});

router.post('/:cid/products/:pid', (req, res) => {
  const quantity = req.body;

  const cartId = req.params.cid;
  const productId = req.params.pid;
  try {
    const cartActualizado = manager.updateCart(cartId, productId, quantity);
    res.json(cartActualizado);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;