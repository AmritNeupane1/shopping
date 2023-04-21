const express = require('express');
const mongoose = require('mongoose');
const Product = require("./product")
const cookieParser = require('cookie-parser');


const listRouter = express.Router();

listRouter
    .route("/sort-by-price")
    .post(sortByPrice);



async function sortByPrice(req, res){
    const data = req.body;
    try{
        console.log(data.minPrice, data.maxPrice);
        //let products = await Product.find().sort({ price: 1 });
        let products = await Product.find();
        if (!products) {
            console.log('error');
            res.send("Something Unexpected Happened");
            return;
        }
        products = products.filter(item => item.price >= data.min && item.price <= data.max && (data.size=="size" || item.size[data.size]==true));
        res.send(products);
        console.log(products);
    } catch(err){
        console.log(err);
        return;
    }
}


async function getInfo(req, res){
    try{
        const id = req.cookies.customerID;
        const customer = await Customer.findOne({ _id: id });
        if (!customer) {
            console.log('User not found');
            res.send("Invalid Credentials");
            return;
        }
        console.log(customer);
        res.send(customer);
    } catch(err){
        console.log(err);
        console.log(req.cookies);
        res.send('Your underwear is visible.');
        return;
    }
}

async function putInfo(req, res){
    console.log('It was me, DIO')
    try{
        const id = req.cookies.customerID;
        const customer = await Customer.findOne({ _id: id });
        if (!customer) {
            console.log('User not found');
            res.send("Invalid Credentials");
            return;
        }
        customer.address.push(req.body);
        const data = await customer.save();
        console.log(customer);
        res.send(customer);
    } catch(err){
        //console.log(err);
        //console.log(req.cookies);
        res.send('Your underwear is visible.');
        return;
    }
}

module.exports = listRouter;

