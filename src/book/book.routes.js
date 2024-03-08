'use strict'

import { Router } from "express"
import { addBook, deleteBook, getBook, updateBook } from './book.controller.js'
import {validateJwt, isAdmin} from '../middlewares/validate-jwt.js'

const api = Router()
api.post('/addBook',[validateJwt, isAdmin], addBook)
api.get('/getBook', [validateJwt], getBook)
api.put('/updateBook/:id',[validateJwt, isAdmin], updateBook )
api.delete('/deleteBook/:id',[validateJwt, isAdmin], deleteBook)

export default api