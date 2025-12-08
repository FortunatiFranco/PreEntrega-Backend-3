import express from 'express'
import { productManager } from './managers/productManager.js'
import { cartManager } from './managers/cartManager.js'




const server = express()
const port = 8080

server.use(express.json())

server.get('/', (req, res) => {
    res.send('Hello World!')
})

server.get('/api/products', async(req, res) => {
    try {    
    const products = await productManager.getAll()
    res.json(products)
}catch(error) {
        res.status(500).send(error.message)
    }})

server.get('/api/products/:id', async(req, res) => {
    try {
        const {id} = req.params
        const products = await productManager.getById(id)
        res.json(products)
}catch(error) {
    res.status(500).send(error.message)
}})

server.post('/api/products', async(req, res) => {
    try {
        const newProduct = await productManager.create(req.body);
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(500).send(error.message)
    }})

server.put('/api/products/:id', async(req,res)=>{
    try{
    const {id} = req.params;
    const product = await productManager.update(req.body, id);
    res.json(product);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

server.delete('/api/products/:id', async(req,res) =>{
    try {
        const {id}= req.params;
        const prodDelete = await productManager.delete(id)
        res.json(prodDelete);
    } catch (error) {
        res.status(500).send(error.message)
    }})

//-----------------------------------------------------------------//

server.get('/api/carts/:cid', async(req,res)=>{
    try {
        const {cid} = req.params
        const cartsId = await cartManager.cartById(cid);
        res.json(cartsId)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

server.post('/api/carts', async(req,res)=>{
    try {
        const carts = await cartManager.create()
        res.json(carts)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


server.post('/api/carts/:cid/product/:pid', async(req,res)=>{
    try {
        const {cid} = req.params;
        const {pid} = req.params;
        await cartManager.addProdToCart(cid,pid)
        res.json('producto agregado al carrito')
    } catch (error) {
        res.status(500).send(error.message)
    }
})

server.listen(port, () => {
    console.log(`escuchando en puerto ${port}`)
})
