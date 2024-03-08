'use strict'

import express from 'express'
import { config } from "dotenv"
import userRoutes from '../src/user/user.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import bookRoutes from '../src/book/book.routes.js'
import lendBook from '../src/lendBook/lendBook.routes.js'

//imports de las rutas 


//Configuración 
const app = express()
config()
const port = process.env.PORT || 3056


//Configuración del servidor
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Routes 
//declaracion de rutas
app.use('/user', userRoutes)
app.use('/category', categoryRoutes)
app.use('/book', bookRoutes)
app.use('/lendBook', lendBook)


//levantar el servidor 
export const initServer = ()=>{
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}