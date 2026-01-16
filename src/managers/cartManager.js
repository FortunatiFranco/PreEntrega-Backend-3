import { CartModel } from "../models/cart-model.js";

class CartManager {
    constructor(model){
        this.model = model;
    }

    cartAll = async()=>{
        try {
            return await this.model.find()
        } catch (error) {
            throw new Error(error)
        }
    }

    cartById = async(cid)=>{
        try {
            const cart = await this.model.findById(cid)
            if(!cart) return null;
            return cart;
        } catch (error) {
            throw new Error(error)
        }
    }

    createCart = async() =>{
        try {
            return await this.model.create({products: []})
        } catch (error) {
            throw new Error(error)
        }
    }

    addProdToCart = async(cid,pid)=>{
        try {
            const product = await this.model.findById(pid);
            if(!product) throw new Error('producto no encontrado');
            const carts = await this.model.find()
            const cart = carts.findById(cid);
            if(!cart) throw new Error('carrito no encontrado');
            const existingProd = cart.products.findById(pid);
            if(existingProd){
                existingProd.quantity++;
            }else{
                cart.products.push({
                    product: pid,
                    quantity: 1
                });
            }
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(error)
        }
    }
    clearProds = async(cid, products) =>{
        try {
            return await this.model.findByIdandUpdate(
                cid,
                {products: []},
                {new: true}
            );
        } catch (error) {
            throw new Error(error)
        }
    }

    deleteCart = async(cid) =>{
        try {
            return await this.model.findByIdAndDelete(cid)
        } catch (error) {
            throw new Error(error)
        }
    }
}

export default CartManager;