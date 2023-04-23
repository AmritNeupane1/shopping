const express = require('express');
const mongoose = require('mongoose');
const Customer = require("./customer");
const Order = require('./order');
const cookieParser = require('cookie-parser');


const customerRouter = express.Router();

customerRouter
    .route("/signup")
    .post(postSignup);

customerRouter
    .route("/signin")
    .get(getSignin)
    .post(postSignin);

customerRouter
    .route("/profile")
    .post(postInfo)
    .get(getInfo);

customerRouter
    .route("/addAddress")
    .post(addAddress);

customerRouter
    .route("/setCookie")
    .post(setCookie);

customerRouter
    .route('/cartInfo')
    .post(getCartInfo);

async function setCookie(req, res){
  res.cookie('mycookie', 'cookievalue', { domain: '.example.com', path: '/' });
  res.send('Cookie set');
}


async function getSignin(req, res){
    try{
        const obj = { isLoggedIn : true};
        console.log("cookies :: ", req.cookies);
        if(req.cookies.customerID)
        {
            console.log("It is true");
            res.send(obj);
        }else{
            obj.isLoggedIn=false;
            console.log("It is false");
            res.send(obj);
        }
    } catch(err){
        console.log(err);
        console.log(req.cookies);
        res.send('Your underwear is visible.');
        return;
    }
}

async function postSignup(req, res){
    try{
        const newCustomer = req.body;
        let data = await Customer.create(newCustomer);
        //res.cookie('customerID', data._id, {maxAge: 1000*60*60*24 ,httpOnly: true});
        res.send(" The World");
    } catch(err){
        console.log(err);
        res.send(" Yare Yare");
    }
}


async function postSignin(req, res){
    const data = req.body;
    try{
        const customer = await Customer.findOne({ email: data.email, password: data.password });
        if (!customer) {
            console.log('User not found');
            res.send("Invalid Credentials");
            return;
        }
        console.log("user Found", customer._id);
        //res.cookie('customerID', customer._id);
        res.send(customer);
    } catch(err){
        console.log(err);
        return;
    }
}


async function getInfo(req, res){
    try{
        //const id = req.body.customerID;
        console.log(req.body.customerID);
        const id = "64441fc45aa4d799ad28b822";
        //console.log("Customer ID :::", req.cookies)
        const customer = await Customer.findOne({ _id: id });
        if (!customer) {
            console.log('User not found');
            res.send("Invalid Credentials");
            return;
        }
        //customer.placedOrder = [];
        const data = customer;
        placedOrder=[];
        const orders = await Order.find({customer: id}).populate("products");
        orders.forEach((element)=>{
            console.log(element);
            placedOrder.push(element);
            console.log("Order Found");
        });
        //data.firstName = "asd";
        data.orders = placedOrder;
        console.log(data);
        res.send(data);
    } catch(err){
        console.log(err);
        console.log(req.cookies);
        res.send('Your underwear is visible.');
        return;
    }
}

async function postInfo(req, res){
    try{
        //const id = req.body.customerID;
        console.log(req.body.customerID);
        const id = req.body.customerID;
        //console.log("Customer ID :::", req.cookies)
        const customer = await Customer.findOne({ _id: id });
        if (!customer) {
            console.log('User not found');
            res.send("Invalid Credentials");
            return;
        }
        //customer.placedOrder = [];
        const data = customer;
        placedOrder=[];
        const orders = await Order.find({customer: id}).populate("products");
        orders.forEach((element)=>{
            console.log(element);
            placedOrder.push(element);
            console.log("Order Found");
        });
        //data.firstName = "asd";
        data.orders = placedOrder;
        console.log(data);
        res.send(data);
    } catch(err){
        console.log(err);
        console.log(req.cookies);
        res.send('Your underwear is visible.');
        return;
    }
}

async function addAddress(req, res){
    console.log('It was me, DIO')
    try{
        const id = req.body.customerID;
        const customer = await Customer.findOne({ _id: id });
        if (!customer) {
            console.log('User not found');
            res.send("Invalid Credentials");
            return;
        }
        customer.address.push(req.body.address);
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

async function getCartInfo(req, res){
    try{
        //const id = req.body.customerID;
        console.log(req.body.customerID);
        const id = req.body.customerID;
        //console.log("Customer ID :::", req.cookies)
        const customer = await Customer.findOne({ _id: id }).populate("cart");
        if (!customer) {
            console.log('User not found');
            res.send("Invalid Credentials");
            return;
        }
        //customer.placedOrder = [];
        //const data = customer;
        // cartProducts=[];
        // customer.cart.forEach((element)=>{
        //     console.log(element);
        //     const product = await Product.find({customer: id}).populate("products");
        //     placedOrder.push(element);
        //     console.log("Order Found");
        // });
        //data.cart = placedOrder;
        console.log(customer);
        res.send(customer);
    } catch(err){
        console.log(err);
        console.log(req.cookies);
        res.send('Your underwear is visible.');
        return;
    }
}

module.exports = customerRouter;



/*
{
        "firstName": "Johny",
        "lastName": "Joestar",
        "email": "spin@example.com",
        "password": "secret",
        "address": {
            street: "123 Main St",
            city: "Anytown",
            state: "CA",
            zip: "12345",
        }
}
*/