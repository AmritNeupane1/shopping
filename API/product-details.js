const express = require('express');
const mongoose = require('mongoose');
const Product = require("./product");
const cookieParser = require('cookie-parser');
const orderRouter = require('./order-details');

const productRouter = express.Router();

productRouter
    .route('/')
    .get(getInfo);

productRouter
    .route('/productPage/:id')
    .get(getProductPageInfo);

productRouter
    .route('/uploadProductData')
    .post(postProductData);

productRouter.use("/placeOrder", orderRouter);


async function getInfo(req, res){
    try{
        const product = await Product.find().limit(20);
        console.log(product);
        res.send(product);
    } catch(err){
        console.log(err);
        res.send('It was me, DIO.');
    }
}

async function getProductPageInfo(req, res){
    try{
        const productID = req.params.id;
        const product = await Product.findOne({_id: productID});
        console.log(product);
        res.send(product);
    } catch(err){
        console.log(err);
        res.send('It was me, DIO.');
    }
}



async function postProductData(req, res){
    try{
        const newProduct = req.body;
        let data = await Product.create(newProduct);
        res.send(" The World");
    } catch(err){
        console.log(err);
        res.send(" Yare Yare");
    }
}



module.exports = productRouter;