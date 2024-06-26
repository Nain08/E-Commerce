import mongoose from 'mongoose';
import dotenv from 'dotenv'
import users from './data/users.js';
import products from './data/products.js';
import User from './models.js/userModel.js';
import Product from './models.js/productModel.js';
import Order from './models.js/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData=async()=>{
    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        const createdUsers=await User.insertMany(users);

        const adminUser=createdUsers[0]._id;

        const sampleProducts=products.map((product)=>{
            return {...product,user:adminUser}
        })
        await Product.insertMany(sampleProducts)

        console.log('Data Imported !')
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
}

const destroyData=async()=>{
    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        console.log('Data Destroyed !')
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
}
// If argument is '-d', destroy data
if(process.argv[2]==='-d'){
    destroyData();
}
 // Otherwise, import data
else{
    importData();
}