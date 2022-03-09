/**
 * These are NOT ORM to db
 */

export type Product = {
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
    contract_address:string,
    apy: number,
    prev_apy: number,

    apy_string: string,
    prev_apy_string: string,
    current_deposit: number,
    max_deposit: number,
    contract_address_string: string,
}

export type GetProductsDTO = {
    status: boolean,
    products?: Product[],
    message?: string,
}

export type GetProductDetailDTO = {
    status: boolean,
    product?: Product,
    productInformation?: ProductInformation
    message?: string,
    deposit?: Deposit,
}


export type ProductInformation = {
    id: number,
    product_id: number,
    strategy: string,
    withdrawals: string,
    fee_structure: string,
    risk: string,
    createdAt: number,
    updatedAt: number,
}

export type ProductAnimation = {
    // TODO
}

export type StrategySnapshot = {
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

export type VaultPerformance = {
    id: number,
    product_id: number,
    cumulative_yield: number,
    projected_yield: number,
    previous_week_yield: number,
    createdAt: number,
    updatedAt: number,
}

export type PastVaultPerformance = {
    id: number,
    product_id: number,
    yield: number,
    createdAt: number,
    updatedAt: number,
}

export type Deposit = {
    id: number,
    product_id: number,
    current_deposit: number,
    max_deposit: number,
    createdAt: number,
    updatedAt: number,
}

export enum ProductActivityAction {
    SOLD = 'SOLD',
    MINTED = 'MINTED',
}

export type ProductActivity = {
    id: number,
    product_id: number,
    action: ProductActivityAction,
    contract: string,
    strike_price: number,
    quantity: number,
    yield?: number,
    yield_dollar?: number,

    yield_string: string,
    yield_dollar_string: string,
    createdAt: number,
    updatedAt: number,
}

export type GetProductActivitiesDTO = {
    status: boolean,
    productActivities?: ProductActivity[],
    message?: string,
}


export type GetStrategySnapshotDTO = {
    status: boolean,
    strategySnapshot?: StrategySnapshot,
    message?:string,
}