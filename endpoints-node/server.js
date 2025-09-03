import express from 'express'

const app = express() // Son variables que nunca van a cambiar
const PORT = 5000

app.use(express.json()) // Para que procese el json que le estamos mandando

app.get('/', (req, res) => {
    res.send('Este es un endpoint hecho con express') // Lo que hicimos fue hacer
    // un get de ruta / que manda una respuesta (res.send)
})
// endpoint con parametro
app.get('/api/user/:id', (req, res) => {
    // destructuracion
    console.log(req.params);
    const {id} = req.params
    res.send({message: `El usuario con id ${id} es Pepito`})
    
}
)
// query params
app.get('/api/search', (req,res) => {
    const {name, lastname} = req.query;
    res.json({
        firstName:name, lastname,
    })
    // http://localhost:PORT/api/search?name=nombre&lastname=apellido
})


app.post('/api/user', (req,res) => {
    const {name, email} = req.body
    res.json({mensagge: 'Usuario Creado', data: {name, email}})
    return 'Ok'
})


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
}) 
