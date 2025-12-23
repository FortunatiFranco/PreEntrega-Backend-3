import { Router } from "express";
import { productManager } from "../managers/productManager.js";

const router = Router();

router.get('/', async(req,res)=>{
    try {
        const products = await productManager.getAll()
        res.render("home", {products});
    } catch (error) {
        res.status(500).send(error.message);
    }
})


router.get('/realtimeproducts', (req,res)=>{
    try {
        res.render("realTimeProducts");
    } catch (error) {
        res.status(500).send(error.message);
    }
})

export default router;