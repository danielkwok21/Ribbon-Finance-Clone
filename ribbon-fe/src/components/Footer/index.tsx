import React from 'react'
import './index.css'
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

export default function Header() {

    const navigate = useNavigate()

    return (
        <div
            className='footer'
        >
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
        </div>
    )
}
