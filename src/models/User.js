import {Schema, model} from 'mongoose'

const UserSchema = new Schema({
    email: String,
    fullName: String,
    userName: String,
    password: String
})

export default model('User', UserSchema)