import {Schema, model} from 'mongoose'

const SessionSchema = new Schema({
    email: String,
    password: String
})

export default model('Session', SessionSchema)