import {
    Product, ProductInformation, Deposit, ProductActivity
} from '../types'

export type ProductDTO = {
    /**
     * 2/3/2022 daniel.kwok
     * Copied statically from Product
     * 
     */
    icon: string,
    name: string,
    short_description: string,
    long_description: string,
    projected_yield: number,
    id: number,
    symbol: string,
    createdAt: number,
    updatedAt: number,
    strategy: string[],
    background: string,
    current_deposit: number,
    max_deposit: number,
}

export type GetProductsDTO = {
    status: boolean,
    products?: ProductDTO[],
    message?: string,
}

export type GetProductDetailDTO = {
    status: boolean,
    product?: Product,
    productInformation?: ProductInformation
    message?: string,
    deposit?: Deposit,
}

export enum ProductActivityAction {
    SOLD = 'SOLD',
    MINTED = 'MINTED',
}

export type GetProductActivity = {

    /**
     * 4/3/2022 daniel.kwok
     * Copied statically from Product
     * plus some massaged fields
     */

    id: number,
    product_id: number,
    action: ProductActivityAction,
    contract: string,
    strike_price: number,
    quantity: number,
    yield?: number,
    yield_dollar?: number,
    createdAt: number,
    updatedAt: number,

    yield_string: string,
    yield_dollar_string: string,

}

export type GetProductActivitiesDTO = {
    status: boolean,
    productActivities?: GetProductActivity[],
    message?: string,
}

export type MarketChartDTO = {
    prices: {
        price: number,
        date: number,
    }[]
}


export type GetStrategySnapshot = {

    /**
     * 6/3/2022 daniel.kwok
     * Copied statically from StrategySnapshot
     * plus some massaged fields
     */
    id: number,
    product_id: number,
    range: string,
    current_price_dollar: number,
    strike_price_dollar: number,
    performance: number,
    time_to_expiry: number,
    createdAt: number,
    updatedAt: number,

    time_to_expiry_string: string,
    performance_string: string,
    current_price_dollar_string: string,
    strike_price_dollar_string: string,

}

export type GetStrategySnapshotDTO = {
    status: boolean,
    strategySnapshot?: GetStrategySnapshot,
    message?: string,
}