const mongoose=require('mongoose')
const password=require('./password.js')  

//const connectionString = process.env.MONGO_DB_URI
const connectionString='mongodb+srv://victor:'+
'1234@cluster0.ifqc8.mongodb.net/'+
'personas?retryWrites=true&w=majority'

//conexion a mongo db
mongoose.connect(connectionString, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
})
.then(()=>{
    console.log('Database connected')
}).catch(err=>{
    console.error(err)
})
/*
Persona.find({}).then(result =>{
    console.log(result)
    mongoose.connection.close()
})

const persona=new Persona({
    nombre:'Victor',
    apellido:'Manuel',
    nacionalidad:'Mexicano',
    fecha_contrato:'10/06/2020',
    sexo:'Masculino'
})

persona.save()
.then(result =>{
console.log(result)
mongoose.connection.close()
})
.catch(err =>{
console.error(err)
})
*/