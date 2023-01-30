

// colocar item no carrinho
async function cart(req,res){
    const id = req.params.id
    const addIten = await db.collection("product").find({ _id: ObjectId(id) })

    try {
       await db.collection("cart").insertOne(addIten)
       res.send(addIten)
    } catch (error) {
        console.log(error)
        res.status(500).send("Deu algo errado no servidor")
    }
}

// adicionar mais 1 do mesmo produto
async function addExtraIten (req,res){
    const id = req.params.id
    const addIten = await db.collection("product").find({ _id: ObjectId(id) })

    try {
        await db.collection("cart").updateOne(addIten,{ $inc: { "quantity": 1 } })
    } catch (error) {
        console.log(error)
        res.status(500).send("Deu algo errado no servidor")
    }
}

//remover 1 quantidade do mesmo produto 
async function removeExtraIten (req,res){
    const id = req.params.id
            const addIten = await db.collection("product").find({ _id: ObjectId(id) })
    try {
        await db.collection("cart").updateOne(addIten,{ $inc: { "quantity": -1 } })
    } catch (error) {
        console.log(error)
        res.status(500).send("Deu algo errado no servidor")
    }
}

// remover produto do carrinho
async function deletIten (req, res){
    const id = req.params.id
    const find = await db.collection("cart").find({ _id: ObjectId(id) })
    try {
        await db.collection("cart").deleteOne(find)
    } catch (error) {
        console.log(error)
        res.status(500).send("Deu algo errado no servidor")
    }
}
