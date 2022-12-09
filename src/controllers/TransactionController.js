import Transaction from '../models/Transaction'
import User from "../models/User"
import Account from "../models/Account"

import * as Yup from 'yup'

class TransactionController {

    async retrieveTransactions(req, res) {
        const schema = Yup.object().shape({
            userId: Yup.string().required()
        })

        const {userId} = req.params

        const body = {userId}

        if(!(await schema.isValid(body)))
            return res.status(400).json({message: 'Usuário não foi informado!'})
        
        const userExists = await User.findById({_id: userId})

        if(userExists) {
            const userTransactions = await Transaction.find({userId})
            return res.json(userTransactions)
        }
        else return res.status(400).json({message: 'Usuário não existe!'})
    }

    async addTransaction(req, res) {
        const schema = Yup.object().shape({
            userId: Yup.string().required(),
            accountId: Yup.string().required(),
            date: Yup.string().required(),
            description: Yup.string().required(),
            category: Yup.string().required(),
            type: Yup.number().required(),
            value: Yup.number().required(),
        })

        if(!(await schema.isValid(req.body)))
            return res.status(400).json({message: 'Erro na validação da conta!'})
        
        const {userId, accountId, date, description, category, type, value} = req.body

        const userExists = await User.findById({_id: userId})

        if(!userExists) return res.status(400).json({message: 'Usuário não existe!'})

        const userAccounts = await Account.find({userId})

        const userAccountsIds = userAccounts.map(userAccount => String(userAccount._id))

        if(userAccountsIds.includes(accountId)) {
            const currentAccount = userAccounts.filter(account => String(account._id) === accountId)
            const {accountName, accountBalance} = currentAccount[0]
            let newBalance

            if(type < 0) newBalance = accountBalance - value
            else newBalance = accountBalance + value
      
            await Transaction.create({userId, accountId, date, description, category, type, value})

            await Account.updateOne({_id: accountId}, {
                userId,
                accountName,
                accountBalance: newBalance
            })
            return res.json({message: 'Transação incluída com sucesso'})
        } else 
            return res.status(400).json({message: 'Esta conta não pertence a este usuário! Impossível fazer uma transação.'})
    }
}

export default new TransactionController()