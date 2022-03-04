import {
    Product, ProductInformation, Deposit,
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