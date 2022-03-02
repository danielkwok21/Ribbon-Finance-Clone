import express from 'express'
import fs from 'fs'
import db from '../database/database.json'
import {
    Product
} from '../types'
import { GetProductsDTO } from './dto';
const router = express.Router();

router.get('/', (req, res) => {
    const { products: dbProducts } = db
    let products = dbProducts.map(p => {
        const product: Product = {
            icon: p.icon,
            name: p.name,
            short_description: p.short_description,
            long_description: p.long_description,
            projected_yield: p.projected_yield,
            id: p.id,
            symbol: p.symbol,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt
        }
        return product
    })

    const response: GetProductsDTO = {
        products: products
    }

    res.json(response)
});

export default router