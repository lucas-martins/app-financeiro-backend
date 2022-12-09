import {Router} from 'express'

import UserController from './controllers/UserController'
import SessionController from './controllers/SessionController'
import AccountController from './controllers/AccountController'
import TransactionController from './controllers/TransactionController'

const routes = new Router()

routes.post('/registerUser', UserController.registerUser)
routes.post('/login', SessionController.sessionLogin)

routes.get('/retrieveAccounts/:userId', AccountController.retrieveAccounts)
routes.post('/addAccount', AccountController.addAccount)
routes.put('/updateAccount', AccountController.updateAccount)
routes.delete('/removeAccount/:accountId', AccountController.removeAccount)

routes.get('/retrieveTransactions/:userId', TransactionController.retrieveTransactions)
routes.post('/addTransaction', TransactionController.addTransaction)

export default routes