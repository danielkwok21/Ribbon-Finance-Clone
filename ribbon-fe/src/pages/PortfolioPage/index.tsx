import React, { useEffect, useState } from 'react'
import { Product, ProductInformation } from '../../types'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, LinearProgress, Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom'
import { getProducts } from '../../services/api';

export default function Dashboard() {
    const [products, setProducts] = useState<Product[] | []>([])
    const navigate = useNavigate()

    useEffect(() => {
        getProducts()
            .then(res => {
                if (res.status !== true) throw res.message
                setProducts(res.products || [])
            })
            .catch((err: string) => {
                console.error(err)
            })
    }, [])

    return (
        <div className='page' style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', }}>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: 500,
                }}
            >

                <div
                    style={{
                        marginTop: 50,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        width: '100%'
                    }}
                >
                    <Typography variant='h6' color="text.primary" gutterBottom>
                        PORTFOLIO SUMMARY
                    </Typography>
                    <Card
                        raised={true}
                        sx={{ width: '100%', maxWidth: 1000 }}
                        style={{
                            backgroundColor: 'black'
                        }}
                    >
                        <CardContent style={{ position: 'relative' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-end'
                                }}
                            >
                                <div>
                                    <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                                        Balances
                                    </Typography>
                                    <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                        _ _ _
                                    </Typography>

                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        gap: 15
                                    }}
                                >
                                    <a
                                        onClick={() => {
                                            const searchParams = new URLSearchParams(window.location.search)
                                            searchParams.set('range', '1w')

                                            navigate(`?${searchParams.toString()}`)
                                        }}
                                    >
                                        <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                                            1W
                                        </Typography>
                                    </a>
                                    <a
                                        onClick={() => {
                                            const searchParams = new URLSearchParams(window.location.search)
                                            searchParams.set('range', '1m')

                                            navigate(`?${searchParams.toString()}`)
                                        }} >
                                        <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                                            1M
                                        </Typography>
                                    </a>
                                    <a
                                        onClick={() => {
                                            const searchParams = new URLSearchParams(window.location.search)
                                            searchParams.set('range', 'all')

                                            navigate(`?${searchParams.toString()}`)
                                        }}>
                                        <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                                            ALL
                                        </Typography>
                                    </a>
                                </div>
                            </div>
                            <br />
                            <div
                                style={{
                                    height: 200,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <a >
                                    <Typography variant="subtitle1" id='connect-wallet-link'>
                                        Connect your wallet
                                    </Typography>
                                </a>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    width: '100%',
                                    justifyContent: 'space-around',
                                }}
                            >
                                <div>
                                    <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                        Yield Earned
                                    </Typography>
                                    <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                        _ _ _
                                    </Typography>
                                </div>
                                <div>
                                    <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                        ROI
                                    </Typography>
                                    <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                        _ _ _
                                    </Typography>
                                </div>
                                <div>
                                    <Typography sx={{ fontSize: 12 }} color="crimson">
                                        $RBN Balance
                                    </Typography>
                                    <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                        _ _ _
                                    </Typography>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                </div>

                <div
                    style={{
                        marginTop: 50,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        width: '100%'
                    }}
                >
                    <Typography variant='h6' color="text.primary" gutterBottom>
                        POSITIONS
                    </Typography>

                    <Typography sx={{ fontSize: 12 }} color="text.secondary">
                        _ _ _
                    </Typography>

                </div>

                <div
                    style={{
                        marginTop: 50,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        width: '100%',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            flexWrap: 'wrap'
                        }}
                    >

                        <Typography variant='h6' color="text.primary" gutterBottom>
                            TRANSACTION HISTORY
                        </Typography>

                        <div>

                            <FormControl style={{ width: '50%', maxWidth: 160, }} size='small'>
                                <InputLabel id="strategy-label">ALL ACTIVITY</InputLabel>
                                <Select
                                    style={{ maxWidth: 200 }}
                                    labelId="strategy-label"
                                    value=''
                                    onChange={e => {
                                        const strategy: string = typeof e.target.value === 'string' ? e.target.value : ''
                                        const searchParams = new URLSearchParams(window.location.search)
                                        searchParams.set('strategy', strategy)

                                        navigate(`?${searchParams.toString()}`)
                                    }}
                                >
                                    <MenuItem value={'COVERED-CALL'}>COVERED-CALL</MenuItem>
                                    <MenuItem value={'PUT-SELLING'}>PUT-SELLING</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl style={{ width: '50%', maxWidth: 160, marginLeft: 10 }} size='small'>
                                <InputLabel id="deposit-asset-label">LATEST FIRST</InputLabel>
                                <Select
                                    style={{ maxWidth: 200 }}
                                    labelId="deposit-asset-label"
                                    value=''
                                    onChange={e => {
                                        const strategy: string = typeof e.target.value === 'string' ? e.target.value : ''
                                        const searchParams = new URLSearchParams(window.location.search)
                                        searchParams.set('deposit_asset', strategy)

                                        navigate(`?${searchParams.toString()}`)
                                    }}
                                >
                                    <MenuItem value={'AAVE'}>AAVE</MenuItem>
                                    <MenuItem value={'ETH'}>ETH</MenuItem>
                                    <MenuItem value={'USDC'}>USDC</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <Typography sx={{ fontSize: 12 }} color="text.secondary">
                        _ _ _
                    </Typography>
                </div>
            </div>
        </div >
    )
}
