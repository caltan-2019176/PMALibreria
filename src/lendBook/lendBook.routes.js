import express from "express"

import { addLendBook, returnBook } from "./lendBook.controller.js"
import {validateJwt, isAdmin, isClient} from '../middlewares/validate-jwt.js'

const api = express.Router();

api.post('/addLendBook', [validateJwt], addLendBook)
api.put('/returnBook/:id', [validateJwt], returnBook)

export default api