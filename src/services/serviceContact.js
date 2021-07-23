const Contact = require('../models/contact')

function getAllContacts(){
    return Contact.find({})
}

async function getOneContact(id){
    const user = await Contact.exists({ _id: id })
    if (user){ 
        return Contact.findById(id)
    }
    else 
        throw new Error('El registro no existe')
}


async function deleteOneContact(id) {
    const user = await Contact.exists({ _id: id })
    if (user) 
        return Contact.findByIdAndRemove(id)
    else 
        throw new Error('El registro no existe')
}
    



function addContact(data){
    let contact = new Contact({
        date: new Date(),
        name: data.name,
        phone: data.phone,
        favourite: data.favourite || false,
    })

    return contact.save()
}

async function updateContact(id,data){
    const user = await Contact.exists({ _id: id })
    if (user) 
        return Contact.findByIdAndUpdate(id,data)
    else 
        throw new Error('El registro no existe')        
}


module.exports = {
    getAllContacts,addContact,getOneContact,deleteOneContact,updateContact
}