import {
    Product, ProductInformation
} from '../types'

export type GetProductsDTO = {
    status: boolean,
    products?: Product[],
    message?: string,
}

export type GetProductDetailDTO = {
    status: boolean,
    product?: Product,
    productInformation?: ProductInformation
    message?: string
}