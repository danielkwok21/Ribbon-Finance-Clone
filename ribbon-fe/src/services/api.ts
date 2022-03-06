import {
    GetProductDetailDTO,
    GetProductsDTO,
    GetProductActivitiesDTO,
    MarketChartDTO,
    GetStrategySnapshotDTO
} from '../dto'

const root = `http://localhost:5000`
const coingeckoRoot = `https://api.coingecko.com/api/v3`

export const getProducts = (): Promise<GetProductsDTO> => {
    return fetch(`${root}/product`)
        .then(res => res.json())
}

export const getProductDetailByName = (name: string): Promise<GetProductDetailDTO> => {
    return fetch(`${root}/product/${name}`)
        .then(res => res.json())
}

export const getProductActivitiesByName = (name: string): Promise<GetProductActivitiesDTO> => {
    return fetch(`${root}/product/activities/${name}`)
        .then(res => res.json())
}


export const getStrategySnapshotByName = (name: string): Promise<GetStrategySnapshotDTO> => {
    return fetch(`${root}/product/strategysnapshot/${name}`)
        .then(res => res.json())
}

export const getCoinGeckoMarketChart = (coinName: string, currency: string = "usd", days: number = 365, interval: string = "daily") => {
    return fetch(`${coingeckoRoot}/coins/${coinName}/market_chart?vs_currency=${currency}&days=${days}&interval=${interval}`, {
        "credentials": "omit",
        "headers": {
            "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:97.0) Gecko/20100101 Firefox/97.0",
            "Accept": "application/json",
            "Accept-Language": "en-US,en;q=0.5",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-site"
        },
        "referrer": "https://www.coingecko.com/",
        "method": "GET",
        "mode": "cors"
    })
        .then(res => res.json())
        .then(res => {
            /**transform into usable format */
            const result: MarketChartDTO = {
                prices: res.prices.map((p: number[]) => {
                    return {
                        date: p[0],
                        price: p[1],
                    }
                })
            }

            return result
        })
}