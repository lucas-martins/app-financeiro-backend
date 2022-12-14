import User from "../models/User";
import * as Yup from 'yup'
import jwt from "jsonwebtoken";
import {checkPassword} from '../utils/CheckPassword'

class SessionController {

    async sessionLogin(req, res) {
        const {email, password} = req.body

        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
        })

        if(!(await schema.isValid(req.body)))
            return res.status(400).json({message: 'Erro na validação do usuário!'})

        const user = await User.findOne({where: {email}})

        if(!user) return res.status(401).json({error: 'Usuário não existe!'})

        if(!(await checkPassword(password, user.password)))
            return res.status(401).json({error: 'Senha incorreta!'})
        
        const {_id, fullName} = user

        return res.json({
            user: {
                id: _id,
                fullName,
                email
            },
            token: jwt.sign({id: _id}, process.env.AUTH_SECRET, {
                expiresIn: process.env.AUTH_EXPIRES_IN
            })
        })
    }

}

export default new SessionController()