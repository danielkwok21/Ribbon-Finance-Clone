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
}

export type ProductInformation = {
    id: number,
    product_id: number,
    content: string, // markdown
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

