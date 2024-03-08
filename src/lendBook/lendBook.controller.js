'use strict'

import Book from '../book/book.model.js'
import LendBook from '../lendBook/lendBook.model.js'

export const addLendBook = async (req, res) => {
    try {
        let data = req.body
        data.user = req.user._id
        let book = await Book.findOne({_id: data.book})
        if(!book) return res.status(404).send({message: 'Book not found'})
        data.date = new Date()
        
        let lend = await LendBook.countDocuments({ user: data.user, lend: 'true' })
        if (lend >= 2) {
            return res.status(400).send({ message: 'This user has 2 books.' })
        }
        
        let loanBook = new LendBook(data)
        await loanBook.save()
        return res.send({message: `Registered successfully lendBook`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error registering Book', err: err})
    }
}

export const returnBook = async (req, res) => {
    try {
        const id = req.params.id
        const lend = await LendBook.findOne({_id: id})
        if (!lend) return res.status(404).send({ message: 'Lend not found' })
        if (lend.lend === 'false') return res.status(400).send({ message: 'Book already returned' })
        lend.lend = 'false'
       // lend.date = new Date()
        await lend.save()
        return res.send({ message: 'Book returned successfully' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error returning book', error: error })
    }
}
