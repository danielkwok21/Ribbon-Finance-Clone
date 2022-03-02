import express, { Request, Response } from 'express'
import fs from 'fs'
import { stringify } from 'querystring';
import db from '../database/database.json'
import {
    Product, ProductInformation
} from '../types'
import { GetProductDetailDTO, GetProductsDTO } from './dto';
const router = express.Router();

router.get('/', (req, res) => {
    try {
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
                updatedAt: p.updatedAt,
                strategy: p.strategy,
                background: p.background,
            }
            return product
        })

        const response: GetProductsDTO = {
            status: true,
            products: products
        }

        res.json(response)

    } catch (err) {
        const response: GetProductsDTO = {
            status: false,
            message: (err as Error).message,
        }
        res.json(response)
    }
});

router.get('/:id', (req, res) => {
    const id = Number(req.params.id)

    try {
        const { products, productInformations } = db
        const p = products.find(p => p.id === id)

        if (!p) {
            throw new Error(`Unable to find product of id ${id}`)
        }

        const product: Product = {
            icon: p.icon,
            name: p.name,
            short_description: p.short_description,
            long_description: p.long_description,
            projected_yield: p.projected_yield,
            id: p.id,
            symbol: p.symbol,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
            strategy: p.strategy,
            background: p.background,
        }

        const pi = productInformations.find(pi => pi.product_id === id)
        let productInformation: undefined | ProductInformation
        if (pi) {
            productInformation = {
                id: pi?.id,
                product_id: pi?.product_id,
                content: pi?.content,
                createdAt: pi?.createdAt,
                updatedAt: pi?.updatedAt,
            }
        }

        const response: GetProductDetailDTO = {
            status: true,
            product: product,
            productInformation: productInformation
        }
        res.json(response)

    } catch (err) {
        const response: GetProductDetailDTO = {
            status: false,
            message: (err as Error).message,
        }
        res.json(response)
    }
});

export default router