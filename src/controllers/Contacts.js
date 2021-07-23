const express = require('express')
const routeContacts = express.Router()
const {getLista,setLista} = require('../data')
const service = require('../services/serviceContact')
const mError = require('../middleware/error')


routeContacts.get('/contacts',(req,res)=>{
        service.getAllContacts()
            .then((list)=> res.json(list))
            .catch(()=>
                res.status(500).json('No se pudo recuperar la lista')
            )
})

routeContacts.get('/contacts/:id',(req,res,next)=>{
    // El controlador no deberia tener la logica aqui
    // se requiere una capa logica o servicio
    let id = req.params.id;
    service.getOneContact(id)
     .then((list) => res.json(list))
     .catch((err) => next(err))

})

routeContacts.delete('/contacts/:id',(req,res,next)=>{
    let id = req.params.id
    service.deleteOneContact(id)
    .then((list) => res.json(list))
    .catch((err)=> next(err))


})


routeContacts.post('/contacts',(req,res,next)=>{
    // No es bueno cargar de logica las rutas
    let data = req.body
    console.log(data)

    // Tambien podriamos agregar un ejemplo de como usarlo
    if (!data.name || !data.phone){
        res.status(400).json({error:'Bad request: name, phone is required'})
        return false;
    }

    service.addContact(data)
        .then((objguardado)=>{
            console.log('Guardado')
            res.status(201).json(objguardado);
        })
        .catch((error)=>next(error))
    
    
})
routeContacts.patch('/contacts/:id',(req,res,next)=>{
    let id = req.params.id;
    let data = req.body
    console.log(data.name)
    console.log("#################")
    service.updateContact(id,data)
    .then((list) => res.json(list))
    .catch((err)=> next(err))


})


routeContacts.use(mError)

module.exports = routeContacts




