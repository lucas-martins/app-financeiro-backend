import User from "../models/User";
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

        const {email, fullName, userName, password} = req.body

        const userExists = await User.findOne({email})
        let newUser

        if(!userExists)
            newUser = await User.create({email, fullName, userName, password})
        else     
            return res.status(400).json({message: 'Usuário já existe!'})

        return res.json(newUser)
    }

}

export default new UserController()