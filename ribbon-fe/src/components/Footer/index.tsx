import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useLocation } from 'react-router-dom';
import WalletAction from '../../pages/ProductDetailPage/WalletAction';
import { getIsMobile } from '../../utils';


export default function Footer() {

    const [open, setOpen] = React.useState(false);
    const location = useLocation()

    const isMobile = getIsMobile()

    /**Show diff footer if it's in product page */
    const isProductPage = location.pathname.includes('product')

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        width: '100%',
        height: '100%',
        bgcolor: 'background.paper',
    };

    return (
        <div
            className='footer'
        >
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={style}
            >
                <Fade in={open}>
                    <div
                        style={{
                            margin: '10%',
                        }}
                    >
                        <div
                            onClick={handleClose}
                            style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: '10%' }}>
                            <ArrowBackIcon color='primary' />
                            <Typography variant="subtitle1" color='text.primary'>
                                Back
                            </Typography>
                        </div>
                        <WalletAction />

                    </div>
                </Fade>
            </Modal>
            {
                isMobile ? (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            width: '100%'
                        }}
                    >
                        <Typography variant="subtitle1" id='connect-wallet-link'>
                            CONNECT WALLET
                        </Typography>
                        {
                            isProductPage ? (

                                <Typography
                                    onClick={() => handleOpen()}
                                    variant="subtitle1" color={'#14F195'}>
                                    INVEST
                                </Typography>
                            ) : null
                        }
                    </div>
                ) : (
                    <>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 20,
                                width: '60%',
                                justifyContent: 'flex-start',
                                marginLeft: 10,
                            }}
                        >
                            <a>

                                <Typography className='path-link' variant="subtitle1" color='text.secondary'>
                                    GOVERNANCE
                                </Typography>
                            </a>
                            <a>
                                <Typography className='path-link' variant="subtitle1" color='text.secondary'>
                                    FAQ
                                </Typography>
                            </a>
                            <a>
                                <Typography className='path-link' variant="subtitle1" color='text.secondary'>
                                    BLOG
                                </Typography>
                            </a>
                            <a>
                                <Typography className='path-link' variant="subtitle1" color='text.secondary'>
                                    TERMS
                                </Typography>
                            </a>
                            <a>
                                <Typography className='path-link' variant="subtitle1" color='text.secondary'>
                                    POLICY
                                </Typography>
                            </a>
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 20,
                                width: '40%',
                                justifyContent: 'flex-end',
                                marginRight: 20,
                            }}>

                            <a>
                                <Typography className='path-link' variant="subtitle1" color='text.secondary'>
                                    DISCORD
                                </Typography>
                            </a>
                            <a>
                                <Typography className='path-link' variant="subtitle1" color='text.secondary'>
                                    TWITTER
                                </Typography>
                            </a>
                            <a>
                                <Typography className='path-link' variant="subtitle1" color='text.secondary'>
                                    GITHUB
                                </Typography>
                            </a>
                        </div>
                    </>
                )
            }
        </div >
    )
}
