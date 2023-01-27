import { Router } from 'express'
import { signIn,signUp } from '../controller/auth.controller.js'
import { signInValidation, signUpValidation} from '../middleware/auth.middleware.js'

const authRouter = Router()

authRouter.post("sign-up",signUpValidation,signUp)
authRouter.post("sign-in",signInValidation,signIn)

export default authRouter