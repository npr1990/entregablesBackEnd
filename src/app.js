const express = require('express');
const app = express();

const productsRouter = require('./routes/product.router');
const cartsRouter = require('./routes/cart.router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/products', productsRouter);


app.use('/api/carts', cartsRouter);


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong!');
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});