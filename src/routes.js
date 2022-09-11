import {Router} from 'express'

import UserController from './controllers/UserController'

const routes = new Router()

routes.post('/registerUser', UserController.registerUser)

export default routes