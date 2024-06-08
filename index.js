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

