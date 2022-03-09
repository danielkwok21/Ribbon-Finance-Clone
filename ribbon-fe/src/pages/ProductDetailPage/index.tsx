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
import {
  getIsMobile
} from '../../utils'
import VaultActivity from './VaultActivity';

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

  const progressValue = (productDetail?.deposit?.current_deposit || 0) / (productDetail?.deposit?.max_deposit || 0) * 100

  const formattedCurrentDeposit = formatNumber(productDetail?.deposit?.current_deposit || 0)
  const formattedMaxDeposit = formatNumber(productDetail?.deposit?.max_deposit || 0)

  const isMobile = getIsMobile()

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
            <Typography sx={{ fontSize: '3em' }} color="text.primary" gutterBottom>
              {productDetail?.product?.name}
            </Typography>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography sx={{ fontSize: '1em' }} color="text.secondary" gutterBottom>
                {`Current Vault Deposits`}
              </Typography>
              <Typography sx={{ fontSize: '1em' }} color="text.primary" gutterBottom>
                {formattedCurrentDeposit} {productDetail?.product?.symbol}
              </Typography>
            </div>

            <LinearProgress color='primary' variant="determinate" value={progressValue} />

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography sx={{ fontSize: '1em' }} color="text.secondary" gutterBottom>
                {`Max Vault Capacity`}
              </Typography>
              <Typography sx={{ fontSize: '1em' }} color="text.primary" gutterBottom>
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

        {
          isMobile ? (
            <Button
              style={{
                borderRadius: 20,
                backgroundColor: '#122125',
                color: '#14F195',
                margin: 20
              }}
              href='#'
              variant="contained">
              CONTRACT 2YNJ4E...QMKW <OpenInNewIcon sx={{ fontSize: 20, marginLeft: 1 }} />
            </Button>
          ) : null
        }

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
            <VaultActivity
              productDetail={productDetail}
            />
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