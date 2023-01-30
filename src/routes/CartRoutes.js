import { Router } from 'express'
import { cart } from '../controller/cart.controller'

const cartRouter = Router()

cartRouter.post("/cart",cart)

export default cartRouter