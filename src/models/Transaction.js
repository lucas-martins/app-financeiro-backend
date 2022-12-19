import {Schema, model} from 'mongoose'

const TransactionSchema = new Schema({
    userId: String,
    accountId: String,
    accountName: String,
    date: String,
    description: String,
    category: String,
    type: Number,
    value: Number,
})

export default model('Transaction', TransactionSchema)