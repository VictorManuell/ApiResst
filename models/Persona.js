const  { Schema, model } = require('mongoose')

//construir el esquema
const personaShema=new Schema({
    nombre:String,
    apellido:String,
    nacionalidad:String,
    fecha_contrato:String,
    sexo:String
})

personaShema.set('toJSON', {
transform:(document, returnedObject)=>{
    returnedObject.id=returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
}
})
//*/
//crear el modelo en base del esquema
const Persona=model('Persona', personaShema)

module.exports=Persona
