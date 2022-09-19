import User from "../models/User";
import bcrypt from 'bcrypt'
import * as Yup from 'yup'

class UserController {

    async registerUser(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            fullName: Yup.string().required(),
            userName: Yup.string().min(4).required(),
            password: Yup.string().min(6).required(),
            confirmPassword: Yup.string().required().oneOf([Yup.ref('password')])
        })

        if(!(await schema.isValid(req.body)))
            return res.status(400).json({message: 'Erro na validação do usuário!'})

        let {email, fullName, userName, password} = req.body

        const userExists = await User.findOne({email})
        const userNameExists = await User.findOne({userName})

        if(!userExists && !userNameExists) {
            password = await bcrypt.hash(password, 8)
            await User.create({email, fullName, userName, password})
        } else if(userExists)     
            return res.status(400).json({message: 'E-mail já cadastrado!'})
        else
            return res.status(400).json({message: 'Nome de Usuário indisponível!'})

        return res.json({message: 'Usuário cadastrado com sucesso!'})
    }

}

export default new UserController()