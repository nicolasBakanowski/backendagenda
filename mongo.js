const connectionStr = 'mongodb+srv://nbaka:nbaka145236@cluster0.aw8wi.mongodb.net/agenda?retryWrites=true&w=majority'

const mongoose = require('mongoose');
module.exports = mongoose.connect(connectionStr, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>console.log('Base de datos conectada'))
    .catch(()=>console.log('Error al conectarse a la base de datos'))


