'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')
 
const UserSchema = new Schema({
    email: {type: String, unique: true, lowercase: true},
    displayName: String,
    avatar: String,
    password: { type: String, select: false},
    signupDate: { type: Date, default: Date.now()},
    lastLogin: Date
}) 

UserSchema.pre('save', function (next)  {   //Estaba con arrow function y daba fallo user.isModified.  // Encuentro solucion cambiando a function normal
    // let user = this;  //Daba fallo, encapsulabamos this. a esta funcion  
    if (!this.isModified("password")) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)

        bcrypt.hash(this.password, salt, null, (err, hash) => {
          if (err) return next(err);

          this.password = hash;
          next();
        });
    })
})

/* Comento este method xq encontré una mejora en foro del video. La testeo y borraré si funciona la nueva */
// UserSchema.methods.gravatar = function(){
//     if(!this.email) return 'https://gravatar.com/avatar/?s=2006d=retro'

//     const md5 = crypto.createHash('md5').update(this.email).digest('hex')
//     return `https://gravatar.com/avatar/${md5}?s=2006d=retro`;
// }
/* Nuevo Method. Si funciona dejo esta. */
UserSchema.methods.gravatar = function(size) {
  if (!size) {
    size = 200;
  }
  if (!this.email) return `https:/gravatar.com/avatar/?s${size}&d=retro`;
  const md5 = crypto
    .createHash("md5")
    .update(this.email)
    .digest("hex");
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

module.exports = mongoose.model('User', UserSchema)


/***** Encuentro esta funcionalidad...Implementar donde veamos mejor.******/
// en controllers/auth.js
// const signUp = (req, res) => {
//   const user = new User({
//     email: req.body.email,
//     displayName: req.body.displayName,
//     password: req.body.password
//   })

//   user.avatar = user.gravatar();

//   user.save(err => {
//     if (err) return res.status(500).send({ msg: `Error al crear usuario: ${err}` })
//     return res.status(200).send({ token: service.createToken(user) })
//   })
// }
