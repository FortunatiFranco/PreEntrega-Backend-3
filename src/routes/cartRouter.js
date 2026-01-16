import { Router } from "express";
import { cartControllers } from "../controllers/cart-controllers.js";

const router = Router()

router.get('/:cid', cartControllers.getAll);
router.post('/', cartControllers.create);
router.put('/', cartControllers.update);

export default router;