import Typography from '@mui/material/Typography';
import { Chart, registerables } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCoinGeckoMarketChart, getProductDetailByName } from '../../services/api';

const GRADIENT_COLOR = '#122c2e'
const CONTRAST_COLOR = '#13a696'

export default function VaultPerformance(props) {
    const params = useParams()
    const [productDetail, setProductDetail] = useState({})
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        if (props.productDetail) {
            setProductDetail(props.productDetail)
        } else {
            setIsLoading(true)
            getProductDetailByName(params.name || '')
                .then(res => {
                    setProductDetail(res)
                })
                .finally(() => setIsLoading(false))
        }
    }, [props.productDetail])


    useEffect(async () => {
        if (!productDetail) return null

        const el = document.getElementById('vault-chart-id')
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
                const chart= new Chart(
                    el,
                    config
                );
            })

        return () => {
            el?.remove()
        }
    }, [productDetail])

    return (
        <div style={{ margin: 10 }}>
            <canvas id="vault-chart-id" width="100%" height="50px"></canvas>

            <div
                className='strategy-snapshot-container'
            >
                <div className='strategy-snapshot-details-container'>
                    <Typography style={{ fontSize: 12 }} color='text.secondary'>
                        Projected Yield
                    </Typography>
                    <Typography style={{ fontSize: 15 }} color={CONTRAST_COLOR}>
                        {productDetail?.product?.apy_string}
                    </Typography>
                </div>
                <div className='strategy-snapshot-details-container'>
                    <Typography style={{ fontSize: 12 }} color='text.secondary'>
                        Previous Week Performance
                    </Typography>
                    <Typography style={{ fontSize: 15 }} color={CONTRAST_COLOR}>
                    {productDetail?.product?.prev_apy_string}
                    </Typography>
                </div>
            </div>
        </div>
    )
}
