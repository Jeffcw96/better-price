import { Express } from "express";
import product from './product'

export default function routes(app:Express){
    app.use('/api/products',product)
}