'use strict'

import Book from './book.model.js'
import {cheackUpdateBook} from '../utils/validator.js'

export const addBook = async (req, res) =>{
    try {
        let data = req.body
        console.log(data)
        let book = new Book(data)
        await book.save()
        return res.send({message: `Registered successfully,${book.title} was registered`})  
    } catch (error) {
        console.error(error)
        if(error.keyValue.title ) return res.status(400).send({message: `Title ${error.keyValue.title} is alredy taken ` })
        return res.status(500).send({message: 'Error registering Book', error: error})
    }
}

export const getBook = async(req, res)=>{
    try {
        let book = await Book.find()
        if(!book) return res.status(404).send({message: 'book not found'})
        return res.send({ book})
        
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error listing book', error: error })
    }
}

export const updateBook = async(req, res)=>{
    try {
        let {id} = req.params
        let data = req.body
        let update = await cheackUpdateBook(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be update or missing data'})
        let updateBook = await Book.findOneAndUpdate(
            { _id: id },
            data,
            {new: true} 
        )
        if (!updateBook) return res.status(401).send({ message: 'Book not found' })
        return res.send({ message: 'Book update', updateBook })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error updating' })
        
    }
}

export const deleteBook = async (req, res)=>{
    try {
        let{id} = req.params
        
        let deleteBook =  await Book.findOneAndDelete({_id: id})

        if(!deleteBook) return res.status(404).send({message: 'Book not found and not deleted'})
        return res.send({message: `Book ${deleteBook.title} deleted successfully`})
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error deleting Category', error: error })
        
    }
}