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
import { useNavigate, useParams } from 'react-router-dom'
import { formatNumber } from '../../utils'

export default function ProductDetail() {
  const [productDetail, setProductDetail] = useState<GetProductDetailDTO | undefined>()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    fetch(`http://localhost:5000/product/${params.name}`)
      .then(res => res.json())
      .then(res => {
        const dto: GetProductDetailDTO = {
          ...res
        }

        setProductDetail(dto)

      })
  }, [])


  const urlParams = new URLSearchParams(window.location.search)
  const strategy = urlParams.get('strategy')
  const deposit_asset = urlParams.get('deposit_asset')
  const sort_by = urlParams.get('sort_by')

  const progressValue = (productDetail?.deposit?.current_deposit || 0) / (productDetail?.deposit?.max_deposit || 0) * 100

  const formattedCurrentDeposit = formatNumber(productDetail?.deposit?.current_deposit || 0)
  const formattedMaxDeposit = formatNumber(productDetail?.deposit?.max_deposit || 0)

  return (
    <div
      style={{ width: '100%', flexDirection: 'column' }}>

      <div
        id='product-header-container'
      >
        <div
          style={{
            zIndex: -1,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div id='product-header-left'>

            <Typography sx={{ fontSize: 15 }} color="text.primary">
              {productDetail?.product?.strategy}
            </Typography>
            <Typography sx={{ fontSize: 30 }} color="text.primary" gutterBottom>
              {productDetail?.product?.name}
            </Typography>

            <br />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography variant='h6' color="text.secondary" gutterBottom>
                {`Current Vault Deposits`}
              </Typography>
              <Typography variant='h6' color="text.primary" gutterBottom>
                {formattedCurrentDeposit} {productDetail?.product?.symbol}
              </Typography>
            </div>

            <LinearProgress color='primary' variant="determinate" value={progressValue} />

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography variant='h6' color="text.secondary" gutterBottom>
                {`Max Vault Capacity`}
              </Typography>
              <Typography variant='h6' color="text.primary" gutterBottom>
                {formattedMaxDeposit} {productDetail?.product?.symbol}
              </Typography>
            </div>
          </div>
          <div id='product-header-right'>
            <div
              id='logo-background'
            >
              <img
                style={{ height: '50%', width: 'auto' }}
                src={productDetail?.product?.icon} />
            </div>
          </div>
        </div>
      </div>

      <div
        className='page'
        style={{
          justifyContent: 'flex-start',
          flexDirection: 'column'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row'

          }}
        >
          <div
            style={{ flex: 3 }}
          >

            <Typography variant='h6' color="text.primary">
              VAULT STRATEGY
            </Typography>
            <Typography variant='h6' color="text.primary">
              WEEKLY STRATEGY SNAPSHOT
            </Typography>

            <Typography variant='h6' color="text.primary">
              VAULT PERFORMANCE
            </Typography>


            <div style={{ marginTop: 50 }}>
              <Typography variant='h6' color="text.primary">
                WITHDRAWALS
              </Typography>
              <Typography
                sx={{ fontSize: 10 }} color="text.secondary"
                dangerouslySetInnerHTML={{ __html: productDetail?.productInformation?.withdrawals || "" }}
              >
              </Typography>

            </div>

            <div style={{ marginTop: 50 }}>
              <Typography variant='h6' color="text.primary">
                FEE STRUCTURE
              </Typography>
              <Typography
                sx={{ fontSize: 10 }} color="text.secondary"
                dangerouslySetInnerHTML={{ __html: productDetail?.productInformation?.fee_structure || "" }}
              >
              </Typography>

            </div>

            <div style={{ marginTop: 50 }}>
              <Typography variant='h6' color="text.primary">
                RISK
              </Typography>
              <Typography
                sx={{ fontSize: 10 }} color="text.secondary"
                dangerouslySetInnerHTML={{ __html: productDetail?.productInformation?.risk || "" }}
              >
              </Typography>

            </div>

          </div>
          <div
            style={{ flex: 3 }}
          >
            <div >
              <Typography variant='h6' color="text.primary">
                RISK
              </Typography>
              <Typography
                sx={{ fontSize: 10 }} color="text.secondary"
                dangerouslySetInnerHTML={{ __html: productDetail?.productInformation?.risk || "" }}
              >
              </Typography>

            </div>
          </div>

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
          <div
            style={{ marginTop: 50 }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row'
              }}
            >

              <Typography
                variant='h6' color="text.primary" gutterBottom>
                VAULT ACTIVITY
              </Typography>

              <FormControl style={{ width: 200, marginLeft: 10 }} size='small'>
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

              <FormControl style={{ width: 200, marginLeft: 10 }} size='small'>
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
            <Typography variant='h6' color="text.secondary">
              _ _ _
            </Typography>

          </div>
        </div>
      </div>
    </div >
  )
}
