const express = require("express");
const bodyParser = require("body-parser");
const ProductManager = require("../productManager.js");

const app = express();
app.use(bodyParser.json());

const manager = new ProductManager();

app.get("/products", (req, res) => {
  const limit = req.query.limit;
  const product = manager.getProducts();
  if (limit) {
    res.json(products.slice(0, limit));
  } else {
    res.json(manager.getProducts());
  }
});

app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const product = manager.getProductById(id);
  if (!product) {
    res.status(404).json({ error: `Producto con ID ${id} no encontrado` });
  } else {
    res.json(product);
  }
});

app.post("/products", (req, res) => {
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

app.put("/products/:id", (req, res) => {
  const id = req.params.id;

  try {
    const productoActualizado = manager.updateProduct(id, req.body);
    res.json(productoActualizado);
  } catch (error) {
    res.status(400).json({ error });
  }
});

app.delete("/products/:id", (req, res) => {
  const id = req.params.id;
  try {
    const productoEliminado = manager.deleteProduct(id);
    res.json(productoEliminado);
  } catch (error) {
    res.status(404).json({ error });
  }
});

app.listen(8080, () => {
  console.log("Servidor iniciado en el puerto 8080");
});
