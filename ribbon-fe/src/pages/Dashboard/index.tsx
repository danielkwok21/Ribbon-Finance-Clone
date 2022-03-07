import React, { useEffect, useState } from 'react'
import { GetProductDetailDTO, GetProductsDTO, ProductDTO } from '../../dto'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, LinearProgress, Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom'
import { formatNumber } from '../../utils'
import { getProducts } from '../../services/api';

export default function Dashboard() {
  const [products, setProducts] = useState<ProductDTO[] | []>([])
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

  const urlParams = new URLSearchParams(window.location.search)
  const strategy = urlParams.get('strategy')
  const deposit_asset = urlParams.get('deposit_asset')
  const sort_by = urlParams.get('sort_by')


  return (
    <div className='page' style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', }}>
      <div
        className='selector-container'
      >
        <FormControl fullWidth>
          <InputLabel id="strategy-label">Strategy</InputLabel>
          <Select
            labelId="strategy-label"
            value={strategy}
            onChange={e => {
              const strategy: string = typeof e.target.value === 'string' ? e.target.value : ''
              const searchParams = new URLSearchParams(window.location.search)
              searchParams.set('strategy', strategy)

              navigate(`?${searchParams.toString()}`)
            }}
          >
            <MenuItem value={'ALL'}>ALL</MenuItem>
            <MenuItem value={'COVERED CALL'}>COVERED-CALL</MenuItem>
            <MenuItem value={'PUT-SELLING'}>PUT-SELLING</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="deposit-asset-label">Deposit Asset</InputLabel>
          <Select
            labelId="deposit-asset-label"
            value={deposit_asset}
            onChange={e => {
              const strategy: string = typeof e.target.value === 'string' ? e.target.value : ''
              const searchParams = new URLSearchParams(window.location.search)
              searchParams.set('deposit_asset', strategy)

              navigate(`?${searchParams.toString()}`)
            }}
          >
            <MenuItem value={'ALL'}>ALL</MenuItem>
            <MenuItem value={'AAVE'}>AAVE</MenuItem>
            <MenuItem value={'ETH'}>ETH</MenuItem>
            <MenuItem value={'USDC.E'}>USDC.E</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="sort-by-label">Sort By</InputLabel>
          <Select
            labelId="sort-by-label"
            value={sort_by}
            onChange={e => {
              const strategy: string = typeof e.target.value === 'string' ? e.target.value : ''
              const searchParams = new URLSearchParams(window.location.search)
              searchParams.set('sort_by', strategy)

              navigate(`?${searchParams.toString()}`)
            }}
          >
            <MenuItem value={'DEFAULT'}>DEFAULT</MenuItem>
            <MenuItem value={'NEWEST FIRST'}>NEWEST FIRST</MenuItem>
            <MenuItem value={'OLDEST FIRST'}>OLDEST FIRST</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className='card-container'>

        {
          products
            .filter(product => {
              if (strategy && strategy !== 'ALL' && !product.strategy.includes(strategy)) return false
              if (deposit_asset && deposit_asset !== 'ALL' && product.symbol !== deposit_asset) return false
              return true
            })
            .sort((a, b) => {
              switch (sort_by) {
                case 'NEWEST FIRST':
                  return b.createdAt - a.createdAt
                case 'OLDEST FIRST':
                  return a.createdAt - b.createdAt
              }
              return 1
            })
            .map(product => {

              const progressValue = product.current_deposit / product.max_deposit * 100

              const formattedCurrentDeposit = formatNumber(product.current_deposit)
              const formattedMaxDeposit = formatNumber(product.max_deposit)

              return <a
                key={product.id}
                href={`/product/${product.name}`}

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
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                        {`Current Deposits`}
                      </Typography>
                      <Typography sx={{ fontSize: 12 }} color="text.primary" gutterBottom>
                        {formattedCurrentDeposit} {product.symbol}
                      </Typography>
                    </div>

                    <LinearProgress color='primary' variant="determinate" value={progressValue} />

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
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
