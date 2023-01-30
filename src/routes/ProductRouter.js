import { Router } from "express";
import { getProducts, getProductType, getSingleProduct, getSlider } from "../controller/products.controller.js";


const ProductRouter = Router()

ProductRouter.get("/products", getProducts)
ProductRouter.get("/products/:type?", getProductType)
ProductRouter.get("/slider", getSlider)
ProductRouter.get("/product/:id?", getSingleProduct)

export default ProductRouter