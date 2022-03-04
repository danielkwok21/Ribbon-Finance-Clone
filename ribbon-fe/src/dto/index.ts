import {
    Product, ProductInformation, Deposit,ProductActivity
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
    products?:  ProductDTO[],
    message?: string,
}

export type GetProductDetailDTO = {
    status: boolean,
    product?: Product,
    productInformation?: ProductInformation
    message?: string,
    deposit?: Deposit,
}

export type GetProductActivity = {

    /**
     * 4/3/2022 daniel.kwok
     * Copied statically from Product
     * plus some massaged fields
     */

    id: number,
    product_id: number,
    action: string,
    contract: string,
    strike_price: number,
    quantity: number,
    yield?: number,
    yield_dollar?: number,
    createdAt: number,
    updatedAt: number,

    yield_string: string,
    yield_dollar_string:string,

}

export type GetProductActivitiesDTO = {
    status: boolean,
    productActivities?: GetProductActivity[],
    message?: string,
}