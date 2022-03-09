import React, { useEffect, useState } from 'react'
import { GetProductActivitiesDTO, GetProductActivity, GetProductDetailDTO, GetProductsDTO, ProductDTO } from '../../dto'
import Typography from '@mui/material/Typography';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Avatar, LinearProgress, Select, Tab, Tabs, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface WalletActionProps {
    productDetail?: GetProductDetailDTO,
}

export default function WalletActionPage(props: WalletActionProps) {
    const [tabIndex, setTabIndex] = useState(1)

    useEffect(() => {

    }, [])

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
                                            {`AMOUNT (${props.productDetail?.product?.symbol})`}
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
                                            0 {props.productDetail?.product?.symbol}
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
                                                {`AMOUNT (${props.productDetail?.product?.symbol})`}
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
                                                0 {props.productDetail?.product?.symbol}
                                            </Typography>
                                        </div>

                                        <div
                                            style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}
                                        >
                                            <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                                Initiated Withdrawals
                                            </Typography>
                                            <Typography sx={{ fontSize: 15 }} color="text.primary">
                                                0 {props.productDetail?.product?.symbol}
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