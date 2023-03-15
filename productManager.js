const fs = require("fs");

class ProductManager {
  constructor() {

    this.path = "./product.json";
  }


  getProducts() {
    return this.read()
  };
  
  
  read() {
    try {

      if (!fs.existsSync(this.path)) {
        this.write([]); 
      }
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      console.error(`Error reading file ${this.path}: ${err}`);
      return [];
    }
  }

  write(data) {
    try {
      const jsonData = JSON.stringify(data);
      fs.writeFileSync(this.path, jsonData, "utf8");
    } catch (err) {
      console.error(`Error writing file ${this.path}: ${err}`);
    }
  }

  #addItem(item) {
    const data = this.read();
    data.push(item);
    this.write(data);
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const id = this.generateId();
    const existingProduct = this.read().find((p) => p.code === code);
    if (existingProduct) {
      throw new Error(`Product with code ${code} already exists`);
    }
    const newProduct = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.#addItem(newProduct);
    return newProduct;
  }

  getProductById(id) {
    const product = this.read().find((p) => p.id === id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return product;
  }

  updateProduct(id, updatedProduct) {
    const myProducts = this.read();
    const index = myProducts.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Product with id ${id} not found`);
    }
    if (updatedProduct.id && updatedProduct.id !== id) {
      throw new Error(`Cannot update product id`);
    }
    myProducts[index] = { ...myProducts[index], ...updatedProduct };
    this.write(myProducts);
    return myProducts[index];
  }

  deleteProduct(id) {
    const myProducts = this.read();
    const index = myProducts.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Product with id ${id} not found`);
    }
    const deletedProduct = myProducts[index];
    myProducts.splice(index, 1);
    this.write(myProducts);
    return deletedProduct;
  }

  generateId() {
    const myProducts = this.read();
    let id;
    do {
      id = Math.floor(Math.random() * 1000000);
    } while (myProducts.some((p) => p.id === id));
    return id;
  };
};


module.exports = ProductManager;