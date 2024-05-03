import asyncHandler from "../middleware/asyncHandler.js"
import Product from '../models.js/productModel.js';

const getProducts=asyncHandler(async(req,res)=>{
    const products=await Product.find({});
    console.log(products);
    res.json(products);
})

const getProductById=asyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id);
    console.log(req.params.id);
    console.log(product);
    if(product){
        return res.json(product);
    }
    else{
        res.status(404);
        throw new Error('Resource not found');
    }
})

export {getProducts,getProductById}