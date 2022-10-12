import Account from "../models/Account"
import User from "../models/User"

import * as Yup from 'yup'

class AccountController {

    async retrieveAccounts(req, res) {
        const schema = Yup.object().shape({
            userId: Yup.string().required()
        })

        const {userId} = req.params

        const body = {userId}

        if(!(await schema.isValid(body)))
            return res.status(400).json({message: 'Usuário não foi informado!'})
        
        const userExists = await User.findById({_id: userId})

        if(userExists) {
            const userAccounts = await Account.find({userId})
            return res.json(userAccounts)
        }
        else return res.status(400).json({message: 'Usuário não existe!'})
    }

    async addAccount(req, res) {
        const schema = Yup.object().shape({
            userId: Yup.string().required(),
            accountName: Yup.string().required(),
            accountBalance: Yup.number().required(),
        })

        if(!(await schema.isValid(req.body)))
            return res.status(400).json({message: 'Erro na validação da conta!'})

        const {userId, accountName, accountBalance} = req.body

        const userExists = await User.findById({_id: userId})

        if(userExists) {
            await Account.create({userId, accountName, accountBalance})
            return res.json({message: 'Conta adicionada com sucesso'})
        } else {
            return res.status(400).json({message: 'Usuário não existe!'})
        }

    }
}

export default new AccountController()