import React, { useEffect, useState } from 'react'
import { GetProductDetailDTO, GetProductsDTO, ProductDTO } from '../../dto'
import { Product, ProductInformation } from '../../types'
import './index.css'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, LinearProgress, Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom'
import {formatNumber} from '../../utils'

export default function Dashboard() {
  const [products, setProducts] = useState<ProductDTO[] | []>([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:5000/product')
      .then(res => res.json())
      .then(res => {
        const dto: GetProductsDTO = {
          ...res
        }

        setProducts(dto.products || [])

      })
  }, [])

  console.log(products)

  return (
    <div className='page' style={{ flexDirection: 'column' }}>



      <div
        className='selector-container'
      >
        <FormControl fullWidth>
          <InputLabel id="strategy-label">Strategy</InputLabel>
          <Select
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

        <FormControl fullWidth>
          <InputLabel id="deposit-asset-label">Deposit Asset</InputLabel>
          <Select
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


        <FormControl fullWidth>
          <InputLabel id="sort-by-label">Sort By</InputLabel>
          <Select
            labelId="sort-by-label"
            value=''
          >
            <MenuItem value={'DEFAULT'}>DEFAULT</MenuItem>
            <MenuItem value={'NEWEST FIRST'}>NEWEST FIRST</MenuItem>
            <MenuItem value={'OLDEST FIRST'}>OLDEST FIRST</MenuItem>
          </Select>
        </FormControl>

      </div>



      <div className='card-container'>

        {
          products.map(product => {

            const progressValue = product.current_deposit / product.max_deposit * 100

            const formattedCurrentDeposit = formatNumber(product.current_deposit)
            const formattedMaxDeposit = formatNumber(product.max_deposit)

            return <a
              key={product.id}
              href={`/product/${product.id}`}

            >
              <Card
                className='card'
                raised={true} sx={{ minWidth: 275 }}
              >
                <div style={{ height: 100, background: product.background }}>
                  <div
                    style={{
                      padding: 10,
                      boxShadow: `inset 0 0 2000px ${product.background}`,
                      // filter: 'blur(1px)',
                      // backgroundColor: 'red',
                      zIndex: -1,
                      width: '40%',

                    }}
                  >
                    <Typography sx={{ fontSize: 15 }} component="div">
                      {product.strategy}
                    </Typography>
                  </div>
                </div>
                <CardContent style={{ position: 'relative' }}>
                  <Avatar src={product.icon} style={{ position: 'absolute', top: -20, }} />
                  <Typography sx={{ fontSize: 30 }} color="text.primary" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography sx={{ fontSize: 12 }} color="text.secondary">
                    {product.short_description}
                  </Typography>
                  <br />
                  <Typography sx={{ fontSize: 12 }} color="text.secondary">
                    CURRENT PROJECTED YIELD (APY)
                  </Typography>
                  <Typography variant="body2">
                    {product.projected_yield} %
                  </Typography>

                  <br />
                  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                    {`Current Deposits`}
                  </Typography>
                  <Typography sx={{ fontSize: 12 }} color="text.primary" gutterBottom>
                    {formattedCurrentDeposit} {product.symbol}
                  </Typography>
                  </div>

                  <LinearProgress color='primary' variant="determinate" value={progressValue}  />

                  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                    {`Max Capacity`}
                  </Typography>
                  <Typography sx={{ fontSize: 12 }} color="text.primary" gutterBottom>
                    {formattedMaxDeposit} {product.symbol}
                  </Typography>
                  </div>

                  <br />
                  <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                    {`Your Position`}
                  </Typography>
                </CardContent>
              </Card>
            </a>
          })
        }
      </div>
    </div >
  )
}
