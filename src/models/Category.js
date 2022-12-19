import {Schema, model} from 'mongoose'

const CategorySchema = new Schema({
    userId: String,
    categoryName: String,
})

export default model('Category', CategorySchema)