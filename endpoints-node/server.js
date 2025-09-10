import express from 'express'
import pool from './db.js'


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
})

// PUTo
app.put('/api/user/:id', (req,res) =>{
    const {id} = req.params
    const {name, email} = req.body
    res.json({
        menssage:`Este es el usuario ${id}`,
        data:{name, email}
    })
})

app.delete('/api/user/:id', (req, res) => {
    const {id} = req.params
    res.json({menssage:`Usuario con ID ${id} fue eliminado`})
})


// endpoints
// GET
app.get('/api/game', async(req,res)=>{
    try {
        // todo el codigo que queramos que se ejecute
        const [rows] = await pool.query("SELECT * FROM games")
        res.json(rows)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:`Error en la consulta`})
    }
})


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
}) 
