const fs = require("fs");

class ProductManager {
  constructor() {
    //this.products = [];
    this.path = "./dataBase.json";
  }

  /*getProducts() {
    fs.readFile(this.path, (err, data) => {
      if (err) {
        this.products = [];
        return;
      }
      this.products = data;
    });
    return this.products;
  }*/

  getProducts() {
    return this.read()
  };
  
  
  read() {
    try {
      // Check if the file exists before reading it
      if (!fs.existsSync(this.path)) {
        this.write([]); // create a new file with empty array if it doesn't exist
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

  addItem(item) {
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
    this.addItem(newProduct);
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

const productManager1 = new ProductManager();
productManager1.write([])
console.log(productManager1.read());

let productoAgregado;
productoAgregado = productManager1.addProduct(
  "producto prueba",
  "Esto es un producto prueba",
  200,
  "sin imagen",
  "abc123",
  25
);

console.log(productoAgregado);
console.log(productManager1.read());

try {
  productManager1.addProduct(
    "producto prubea",
    "Esto es un producto prueba",
    200,
    "sin imagen",
    "abc123",
    25
  );
} catch (error) {
  console.log(error);
}

try {
  productManager1.getProductById(7331);
} catch (error) {
  console.log(error);
}

console.log(productManager1.getProductById(productoAgregado.id));
console.log("FIN DE TEST");
