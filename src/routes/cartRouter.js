import { Router } from "express";
import { cartControllers } from "../controllers/cart-controllers.js";

const router = Router()

router.get('/', cartControllers.getAll);
router.get('/:cid', cartControllers.getById);
router.post('/', cartControllers.create);
router.post('/:cid/products/:pid', cartControllers.addProduct)
router.put('/:cid', cartControllers.update);
router.delete('/:cid', cartControllers.delete)

export default router;