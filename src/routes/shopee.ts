import { Router } from "express";
import shopee from "@/controller/shopee";

const router = Router()
router.route('/brands')
    .get(shopee.getBrands)

export default router
