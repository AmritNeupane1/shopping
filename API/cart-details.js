const express = require('express');
const mongoose = require('mongoose');
const Customer = require("./customer");
const Order = require('./order');
const cookieParser = require('cookie-parser');


const cartRouter = express.Router();

cartRouter
    .route("/addToCart")
    .post(addProduct);

cartRouter
    .route("/orderCart")
    .post(orderProducts);


async function addProduct(req, res){
    try{
        const id = req.body.customerID;
        const customer = await Customer.findOne({ _id: id });
        if (!customer) {
            console.log('User not found');
            res.send("Invalid Credentials");
            return;
        }
        customer.cart.push(req.body.productID);
        const data = await customer.save();
        //console.log(customer);
        res.send(data);
    } catch(err){
        //console.log(err);
        //console.log(req.cookies);
        res.send('It was me, DIO');
        return;
    }
}

async function orderProducts(req, res){
    try{
        const id = req.body.customerID;
        const customer = await Customer.findOne({ _id: id });
        if (!customer) {
            console.log('User not found');
            res.send("Invalid Credentials");
            return;
        }
        async function addOrder(element){
            const order = {
                customer: id,
                products: element,
                status: 'pending',
            }
            let data = await Order.create(order);
            console.log('Order made');
        }

        async function iterateArrayField() {
            await Promise.all(customer.cart.map(async (element) => {
                await addOrder(element);
            }));
        }
        iterateArrayField();
        customer.cart = [];
        const data = await customer.save();
        console.log('Emptied Cart');
        res.send(customer);
    } catch(err){
        res.send(err);
        return;
    }
}



module.exports = cartRouter;


