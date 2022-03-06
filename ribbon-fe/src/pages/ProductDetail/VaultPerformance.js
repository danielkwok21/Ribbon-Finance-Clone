import React, { useEffect } from 'react'
import { Chart, registerables } from 'chart.js'
import { getCoinGeckoMarketChart } from '../../services/api'

export default function VaultPerformance() {


    useEffect(async () => {

        const el = document.getElementById('myChart')
        if (!el) return null

        getCoinGeckoMarketChart('solana', 'usd', 365, 'daily')
            .then(res => {
                var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                const msInWeek = 1000 * 60 * 60 * 24 * 7

                const latestData = res.prices[res.prices.length - 1]
                latestData.readableDate = new Date(latestData.date).toLocaleDateString('en-US', options)

                const interestedData = [latestData]
                const numberOfWeeks = 5
                for (let i = 0; i < numberOfWeeks; i++) {
                    const currData = interestedData[i]
                    const lastWeekDate = currData.date - msInWeek

                    const prevData = res.prices.find(p => {
                        return p.date < currData.date && p.date > lastWeekDate
                    })

                    prevData.readableDate = new Date(prevData.date).toLocaleDateString('en-US', options)

                    interestedData.push(prevData)
                }

                interestedData.sort((a, b) => a.date - b.date)

                const labels = interestedData.map(d => d.readableDate)
                const datasetData = interestedData.map(d => d.price)

                Chart.register(...registerables)


                const ctx = el.getContext('2d')

                const gradient = ctx.createLinearGradient(0, 0, 300, 300);
                gradient.addColorStop(0, '#122c2e');
                gradient.addColorStop(1, '#121A1E');


                const data = {
                    labels: labels,
                    datasets: [{
                        backgroundColor: gradient,
                        borderColor: `#13a696`,
                        fill: true,
                        data: datasetData
                    }]
                };

                const config = {
                    type: 'line',
                    data: data,
                    options: {
                        plugins: {
                            legend: {
                                display: false,
                            },
                            // tooltip: {
                            //     callbacks: {
                            //         footer: (tooltipItem) => {
                            //         }
                            //     }
                            // }
                        },
                        scales: {
                            y: {
                                min: Math.min(...datasetData),
                                max: Math.max(...datasetData),
                            },
                            xAxis: {
                                display: false,
                            }
                        }
                    }
                };
                const myChart = new Chart(
                    el,
                    config
                );
            })

        return () => {
            el?.remove()
        }
    }, [])

    return (
        <div style={{ margin: 10 }}>
            <canvas id="myChart" width="100%" height="50px"
                style={{ maxWidth: window.innerWidth * 0.5 }}
            ></canvas>

        </div>
    )
}
