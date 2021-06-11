require('dotenv').config()
require('./mongo')

//se importa express 
const express = require('express')
const app = express()
const cors = require('cors')

//importamos a persona de Persona.js
const Persona = require('./models/Persona') 

app.use(cors())
app.use(express.json())

/*
const generateID=()=>{
    const personasIds=personas.map(n=>n.id)
    const maxID= personasIds.length ? Math.max(... personasIds):0
    const newId=maxID +1
    return newId
}
*/
//usar express
app.get('/', (request, response) => {
    response.send('<h1>Bienvenido a el ApiRest</h1>')
})

app.get('/personas', (request, response) => {
    Persona.find({}).then(personas => {
        response.json(personas)
    })
})

app.get('/personas/:id', (request, response, next) => {
    const { id } = request.params

    Persona.findById(id).then(persona => {
        if (persona) {
            return response.json(persona)
        } else {
            response.status(404).end()
        }
    }).catch(err => {
        next(err)
    })
})


app.put('/personas/:id', (request, response, next) => {
    const { id } = request.params
    const persona = request.body

    const newPersonaUpdate = {
        nombre: persona.nombre,
        apellido: persona.apellido,
        nacionalidad: persona.nacionalidad,
        fecha_contrato: persona.fecha_contrato,
        sexo: persona.sexo
    }

    Persona.findByIdAndUpdate(id, newPersonaUpdate,{new:true})
    .then(result=>{
        response.json(result)
    })
})

app.delete('/personas/:id', (request, response) => {
    const { id } = request.params
    Persona.findOneAndRemove(id).then(result => {
        response.status(204).end()
    }).catch(error => next(error))
    response.status(204).end()
})

app.post('/personas', (request, response) => {
    const persona = request.body

    if (!persona) {
        return response.status(400).json({
            error: ('persona.nombre is missing')
        })
    }
    const newPersona = new Persona({
        nombre: persona.nombre,
        apellido: persona.apellido,
        nacionalidad: persona.nacionalidad,
        fecha_contrato: persona.fecha_contrato,
        sexo: persona.sexo
    })
    //guarda bd
    newPersona.save().then(savedPersona => {
        response.json(savedPersona)
    })
})


app.use((request, response, next)=>{
    response.status(404).end()})
//mildeware par acachar los errores
app.use((error, request, response, next) => {
    console.error(error)
    console.log(error.name)
    if (error.name == 'CastError') {
        response.status(400).send({ error: 'La id usada es incorecta' })
    } else {
        response.status(500).end()
    }
})

//reconfigurar puerto por heroku
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Server running on port ${PORT}')
})
