import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Load environment variables from .env file
dotenv.config();
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import uploadRoutes from './routes/uploadRoutes.js'


// Connect to the MongoDB database
connectDB();

// const port=process.env.PORT || 5000;
const port=5000;
const app=express();

//Body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//cookie-parser middleware
app.use(cookieParser());

// console.log(products)
// app.get('/',(req,res)=>{
//     res.send('API is running')
// })

// Use the product routes defined in productRoutes.js for requests to /api/products
app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploadRoutes)

app.get('/api/config/paypal',(req,res)=>res.send({clientId:process.env.PAYPAL_CLIENT_ID}))

const __dirname=path.resolve() // Set __dirname to current directory
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))
// Middleware to handle requests for routes that are not found
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV==='production'){
    console.log('production build')
    //set static folder
    app.use(express.static(path.join(__dirname,'/frontend/build')))

    //any route that is not api will be redirected to index.html
    app.get('*',(req,res)=>
    res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    )
}
else {
    app.get('/',(req,res)=>{
        res.send('API is running')
    })
}

app.use(notFound);

// Middleware to handle errors
app.use(errorHandler)

app.listen(port,()=>console.log(`Server running on port ${port}`))