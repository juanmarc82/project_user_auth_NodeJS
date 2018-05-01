'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')
 


/********** Conexión BASE DATOS *************/ 
mongoose.connect(config.db, (err, res)=>{
    if(err){
        console.log(`Error al conectar con BD: ${err}`);
    } 
    console.log(`Conexión a BD  establecida`);
    
    app.listen(config.port, () => {
        console.log(`API REST corriendo en http://localhost: ${config.port}`);
    })
})
