const express = require('express');
const User = require('./database/userSchema');
const Product = require('./database/productSchema');
const Jwt = require('jsonwebtoken');
const cors = require('cors');
require ('./database/config');


// hmko ye key secret rkhni hoti hai.
// yha apni security dalni hoti hai.
const jwtKey = ''


// setup App with express
const app = express();
const port = 6001;


// body/request data ko get krne ke liye
app.use(express.json());


// handling network problem at backend in the app
app.use(cors());



// register user in database
app.post('/register', async (req, res) => {
    if (req.body.password && req.body.email && req.body.name) {
        let user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        delete result.password;

        // ye token lugane ka trika hai
        // expriesIn hnm km hi use krte hai
        // Jwt.sign({result}, jwtKey, {expiresIn:"3h"}, (err, token) =>{

        Jwt.sign({result}, jwtKey, {expiresIn:"3h"}, (err, token) =>{
            // second parameter me ap onlu auth bhej skte hai koi prblm nhi hogi
            if (err) {
                res.send({result:"No User Found"});
            }
            res.send({result, auth:token});
        })
    }
    else{
        res.send("Please Fill your full information.");
    }
});



// login user in database
app.post('/login', async (req,res) => {
    if (req.body.password && req.body.email) {
        // .select password ko htane ka trika hai 
        let user =await User.findOne(req.body).select('-password');
        if (user) {
            // jub apko user mil gya fir jwt token lugana hai
            Jwt.sign({user}, jwtKey, (err, token) =>{
                // second parameter me ap onlu auth bhej skte hai koi prblm nhi hogi
                if (err) {
                    res.send({result:"No User Found"});
                }
                res.send({user, auth:token});
            })
        }
        else {
            res.send({result:"Information is not correct."});
        }
    }
    else {
        res.send({result:"Information is not correct."});
    }  
});


app.get('/user/:id', verifyToken, async (req, res) => {
    let user = await User.findOne({_id:req.params.id})
    if (user) {
        res.send(user);
    }else {
        res.send({user: "No Record Found"});
    }
})

app.put("/user/:id", verifyToken, async (req, res)=>{
    let user = await User.updateOne(
        {_id: req.params.id},
        {$set:req.body}
    )
    res.send(user);
  });






// add product in database
app.post('/addproduct', verifyToken, async (req, res) => {
    let product = new Product(req.body);
    let result =await product.save();
    res.send(result);
    
});


// get product data from database
app.get('/products', verifyToken, async (req, res) => {
    let products = await Product.find();
    if (products.length>0) {
      res.send(products);
    }else {
        res.send( {result:"No resuult found" });
   }
});


// delete product
app.delete('/delete/:id', verifyToken, async (req, res) => {
    let product = await Product.deleteOne({_id:req.params.id});
    res.send(product);
})


// this is the api for filling the update form for the prdoduct which is given by user
app.get('/product/:id', verifyToken, async (req, res) => {
    let result = await Product.findOne({_id:req.params.id});
    if (result) {
        res.send(result);
    }else {
        res.send({result: "No Record Found"});
    }
});





//update product in database
app.put('/update/:id', verifyToken, async (req, res) => {
    let updateProduct =await Product.updateOne(
        {_id: req.params.id},
        {$set:req.body}
    )
    res.send(updateProduct);
});



// search product from data base
app.get('/search/:key', verifyToken, async (req, res) => {
    let result = await Product.find(
        {
            "$or":[
                { "name": {$regex:req.params.key} },
                { "price": {$regex:req.params.key} },
                { "company": {$regex:req.params.key} },
                { "category": {$regex:req.params.key} }
            ]
        }
    );
    res.send(result);
});



// diff brtween a simple funtion and middleware 
// midware have three paramitters 
function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                res.status(401).send({ message: "Unauthorized" });
            }else {
                next();
            }
        });
    }
    else {
        res.status(403).send({result: "Please add token with headers"});
    }
};





app.listen(port);