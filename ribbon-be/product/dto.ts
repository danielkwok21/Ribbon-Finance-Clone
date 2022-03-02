import {
    Product
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
}

export type GetProductDetailFailDTO = {
    status: boolean,
    message: string
}