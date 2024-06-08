const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path') //para funcionamiento del requerimiento2


// 1_LEVANTAR SERVIDOR
app.listen(3000,console.log("¡Servidor encendido!"))

// 2_DEVOLVER UNA PAGINA WEB COMO RESPUESTA A UNA CONSULTA GET
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname,'index.html'));
  });

//3_OFRECER DIFERENTES RUTAS CON DIFERENTES METODOS HTTP QUE PERMITAN CRUD DE DATOS ALOJADOS EN EL ARCHIVO JSON LOCAL
//POST/canciones: recibe los datos de una cancion y agrega al repertorio
app.post('/canciones', (req,res) => {
    try {
        const nuevaCancion = req.body
        const data = fs.readFileSync('repertorio.json', 'utf-8')
        const canciones = JSON.parse(data)
        canciones.push(nuevaCancion)
        fs.writeFileSync('repertorio.json', JSON.stringify(canciones, null, 2))
        res.status(201).json(nuevaCancion)
    } catch (error) {
        console.error('Error al agregar una nueva cancion:', error.message)
        res.status(500).send('Error interno del servidor')
    }
})

//GET/canciones: devuelve JESON con las canciones registradas en el repertorio
app.get('/canciones', (req, res) =>{
    try {
        const data = fs.readFileSync('repertorio.json', 'utf-8')
        const canciones = JSON.parse(data)
        res.json(canciones)
    } catch (error) {
        console.error ('Error al obtener las canciones:', error.message)
        res.status(500).send('Error interno del servidor')
    }
})
