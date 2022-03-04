import express, { Request, Response } from 'express'
import fs from 'fs'
import { stringify } from 'querystring';
import db from '../database/database.json'
import {
    Deposit,
    Product, ProductActivity, ProductInformation
} from '../types'
import { GetProductActivitiesDTO, GetProductActivity, GetProductDetailDTO, GetProductsDTO } from './dto';
const router = express.Router();

router.get('/', (req, res) => {
    try {

        const products = db.products.map(p => {
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

            const deposit = db.deposits.find(d => d.product_id === product.id)

            return {
                ...product,
                current_deposit: deposit?.current_deposit || 0,
                max_deposit: deposit?.max_deposit || 0,
            }
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

router.get('/:name', (req, res) => {
    const name = req.params.name

    try {
        const { products, productInformations, deposits } = db
        const p = products.find(p => p.name === name)

        if (!p) {
            throw new Error(`Unable to find product of name ${name}`)
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

        const pi = productInformations.find(pi => pi.product_id === p.id)
        let productInformation: undefined | ProductInformation
        if (pi) {
            productInformation = {
                id: pi?.id,
                product_id: pi?.product_id,
                withdrawals: pi?.withdrawals,
                fee_structure: pi?.fee_structure,
                risk: pi?.risk,
                createdAt: pi?.createdAt,
                updatedAt: pi?.updatedAt,
            }
        }

        const d = deposits.find(d => d.product_id === p.id)
        let deposit: undefined | Deposit
        if (d) {
            deposit = {
                id: d?.id,
                product_id: d?.product_id,
                current_deposit: d?.current_deposit,
                max_deposit: d?.max_deposit,
                createdAt: d?.createdAt,
                updatedAt: d?.updatedAt,
            }
        }

        const response: GetProductDetailDTO = {
            status: true,
            product,
            productInformation,
            deposit,
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

router.get('/activities/:name', (req, res) => {
    const name = req.params.name

    try {

        const p = db.products.find(p => p.name === name)

        if (!p) {
            throw new Error(`Unable to find product of name ${name}`)
        }
        const id = p.id

        const productActivities = db.product_activities
            .filter(pa => {
                return pa.product_id === id
            })
            .map((pa: ProductActivity) => {

                /**Transform data */
                let yield_string = ``
                let yield_dollar_string = ``
                switch (pa.action) {
                    case 'SOLD CONTRACTS':

                        if (pa.yield && pa.yield > 0) {
                            yield_string = `+${pa.yield} ${p.symbol}`
                        } else if (pa.yield && pa.yield < 0) {
                            yield_string = `-${pa.yield} ${p.symbol}`
                        } else {
                            yield_string = `-${pa.yield} ${p.symbol}`
                        }

                        if (pa.yield && pa.yield > 0) {
                            yield_dollar_string = `+${pa.yield_dollar}`
                        } else if (pa.yield && pa.yield < 0) {
                            yield_dollar_string = `-${pa.yield_dollar}`
                        } else {
                            yield_dollar_string = `-${pa.yield_dollar}`
                        }
                        break
                    case 'MINTED CONTRACTS':
                        yield_string = '-'
                        yield_dollar_string = '-'
                        break
                    default:
                        break
                }


                const productActivity: GetProductActivity = {
                    ...pa,
                    yield_dollar_string,
                    yield_string,
                }

                return productActivity
            })

        const response: GetProductActivitiesDTO = {
            status: true,
            productActivities,
        }

        res.json(response)

    } catch (err) {
        const response: GetProductActivitiesDTO = {
            status: false,
            message: (err as Error).message,
        }
        res.json(response)
    }
});

export default router