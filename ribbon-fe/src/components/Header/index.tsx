import React from 'react'
import './index.css'
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
export default function Header() {
    return (
        <div
            className='header'
        >
            <div style={{ width: '20%', textAlign: 'center' }}>
                <a href='/'>
                    <HomeIcon fontSize="large" style={{ color: 'white' }} />
                </a>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 20,
                    width: '60%',
                    justifyContent: 'center',
                }}
            >
                <a
                    href='/'
                >

                    <Typography className='path-link' variant="subtitle1" color={window.location.pathname === '/' ? "text.primary" : "text.secondary"}>
                        PRODUCTS
                    </Typography>
                </a>
                <a
                    href='/portfolio'
                >

                    <Typography className='path-link' variant="subtitle1" color={window.location.pathname === '/portfolio' ? "text.primary" : "text.secondary"}>
                        PORTFOLIO
                    </Typography>
                </a>
            </div>

            <div style={{ width: '20%', textAlign: 'center' }}>
                <a
                    href='#'
                >
                    <Typography variant="subtitle1" id='connect-wallet-link'>
                        CONNECT WALLET
                    </Typography>
                </a>
            </div>
        </div>
    )
}
