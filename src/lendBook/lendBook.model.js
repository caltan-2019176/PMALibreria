'use strict'
import { Schema, model } from 'mongoose'

const lendBookSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'book',
        required: true
    },
    lend: {
        type: String,
        enum: ['true', 'false'],
        default: 'true',
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, {
    versionKey: false
})

export default model('lendBook', lendBookSchema)