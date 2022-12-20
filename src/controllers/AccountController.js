import Account from "../models/Account"
import User from "../models/User"
import Transaction from "../models/Transaction"

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
        const accounts = await Account.find({userId})
        
        const accountNames = accounts.map(account => account.accountName)

        if(userExists && !accountNames.includes(accountName)) {
            await Account.create({userId, accountName, accountBalance})
            return res.json({message: 'Conta adicionada com sucesso'})
        } else if (accountNames.includes(accountName)) {
            return res.status(400).json({message: 'Esta conta já existe!'})
        } else { 
            return res.status(400).json({message: 'Usuário não existe!'})
        }

    }

    async updateAccount(req, res) {
        const schema = Yup.object().shape({
            userId: Yup.string().required(),
            accountId: Yup.string().required(),
            accountName: Yup.string().required(),
            accountBalance: Yup.number().required(),
        })

        if(!(await schema.isValid(req.body)))
            return res.status(400).json({message: 'Erro na validação da conta!'})

        const {userId, accountId, accountName, accountBalance} = req.body

        const userExists = await User.findById({_id: userId})

        if(!userExists) return res.status(400).json({message: 'Usuário não existe!'})

        const userAccounts = await Account.find({userId})

        const userAccountsIds = userAccounts.map(userAccount => String(userAccount._id))

        if(userAccountsIds.includes(accountId)) {
            await Account.updateOne({_id: accountId}, {
                userId,
                accountName,
                accountBalance
            })
    
            return res.json({message: 'Conta alterada com sucesso!'})
        } else 
            return res.status(400).json({message: 'Esta conta não pertence a este usuário! Impossível alterar.'})
    }

    async removeAccount(req, res) {
        const schema = Yup.object().shape({
            accountId: Yup.string().required(),
            userId: Yup.string().required()
        })

        const {accountId} = req.params
        const {userId} = req.body

        const body = {accountId, userId}

        if(!(await schema.isValid(body)))
            return res.status(400).json({message: 'Conta não foi informada!'})
        
        const accountExists = await Account.findById({_id: accountId})

        if(accountExists) {
            if(String(accountExists.userId) === userId) {
                await Account.findByIdAndDelete({_id: accountId})
                await Transaction.deleteMany({userId, accountId})
                return res.json({message: 'Conta removida com sucesso!'})
            } else return res.status(401).json({message: 'Conta não pertence a este usuário! Impossível remover.'})
        }
        else return res.status(400).json({message: 'Conta não existe!'})
        
    }
}

export default new AccountController()