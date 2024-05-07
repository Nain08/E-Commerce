import express from 'express';
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'
import { notFound,errorHandler } from './middleware/errorMiddleware.js';


// Connect to the MongoDB database
connectDB();

// const port=process.env.PORT || 5000;
const port=5000;
const app=express();
// console.log(products)
app.get('/',(req,res)=>{
    res.send('API is running')
})

// Use the product routes defined in productRoutes.js for requests to /api/products
app.use('/api/products',productRoutes)

// Middleware to handle requests for routes that are not found
app.use(notFound);

// Middleware to handle errors
app.use(errorHandler)

app.listen(port,()=>console.log(`Server running on port ${port}`))