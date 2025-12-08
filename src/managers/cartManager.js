import fs, { existsSync, readFile } from 'fs'
import { v4 as uuidv4 } from "uuid";
import { productManager } from './productManager.js';

class CartManager {
    constructor(path){
        this.path = path;
    }

    cartAll = async()=>{
        try {
            if(fs.existsSync(this.path)){
                const cart = await fs.promises.readFile(this.path, 'utf-8')
                if(!cart.trim())
                return [];
            const json = JSON.parse(cart);
            return Array.isArray(json) ? json : [json];
            }
            return [];
        } catch (error) {
            throw new Error(error)
        }
    }

    cartById = async(cid)=>{
        try {
            const cart = await this.cartAll();
            const cartId = cart.find((c)=> c.id === cid);
            if(!cartId) throw new Error(error)
                return cartId;
        } catch (error) {
            throw new Error(error)
        }
    }

    create = async() =>{
        try {
            const newCart = {
                id: uuidv4(),
                products: [],
            };
            const getCarts = await this.cartAll()
            getCarts.push(newCart)
            await fs.promises.writeFile(this.path, JSON.stringify(getCarts, null , 2))
        } catch (error) {
            throw new Error(error)
        }
    }

    addProdToCart = async(cid,pid)=>{
        try {
            const product = await productManager.getById(pid);
            if(!product) throw new Error('producto no encontrado');
            const carts = await this.cartAll()
            const cart = carts.find((c)=> c.id === cid);
            if(!cart) throw new Error('carrito no encontrado');
            const existingProd = cart.products.find((p)=> p.product === pid);
            if(existingProd){
                existingProd.quantity++;
            }else{
                cart.products.push({
                    product: pid,
                    quantity: 1
                })
            }
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
            return cart
        } catch (error) {
            throw new Error(error)
        }
    }
}

export const cartManager = new CartManager("../data/carts.json")