const express = require('express');
const cors = require('cors');
const app = express();
const userAuth = require('./middleware/userAuth')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')

const PORT = process.env.PORT;
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/orders',orderRoutes);


app.use('/', (req, res) =>{
    res.send('Server is up and running');
})

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})
