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
        res.status(400).json(error);
    }
}

getById = async(req, res) => {
    try {
        const { cid } = req.params;
        const response = await this.manager.getById(cid);
        if (!response) throw new Error("Producto no encontrado");
        return res.json(response);
    } catch (error) {
        res.status(400).json(error);
    }
}

create = async(req, res) => {
    try {
        const response = await this.manager.create(req.body);
        res.json(response);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

addProdToCart = async(cid, pid) =>{
    try {
        const {cid} = req.params;
        const {pid} = req.params;
    } catch (error) {
        
    }
}

update = async(req, res) => {
    try {
        const { cid } = req.params;
        const response = await this.manager.update(cid, req.body);
        if (!response) throw new Error("Producto no encontrado");
        return res.json(response);
    } catch (error) {
        res.status(400).json(error);
    }
}

delete = async(req, res) => {
    try {
        const { cid } = req.params;
        const response = await this.manager.delete(cid);
        if (!response) throw new Error("Producto no encontrado");
        return res.json(response);
    } catch (error) {
        res.status(400).json(error);
    }
}
}

export const cartControllers = new CartControllers(cartManager);