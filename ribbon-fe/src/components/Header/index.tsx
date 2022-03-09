import React from 'react'
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { getIsMobile } from '../../utils';

export default function Header() {

    const navigate = useNavigate()
    const isMobile = getIsMobile()

    return (
        <div
            className='header'
        >
            <div className='header-left-container'>
                <a  onClick={() => navigate('/')}>
                    <HomeIcon fontSize="large" style={{ color: 'white' }} />
                </a>
            </div>
            <div className='header-center-container'>
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

            <div className='header-right-container'>
                <a>
                    <Typography variant="subtitle1" id='connect-wallet-link'>
                        CONNECT WALLET
                    </Typography>
                </a>
            </div>
        </div>
    )
}
