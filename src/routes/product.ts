import { Router } from "express";
import product from "@/controller/product";

const router = Router()
router.route('/')
    .get(product.getProductList)

export default router
