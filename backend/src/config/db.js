const mongoose = require('mongoose')

module.exports = ()=>{
   console.log('db conected');
   return mongoose.connect('mongodb+srv://Avdhesh:Avdhesh@cluster0.kt5em.mongodb.net/cointab')
}