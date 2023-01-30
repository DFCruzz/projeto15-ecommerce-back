import { ObjectId } from "mongodb";
import { productsCollection, sliderCollection } from "../config/database.js";

export async function getProducts(req, res) {

    try {
        const productsList = await productsCollection
            .find({})
            .toArray()

        res.send(productsList)
    } catch (error) {
        console.log(error)
        res.status(500).send("Deu algo errado no servidor")
    }
}

export async function getProductType(req, res) {
    const type = req.params.type

    try {
        const typeList = await productsCollection
            .find({ type: type })
            .toArray()

        res.send(typeList)
    } catch (error) {
        console.log(error)
        res.status(500).send("Deu algo errado no servidor")
    }
}

export async function getSingleProduct(req, res) {
    const id = req.params.id
    try {
        const productInfo = await productsCollection
            .find({ _id: ObjectId(id) })
            .toArray()

        res.send(productInfo)
    } catch (error) {
        console.log(error)
        res.status(500).send("Deu algo errado no servidor")
    }
}

export async function getSlider(req, res) {

    try {
        const productsList = await sliderCollection
            .find({})
            .toArray()

        res.send(productsList)
    } catch (error) {
        console.log(error)
        res.status(500).send("Deu algo errado no servidor")
    }
}