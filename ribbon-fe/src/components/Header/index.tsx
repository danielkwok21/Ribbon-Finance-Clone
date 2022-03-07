import React from 'react'
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

export default function Header() {

    const navigate = useNavigate()

    return (
        <div
            className='header'
        >
            <div style={{ width: '20%', textAlign: 'center' }}>
                <a  onClick={() => navigate('/')}>
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
                <a  onClick={() => navigate('/')}>

                    <Typography className='path-link' variant="subtitle1" color={window.location.pathname === '/' ? "text.primary" : "text.secondary"}>
                        PRODUCTS
                    </Typography>
                </a>
                <a onClick={() => navigate('/portfolio')}>
                    <Typography className='path-link' variant="subtitle1" color={window.location.pathname === '/portfolio' ? "text.primary" : "text.secondary"}>
                        PORTFOLIO
                    </Typography>
                </a>
            </div>

            <div style={{ width: '20%', textAlign: 'center' }}>
                <a
                    
                >
                    <Typography variant="subtitle1" id='connect-wallet-link'>
                        CONNECT WALLET
                    </Typography>
                </a>
            </div>
        </div>
    )
}
