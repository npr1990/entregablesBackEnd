class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const id = this.generateId();
    const existingProduct = this.products.find((p) => p.code === code);
    if (existingProduct) {
      throw new Error(`Product with code ${code} already exists`);
    }
    const newProduct = { id, title, description, price, thumbnail, code, stock };
    this.products.push(newProduct);
    return newProduct;
  }
  

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return product;
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Product with id ${id} not found`);
    }
    if (updatedProduct.id && updatedProduct.id !== id) {
      throw new Error(`Cannot update product id`);
    }
    this.products[index] = { ...this.products[index], ...updatedProduct };
    return this.products[index];
  }

  deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Product with id ${id} not found`);
    }
    const deletedProduct = this.products[index];
    this.products.splice(index, 1);
    return deletedProduct;
  }

  generateId() {
    let id;
    do {
      id = Math.floor(Math.random() * 1000000);
    } while (this.products.some((p) => p.id === id));
    return id;
  }
}


const productManager1 = new ProductManager()
console.log(productManager1.getProducts()) 

let productoAgregado;
productoAgregado = productManager1.addProduct("producto prubea", "Esto es un producto prueba", 200, "sin imagen", "abc123", 25);

console.log(productoAgregado)
console.log(productManager1.getProducts())

try {
  productManager1.addProduct("producto prubea", "Esto es un producto prueba", 200, "sin imagen", "abc123", 25)
} catch (error) {
  console.log(error)
}



try {
  productManager1.getProductById(7331)
} catch (error) {
  console.log(error)
}

console.log(productManager1.getProductById(productoAgregado.id))