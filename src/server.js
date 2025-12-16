import express from 'express';
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";
import realTimeProducts from "./routes/realTimeProducts.js"
import handlebars from "express-handlebars";
import { Server } from 'socket.io';
import { productManager } from './managers/productManager.js';


const server = express()
const port = 8080

server.use(express.json())
server.engine('handlebars', handlebars.engine());
server.set('view engine', 'handlebars');
server.set('views', `${process.cwd()}/views`)

server.use('/api/products', productRouter);
server.use('/api/carts', cartRouter);
server.use('/api/realproducts', realTimeProducts)


const httpServer = server.listen(port, () => {
    console.log(`escuchando en puerto ${port}`)
})

const socketServer = new Server(httpServer);

const productsAll = productManager.getAll();

socketServer.on('connection', (socket)=>{
    console.log(`Nuevo cliente conectado: ${socket.id}`);

socket.on('new-product', (obj)=>{
    productsAll.push(obj);
    socketServer.emit("array-products", productsAll)
})
})

