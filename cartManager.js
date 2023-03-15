const fs = require("fs");

class CartManager {
  constructor() {
    this.path = "./cart.json";
  }

  
  getCarts() {
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

  addCart(products) {
    const id = this.generateId();
    const newCart = {
      id,
      products,
    };
    this.#addItem(newCart);
    return newCart;
  }

  getCartById(id) {
    const cart = this.read().find((c) => c.id === id);
    if (!cart) {
      throw new Error(`Cart with id ${id} not found`);
    }
    return cart;
  }

  updateCart(cid, pid, quantity) {
    const myCarts = this.read();
    const index = myCarts.findIndex((c) => c.id === cid);


    if (index === -1) {
      throw new Error(`Cart with id ${id} not found`);
    }
    const myCart = myCarts[index];
    const product = myCart.products.find(p=>p.id === pid)
    if(product) {
      product.quantity += quantity;

    } else {
      myCart.products.push({id:pid, quantity})
    }
    myCarts[index] = myCart;
    this.write(myCarts);
    return myCart[index];
  }

  deleteCart(id) {
    const myCarts = this.read();
    const index = myCarts.findIndex((c) => c.id === id);
    if (index === -1) {
      throw new Error(`Cart with id ${id} not found`);
    }
    const deletedCart = myCarts[index];
    myCarts.splice(index, 1);
    this.write(myCarts);
    return deletedCart;
  }

  generateId() {
    const myCarts = this.read();
    let id;
    do {
      id = Math.floor(Math.random() * 1000000);
    } while (myCarts.some((c) => c.id === id));
    return id;
  };
};




module.exports = CartManager;