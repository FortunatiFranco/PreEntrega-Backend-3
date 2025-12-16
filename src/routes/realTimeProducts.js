import { Router } from "express";

const router = Router();

router.get('/', (req,res)=>{
    try {
        res.render("realTimeProducts");
    } catch (error) {
        res.status(500).send(error.message);
    }
})

export default router;