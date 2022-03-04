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
}

export type ProductInformation = {
    id: number,
    product_id: number,
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
    current_price: number,
    strike_price: number,
    performance: number,
    time_to_expiry: number,
    createdAt: number,
    updatedAt: number,
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

export type ProductActivity = {
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
}