import {
    Product, ProductInformation
} from '../types'

export type GetProductsSuccessDTO = {
    status: boolean,
    products: Product[]
}

export type GetProductsFailDTO = {
    status: boolean,
    message: string,
}

export type GetProductDetailSuccessDTO = {
    status: boolean,
    product: Product,
    productInformation?: ProductInformation
}

export type GetProductDetailFailDTO = {
    status: boolean,
    message: string
}