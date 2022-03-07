import React, { useEffect, useState } from 'react'
import { GetProductActivitiesDTO, GetProductActivity, GetProductDetailDTO, GetProductsDTO, ProductDTO } from '../../dto'
import { Product, ProductActivity, ProductInformation } from '../../types'
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
import VaultPerformance from './VaultPerformance';
import WalletAction from './WalletAction';
import StrategySnapshot from './StrategySnapshot';

export default function ProductDetail() {
  const [productDetail, setProductDetail] = useState<GetProductDetailDTO | undefined>()
  const [productActivities, setProductActivities] = useState<ProductActivity[] | []>([])
  const [tabIndex, setTabIndex] = useState(1)
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    getProductDetailByName(params.name || '')
      .then(res => {
        setProductDetail(res)
      })

    getProductActivitiesByName(params.name || '')
      .then(res => {
        const dto: GetProductActivitiesDTO = {
          ...res
        }

        setProductActivities(dto.productActivities || [])

      })
  }, [])


  const rows: GridRowsProp = productActivities

  const columns: GridColDef[] = [
    {
      field: 'action', headerName: 'Action', flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        const productActivity: ProductActivity = params.row
        const dateBetween = getDurationInDaysAgo(productActivity.updatedAt)

        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
          {
            params.value === 'SOLD CONTRACTS' ?
              <AttachMoneyIcon color='primary' />
              :
              <AutoAwesomeMotionIcon color='secondary' />
          }
          <div>

            <Typography style={{ fontSize: 12 }} display="block" color='text.primary'>
              {params.value}
            </Typography>

            <Typography style={{ fontSize: 10 }} display="block" color='text.secondary'>
              {dateBetween}
            </Typography>
          </div>
        </div>
      }
    },
    {
      field: 'contract', headerName: 'Contract', flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        const productActivity: ProductActivity = params.row

        return <div>
          <Typography style={{ fontSize: 12 }} display="block" color='text.primary'>
            {params.value}
          </Typography>

          <Typography style={{ fontSize: 10 }} display="block" color='text.secondary'>
            Strike {productActivity.strike_price}
          </Typography>
        </div>
      }
    },
    {
      field: 'quantity', headerName: 'Quantity', flex: 1,
    },
    {
      field: '', headerName: 'Yield', flex: 1,
      renderCell: (params: GridRenderCellParams) => {
        const productActivity: GetProductActivity = params.row

        return <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }} >
          <div>
            <Typography style={{ fontSize: 12 }} display="block" color='rgb(22, 206, 185)'>
              {productActivity.yield_string}
            </Typography>

            <Typography style={{ fontSize: 10 }} display="block" color='text.secondary'>
              {productActivity.yield_dollar_string}
            </Typography>
          </div>
          <a href='#'>
            <OpenInNewIcon fontSize='small' color='disabled' />
          </a>
        </div>
      }
    },
  ]

  const urlParams = new URLSearchParams(window.location.search)

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
        className='product-container'
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <div
            className='product-left-container'
          >

            <Typography variant='h6' color="text.primary">
              VAULT STRATEGY
            </Typography>
            <Typography
              sx={{ fontSize: 10 }} color="text.secondary"
              dangerouslySetInnerHTML={{ __html: productDetail?.productInformation?.strategy || "" }}
            >
            </Typography>

            <br />
            <Typography variant='h6' color="text.primary">
              WEEKLY STRATEGY SNAPSHOT
            </Typography>
            <StrategySnapshot />

            <br />
            <Typography variant='h6' color="text.primary">
              VAULT PERFORMANCE
            </Typography>
            <VaultPerformance />


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
            className='product-right-container'
          >
            <WalletAction
              productDetail={productDetail}
            />
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
            style={{ marginTop: 50, width: '100%' }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 20,
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
            <div style={{ height: 300, width: '100%' }}>
              <DataGrid rows={rows} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}


const styles = {
  connectWalletButton: {
    backgroundColor: '#122125',
    color: '#16ceb9',
    height: 60
  }
}