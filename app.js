"use strict";
/*********** Carga Módulos necesarios *************/
const express = require("express");
const bodyParser = require("body-parser");

/***** LLamada Módulo Express, asignación a app  *****/
const app = express()
const api = require('./routes')

/********** Configuración Parseo - lectura JSON *************/ 
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use('/api', api)

module.exports = app