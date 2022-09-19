import {Router} from 'express'

import UserController from './controllers/UserController'
import SessionController from './controllers/SessionController'

const routes = new Router()

routes.post('/registerUser', UserController.registerUser)
routes.post('/login', SessionController.sessionLogin)

export default routes