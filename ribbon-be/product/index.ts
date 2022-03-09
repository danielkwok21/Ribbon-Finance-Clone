import express, { Request, Response } from 'express'
import fs from 'fs'
import { stringify } from 'querystring';
import db from '../database/database.json'
import {
    GetProductActivitiesDTO, GetProductDetailDTO, GetProductsDTO, GetStrategySnapshotDTO,
    Deposit,
    Product, ProductActivity, ProductActivityAction, ProductInformation, StrategySnapshot
} from '../types'
const router = express.Router();

router.get('/', (req, res) => {
    try {

        const products = db.products.map(p => {
            const deposit = db.deposits.find(d => d.product_id === p.id)

            let apy_string = `${(p.apy * 100).toFixed(2)}%`
            apy_string = p.apy > 0 ?  `+${apy_string}`:`-${apy_string}`

            let prev_apy_string = `${(p.prev_apy * 100).toFixed(2)}%`
            prev_apy_string = p.prev_apy > 0 ?  `+${prev_apy_string}`:`-${prev_apy_string}`

            const contract_address_string = `${p.contract_address.substring(0, 4)}...${p.contract_address.substring(p.contract_address.length - 4, p.contract_address.length)}`

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
                contract_address: p.contract_address,
                apy: p.apy,
                prev_apy: p.prev_apy,
                current_deposit: deposit?.current_deposit || 0,
                max_deposit: deposit?.max_deposit || 0,
                apy_string,
                prev_apy_string,
                contract_address_string,
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

router.get('/:name', (req, res) => {
    const name = req.params.name

    try {
        const p = db.products.find(p => p.name === name)

        if (!p) {
            throw new Error(`Unable to find product of name ${name}`)
        }

        const deposit = db.deposits.find(d => d.product_id === p.id)

        let apy_string = `${(p.apy * 100).toFixed(2)}%`
        apy_string = p.apy > 0 ?  `+${apy_string}`:`-${apy_string}`

        let prev_apy_string = `${(p.prev_apy * 100).toFixed(2)}%`
        prev_apy_string = p.prev_apy > 0 ?  `+${prev_apy_string}`:`-${prev_apy_string}`

        const contract_address_string = `${p.contract_address.substring(0, 4)}...${p.contract_address.substring(p.contract_address.length - 4, p.contract_address.length)}`

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
            contract_address: p.contract_address,
            apy: p.apy,
            prev_apy: p.prev_apy,
            apy_string,
            prev_apy_string,
            contract_address_string,
            current_deposit: deposit?.current_deposit || 0,
            max_deposit: deposit?.max_deposit || 0,
        }

        const pi = db.productInformations.find(pi => pi.product_id === p.id)
        let productInformation: undefined | ProductInformation
        if (pi) {
            productInformation = {
                id: pi?.id,
                product_id: pi?.product_id,
                strategy: pi?.strategy,
                withdrawals: pi?.withdrawals,
                fee_structure: pi?.fee_structure,
                risk: pi?.risk,
                createdAt: pi?.createdAt,
                updatedAt: pi?.updatedAt,
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
            .map(pa => {
                const productActivity = <ProductActivity>pa

                /**Transform data */
                let yield_string = ``
                let yield_dollar_string = ``
                switch (productActivity.action) {
                    case ProductActivityAction.SOLD:

                        if (productActivity.yield && productActivity.yield > 0) {
                            yield_string = `+${productActivity.yield} ${p.symbol}`
                        } else if (productActivity.yield && productActivity.yield < 0) {
                            yield_string = `-${productActivity.yield} ${p.symbol}`
                        } else {
                            yield_string = `-${productActivity.yield} ${p.symbol}`
                        }

                        if (productActivity.yield && productActivity.yield > 0) {
                            yield_dollar_string = `+${productActivity.yield_dollar}`
                        } else if (productActivity.yield && productActivity.yield < 0) {
                            yield_dollar_string = `-${productActivity.yield_dollar}`
                        } else {
                            yield_dollar_string = `-${productActivity.yield_dollar}`
                        }
                        break
                    case ProductActivityAction.MINTED:
                        yield_string = '-'
                        yield_dollar_string = '-'
                        break
                    default:
                        break
                }


                const response: ProductActivity = {
                    ...productActivity,
                    yield_dollar_string,
                    yield_string,
                }

                return response
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


router.get('/strategysnapshot/:name', (req, res) => {
    const name: string = req.params.name

    try {
        const p = db.products.find(p => p.name === name)

        if (!p) {
            throw new Error(`Unable to find product of name ${name}`)
        }
        const id = p.id

        const s = db.strategy_snapshots
            .find((s: any) => {
                return s.product_id === id
            })

        if (!s) {
            throw new Error(`Unable to find strategy snapshot for product of name ${name}`)
        }

        const time_to_expiry_string = formationDurationToDHM(s.time_to_expiry)
        const performance_string = `${s.performance * 100}%`
        const current_price_dollar_string = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(s.current_price_dollar)
        const strike_price_dollar_string = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(s.strike_price_dollar)

        const ssdto: StrategySnapshot = {
            ...s,
            time_to_expiry_string,
            performance_string,
            current_price_dollar_string,
            strike_price_dollar_string,
        }

        const response: GetStrategySnapshotDTO = {
            status: true,
            strategySnapshot: ssdto
        }

        res.json(response)

    } catch (err) {
        const response: GetStrategySnapshotDTO = {
            status: false,
            message: (err as Error).message,
        }
        res.json(response)
    }
})

function formationDurationToDHM(ms: number): string {
    const MS_IN_MIN = 1000 * 60
    const MS_IN_HOUR = MS_IN_MIN * 60
    const MS_IN_DAY = MS_IN_HOUR * 24

    if (ms > 0) {

        let remainingDuration: number

        const days = (ms / MS_IN_DAY).toFixed(0)
        remainingDuration = ms % MS_IN_DAY

        const hours = (remainingDuration / MS_IN_HOUR).toFixed(0)
        remainingDuration = remainingDuration % MS_IN_HOUR

        const minutes = (remainingDuration / MS_IN_MIN).toFixed(0)

        const string = `${days}D ${hours}H ${minutes}M`

        return string
    } else {
        return `EXPIRED`
    }
}

export default router