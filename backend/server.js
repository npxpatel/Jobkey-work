import express, { json } from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';

// import productRoutes from './routes/productRoutes';
// import orderRoutes from './routes/orderRoutes';

const PORT = process.env.PORT;
dotenv.config();
const app = express();

app.use(cors());
app.use(json());

app.use('/api/users', userRoutes)
// app.use('/api/products', productRoutes);
// app.use('/api/orders', orderRoutes);


app.use('/', (req, res) =>{
    res.send('Server is up and running');
})

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})
