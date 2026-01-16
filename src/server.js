import 'dotenv/config';
import express from 'express';
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";
import realTimeProducts from "./routes/realTimeProducts.js"
import handlebars from "express-handlebars";
import { Server } from 'socket.io';
import { productManager } from './managers/productManager.js';
import { initMongoDB} from './config/connection.js'



const server = express()
const port = 8080

server.use(express.json())
server.use(express.urlencoded({ extended: true}))
server.use(express.static(`src/public`))
server.engine('handlebars', handlebars.engine());
server.set('view engine', 'handlebars');
server.set('views', `${process.cwd()}/views`)

server.use('/api/products', productRouter);
server.use('/api/carts', cartRouter);
server.use('/api/realproducts', realTimeProducts)

initMongoDB()
.then(()=> console.log("base de datos conectada"))
.catch((error) => console.log(error));

const httpServer = server.listen(port, () => {
    console.log(`escuchando en puerto ${port}`)
})

const socketServer = new Server(httpServer);

const productsAll = await productManager.getAll();

socketServer.on('connection', (socket)=>{
    console.log(`Nuevo cliente conectado: ${socket.id}`);

socket.on('new-product', (obj)=>{
    productsAll.push(obj);
    socketServer.emit("array-products", productsAll)
})
})

