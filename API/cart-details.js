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
    .get(orderProducts);


async function addProduct(req, res){
    try{
        const id = req.cookies.customerID;
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
        const id = req.cookies.customerID;
        const customer = await Customer.findOne({ _id: id });
        if (!customer) {
            console.log('User not found');
            res.send("Invalid Credentials");
            return;
        }

        const orderIDs = customer.orders;
        console.log(orderIDs);
        async function addOrder(element){
            const order = {
                customer: id,
                products: element,
                status: 'pending',
            }
            let data = await Order.create(order);
            orderIDs.push(data._id);
            await customer.orders.push(data._id);
            //console.log(customer);
            console.log('Order made');
        }

        async function iterateArrayField() {
            await Promise.all(customer.cart.map(async (element) => {
                await addOrder(element);
            }));
        }

        iterateArrayField();

        // customer.cart.forEach(async function(element, index) {
        //     const productID = customer.cart[index];
        //     const order = {
        //         customer: id,
        //         products: productID,
        //         status: 'pending',
        //     }
        //     let data = await Order.create(order);
        //     //orderIDs.push(data._id);
        //     customer.orders.push(data._id);
        //     console.log(customer);
        //     console.log('Order made');
        // });
        

        customer.cart = [];
        const data = await customer.save();
        console.log(data);
        console.log(orderIDs)
        console.log('Emptied Cart');
        res.send(customer);
    } catch(err){
        //console.log(err);
        //console.log(req.cookies);
        res.send(err);
        return;
    }
}



module.exports = cartRouter;


