import React, { useEffect, useState } from 'react'
import { GetProductActivitiesDTO, GetProductActivity, GetProductDetailDTO, GetProductsDTO, ProductDTO } from '../../dto'
import Typography from '@mui/material/Typography';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Avatar, LinearProgress, Select, Tab, Tabs, Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useNavigate, useParams } from 'react-router-dom'
import { formatNumber, getDurationInDaysAgo } from '../../utils'
import { DataGrid, GridRowsProp, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getProductActivitiesByName, getProductDetailByName } from '../../services/api';

import Skeleton from '@mui/material/Skeleton';

interface WalletActionProps {
    productDetail?: GetProductDetailDTO,
}

export default function WalletAction(props: WalletActionProps) {
    const [productDetail, setProductDetail] = useState<GetProductDetailDTO | undefined>()
    const [tabIndex, setTabIndex] = useState(1)
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        const name = window.location.pathname.split('/').pop()

        if (!props.productDetail) {
            setIsLoading(true)
            getProductDetailByName(name || '')
                .then(res => {
                    setProductDetail(res)
                })
                .finally(() => setIsLoading(false))
        } else {
            setProductDetail(props.productDetail)
        }

    }, [props.productDetail])

    if(isLoading){
        return <Skeleton animation='wave' />
    }

    return (

        <>
            <Card
                raised={true}
                sx={{
                    minWidth: 300, height: '40%'
                }}
            >

                <CardContent sx={{ backgroundColor: '#121218' }} style={{ position: 'relative' }}>
                    <Tabs
                        indicatorColor='primary'
                        variant="fullWidth" value={tabIndex} onChange={(_, v) => { setTabIndex(v) }}>
                        <Tab value={1} label="DEPOSIT" />
                        <Tab value={2} label="WITHDRAW" />
                    </Tabs>
                    {
                        tabIndex === 1 ?
                            (
                                <div style={{ display: 'flex', gap: 20, flexDirection: 'column', margin: 10 }}>

                                    <div>
                                        <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                            {`AMOUNT (${productDetail?.product?.symbol})`}
                                        </Typography>

                                        <TextField placeholder='0' fullWidth />
                                    </div>

                                    <div
                                        style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}
                                    >
                                        <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                            Wallet Balance
                                        </Typography>
                                        <Typography sx={{ fontSize: 15 }} color="text.primary">
                                            0 {productDetail?.product?.symbol}
                                        </Typography>
                                    </div>

                                    <Button
                                        style={styles.connectWalletButton}
                                        fullWidth variant="contained">
                                        CONNECT WALLET
                                    </Button>
                                    <Box>
                                        <p style={{ fontSize: 12, color: '#14F195' }} >
                                            Your deposit will be deployed in the vault's weekly strategy on Friday at 11am UTC
                                        </p>

                                    </Box>
                                </div>
                            ) :
                            tabIndex === 2 ?
                                (
                                    <div style={{ display: 'flex', gap: 20, flexDirection: 'column', margin: 10 }}>

                                        <div>
                                            <Button
                                                style={{
                                                    border: '1px solid #16ceb9',
                                                    width: '50%',
                                                    borderRadius: 10,
                                                }}
                                                disabled
                                                variant="contained">
                                                STANDARD
                                            </Button>
                                            <Button
                                                style={{
                                                    width: '50%',
                                                    borderRadius: 10,
                                                }}
                                                disabled
                                                variant="contained">
                                                INSTANT
                                            </Button>
                                        </div>
                                        <div>

                                            <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                                {`AMOUNT (${productDetail?.product?.symbol})`}
                                            </Typography>

                                            <TextField placeholder='0' fullWidth />
                                        </div>

                                        <div
                                            style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}
                                        >
                                            <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                                Available Limit
                                            </Typography>
                                            <Typography sx={{ fontSize: 15 }} color="text.primary">
                                                0 {productDetail?.product?.symbol}
                                            </Typography>
                                        </div>

                                        <div
                                            style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}
                                        >
                                            <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                                Initiated Withdrawals
                                            </Typography>
                                            <Typography sx={{ fontSize: 15 }} color="text.primary">
                                                0 {productDetail?.product?.symbol}
                                            </Typography>
                                        </div>
                                        <Button
                                            style={styles.connectWalletButton}
                                            fullWidth variant="contained">
                                            CONNECT WALLET
                                        </Button>
                                        <Box>
                                            <p style={{ fontSize: 12, color: '#14F195' }} >
                                                Your deposit will be deployed in the vault's weekly strategy on Friday at 11am UTC
                                            </p>

                                        </Box>
                                    </div>
                                ) : null
                    }
                </CardContent>

            </Card>


            <Button
                style={{
                    borderRadius: 20,
                    backgroundColor: '#122125',
                    color: '#14F195'
                }}
                href='#'
                fullWidth
                variant="contained">
                CONTRACT 2YNJ4E...QMKW <OpenInNewIcon sx={{ fontSize: 20, marginLeft: 1 }} />
            </Button>
        </>
    )
}


const styles = {
    connectWalletButton: {
        backgroundColor: '#122125',
        color: '#16ceb9',
        height: 60
    }
}