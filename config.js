/*** asignación puerto entrada
 *  llamada a base de datos  ***/

module.exports = {
  port: process.env.PORT || 3001,
  db: process.env.MONGODB || 'mongodb://localhost:27017/shop',
  SECRET_TOKEN: 'miclavedetokens'
};