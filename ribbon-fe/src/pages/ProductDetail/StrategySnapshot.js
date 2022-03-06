import React, { useEffect, useState } from 'react'
import { Chart, registerables } from 'chart.js'
import Typography from '@mui/material/Typography';
import { getCoinGeckoMarketChart, getStrategySnapshotByName } from '../../services/api'
import {
    GetProductDetailDTO,
    GetStrategySnapshotDTO
} from '../../dto'
import { useParams } from 'react-router-dom'


const GRADIENT_COLOR = '#122c2e'
const CONTRAST_COLOR = '#13a696'


export default function StrategySnapshot() {

    const params = useParams()
    const [strategySnapshot, setStrategySnapshot] = useState({})

    useEffect(async () => {

        const el = document.getElementById('vault-performance-chart-id')
        if (!el) return null

        getStrategySnapshotByName(params.name)
            .then(res => {
                if (res.status === true) {
                    setStrategySnapshot(res.strategySnapshot || {})
                }
                const ctx = el.getContext('2d')
                const GRADIENT = ctx.createLinearGradient(0, 0, 300, 300);
                GRADIENT.addColorStop(0, GRADIENT_COLOR);
                GRADIENT.addColorStop(1, GRADIENT_COLOR);


                let labels = []
                let datasetDataA = []
                let datasetDataB = []
                for (let i = 0; i < 5; i++) {
                    labels.push(res.strategySnapshot.current_price_dollar)
                    datasetDataA.push(res.strategySnapshot.current_price_dollar)
                    datasetDataB.push(res.strategySnapshot.strike_price_dollar)
                }

                Chart.register(...registerables)


                const data = {
                    labels: labels,
                    datasets: [
                        {
                            pointRadius: 0,
                            backgroundColor: GRADIENT,
                            borderColor: `#13a696`,
                            // fill: true,
                            data: datasetDataA
                        }, {
                            pointRadius: 0,
                            data: datasetDataB,
                            segment: {
                                borderColor: ctx => 'WHITE',
                                borderDash: ctx => [6, 6],
                                borderWidth: ctx => 1,
                            },
                            spanGaps: true
                        }
                    ]
                };


                const config = {
                    type: 'line',
                    data: data,
                    options: {
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
                        scales: {
                            xAxis: {
                                display: false,
                            }
                        }
                    }
                };
                const chart = new Chart(
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
            <canvas id="vault-performance-chart-id" width="100%" height="50px"
                style={{ maxWidth: window.innerWidth * 0.5 }}
            >

            </canvas>

            <div
                className='strategy-snapshot-container'
            >
                <div className='strategy-snapshot-details-container'>
                    <Typography style={{ fontSize: 12 }} color='text.secondary'>
                        Current SOL Price
                    </Typography>
                    <Typography style={{ fontSize: 15 }} color={CONTRAST_COLOR}>
                        {strategySnapshot.current_price_dollar_string}
                    </Typography>
                    <Typography style={{ fontSize: 12 }} color='text.secondary'>
                        This Week's Performance
                    </Typography>
                    <Typography style={{ fontSize: 15 }} color={CONTRAST_COLOR}>
                        {strategySnapshot.performance_string}
                    </Typography>
                </div>
                <div className='strategy-snapshot-details-container'>
                    <Typography style={{ fontSize: 12 }} color='text.secondary'>
                        Selected SOL Strike Price
                    </Typography>
                    <Typography style={{ fontSize: 15 }} color='text.primary'>
                        {strategySnapshot.strike_price_dollar_string}
                    </Typography>
                    <Typography style={{ fontSize: 12 }} color='text.secondary'>
                        Time to Expiry
                    </Typography>
                    <Typography style={{ fontSize: 15 }} color='text.primary'>
                        {strategySnapshot.time_to_expiry_string}
                    </Typography>
                </div>
            </div>
        </div>
    )
}
