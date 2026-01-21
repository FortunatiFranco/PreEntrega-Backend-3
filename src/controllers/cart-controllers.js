import { cartManager } from "../managers/cartManager.js"


class CartControllers {
    constructor(manager) {
        this.manager = manager;
}

getAll = async(req, res)=> {
    try {
        const response = await this.manager.getAll();
        res.json(response);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

getById = async(req, res) => {
    try {
        const { cid } = req.params;
        const response = await this.manager.getById(cid);
        if (!response) {res.status(404).json({ error: "Carrito no encontrado" })};
        return res.json(response);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

create = async(req, res) => {
    try {
        const response = await this.manager.createCart();
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

addProduct = async(req, res) =>{
    try {
        const { cid, pid} = req.params;
        const response = await this.manager.addProduct(cid, pid)
        res.json(response)
    } catch (error) {
        res.status(400).json(error.message);
    }
}

update = async(req, res) => {
    try {
        const { cid } = req.params;
        const response = await this.manager.clearCart(cid);
        if (!response) { return res.status(404).json({ error: "Carrito no encontrado" })};
        return res.json(response);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

delete = async(req, res) => {
    try {
        const { cid } = req.params;
        const response = await this.manager.deleteCart(cid);
        if (!response) { return res.status(404).json({ error: "Carrito no encontrado" })};
        return res.json(`Carrito ${cid} eliminado`);
    } catch (error) {
        res.status(400).json(error.message);
    }
}
}

export const cartControllers = new CartControllers(cartManager);