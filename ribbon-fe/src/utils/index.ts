export function formatNumber(value: number): string {
    let newValue: string = ''
    if(value >= 1000000){
        newValue = (value / 1000000).toString() + 'M'
    }else if (value >= 10000) {
        /**only convert to k if it's > 10k */
        newValue = (value / 1000).toString() + 'k'
    }else{
        newValue = value.toString()
    }

    return newValue
}