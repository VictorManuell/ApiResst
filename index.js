//se importa express 
const express=require('express')
const cors=require('cors')

const app=express()

const logger=(request,response,next)=>{
    console.log(request.method)
console.log(request.path)
console.log(request.body)
console.log('-----')
next()
}

app.use(cors())
app.use(express.json())

app.use(logger)


 let personas=[
     {
        "id": 3,
        "nombre": "Juan Carlos",
        "apellido": "Gomez Perez",
        "nacionalidad":"mexicano",
        "fecha_contrato":"11/15/2018",
        "sexo":"hombre"
    },
    
        {
            "id":2,
            "nombre":"Pedro",
            "apellido": "castillo aguilar",
            "nacionalidad":"mexicano",
            "fecha_contrato":"07/07/2016",
            "sexo":"hombre"
        },
        {
            "id":1,
            "nombre":"adriana",
            "apellido": "Rivera Anaya",
            "nacionalidad":"mexicano",
            "fecha_contrato":"06/011/2019",
            "sexo":"mujer"
        }
 ]

/*
const app=http.createServer((request,response)=>{
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify(personas))
});*/

//usar express
app.get('/',(request, response)=>{
    response.send('<h1>Bienvenido a el ApiRest</h1>')
})

app.get('/personas',(request, response)=>{
    response.json(personas)
})

app.get('/personas/:id',(request, response)=>{
    const id =Number(request.params.id)
    const persona=personas.find(persona => persona.id == id)
    
    if(persona){
        response.json(persona)  
    }else{
      response.status(404).end()
    }     
})

app.delete('/personas/:id', (request,response)=>{
    const id =Number(request.params.id)
    personas=personas.filter(persona=>persona.id !=id)
    response.status(204).end()
})

app.post('/personas', (request,response)=>{
    const persona =request.body
    if(!persona || !persona.nombre){
        return response.status(400).json({
            error:('persona.nombre is missing')
        })
    }   
   //crear id en automatico
   const ides=personas.map(persona=>persona.id)
   const idMax= Math.max(... ides) 
   //se colocan las variables que almacenan en la tabla
   const newPersona={
   id:idMax + 1,  
   nombre:persona.nombre,
   apellido:persona.apellido,
   nacionalidad:persona.nacionalidad,
 //nacionalidad:typeof persona.important !='undefined'? persona.nacionalidad:false,
   fecha_contrato:persona.fecha_contrato,
   sexo:persona.sexo
}
//añade a la lista
    //personas={...personas, newPersona}
    //o
    personas=personas.concat(newPersona)

    response.status(201).json(newPersona)
})

//problemas de rutas
app.use((request,response)=>{
    console.log(request.path)
    response.status(404).json({
        Error:"Ruta no valida"
    })
})

const PORT = 3000
app.listen(PORT, ()=>{
   console.log('Server running on port ${PORT}') 
})
