import {Schema, model} from 'mongoose'

const AccountSchema = new Schema({
    userId: String,
    accountName: String,
    accountBalance: Number,
})

export default model('Account', AccountSchema)