import React, { useEffect } from 'react'
import { Chart, registerables } from 'chart.js'
import { getCoinGeckoMarketChart } from '../../services/api'

export default function VaultPerformance() {


    useEffect(async () => {

        const el = document.getElementById('myChart')
        if (!el) return null

        getCoinGeckoMarketChart('solana', 'usd', 5, 'weekly')
            .then(res => {
                Chart.register(...registerables)

                const labels = [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                ];

                const ctx = el.getContext('2d')

                const gradient = ctx.createLinearGradient(0, 0, 300, 300);
                gradient.addColorStop(0, '#122c2e');
                gradient.addColorStop(1, '#121A1E');

                const data = {
                    labels: labels,
                    datasets: [{
                        label: 'My First dataset',
                        backgroundColor: gradient,
                        borderColor: `#13a696`,
                        fill: true,
                        data: res.prices
                    }]
                };

                const config = {
                    type: 'line',
                    data: data,
                    options: {
                        plugins: {

                            legend: {
                                display: false,
                            }
                        },
                        scales: {
                            y: {
                                min: Math.min(...res.prices),
                                max: Math.max(...res.prices),
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
        <div>
            <canvas id="myChart" width="100%" height="100px"></canvas>

        </div>
    )
}
