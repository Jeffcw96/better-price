import { Express } from "express";
import product from './product'
import shopee from './shopee'

export default function routes(app:Express){
    app.use('/api/products',product)
    app.use('/api/shopee',shopee)
}