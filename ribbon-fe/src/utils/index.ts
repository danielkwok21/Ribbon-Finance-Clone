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

export function getDurationInDaysAgo(startTime: number): string {
    const secondsInDay = 60*60*24
    const durationInSeconds = (Date.now()/1000) - startTime

    if(durationInSeconds < 0){
        return ''
    }else if (durationInSeconds < secondsInDay){
        return 'Less than a day ago'
    }else {
        const days = (durationInSeconds / secondsInDay).toFixed(0)

        return `${days} days ago`
    }
}

export function getIsMobile():boolean {
    const minInnerWidth = 400 // 8.3.2022 daniel.kwok from index.css @media
    return window.innerWidth < minInnerWidth

}