'use strict'
import { Schema, model } from "mongoose"

const bookSchema = Schema({
    title: {
        type: String,
        unique: true,
        required: true
    }, 
    descriptionBook: {
        type: String, 
        required: true
    }, 
    author: {
        type: String, 
        required: true
    },
    publishedYear: {
        type: String, 
        required: true
    }, 
    category: {
        type: Schema.Types.ObjectId,
        ref: "category",
        required: true
    }
}, {
    versionKey: false 
})

export default model('book', bookSchema)