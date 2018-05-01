'use strict'

const express = require('express')
/****** Módulo Controlador *******/
const productCtrl = require('../controllers/products')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()


/******* Controladores productos  *********/
api.get('/product', productCtrl.getProducts)
api.get("/product/:productId", productCtrl.getProduct);
api.post("/product", productCtrl.saveProduct);
api.put("/product/:productId", productCtrl.updateProduct);
api.delete("/product/:productId", productCtrl.deleteProduct);
/*** Controladores login/logup usuarios ***/
api.post("/signup", userCtrl.signUp);
api.post("/signIn", userCtrl.signIn);
/*** Controlador acceso privado ***/
api.get('/private', auth, (req, res) => {
    res.status(200).send({ message: 'Tienes acceso' })
})



module.exports = api;