const express = require('express')
const bodyParser = require('body-parser');
const dotEnv = require('dotenv')
const morgan = require('morgan')

const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')

const {notFound,errorHandler} = require('./middleware/errorMiddleware')


const connectDB = require('./config/db')

dotEnv.config();

connectDB();

const app = express();

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization,X-Auth-Token');
  next();
})


const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV;

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/config/paypal',(req,res)=> res.send(process.env.PAYPAL_CLIENT_ID))

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`));
