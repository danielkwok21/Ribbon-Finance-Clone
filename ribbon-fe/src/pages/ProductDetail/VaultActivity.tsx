import React, { useEffect, useState } from 'react'
import { GetProductActivitiesDTO, GetProductActivity, GetProductDetailDTO, GetProductsDTO, ProductActivityAction, ProductDTO } from '../../dto'
import { Product, ProductActivity, ProductInformation } from '../../types'
import Typography from '@mui/material/Typography';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Avatar, LinearProgress, Select, Tab, Tabs, Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useNavigate, useParams } from 'react-router-dom'
import { formatNumber, getDurationInDaysAgo } from '../../utils'
import { DataGrid, GridRowsProp, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { getProductActivitiesByName, getProductDetailByName } from '../../services/api';

import {
  getIsMobile
} from '../../utils'

interface VaultActivityProps {
  productDetail: GetProductDetailDTO | undefined
}

export default function VaultActivity(props: VaultActivityProps) {
  const productDetail = props.productDetail
  const [productActivities, setProductActivities] = useState<GetProductActivity[] | []>([])
  const [tabIndex, setTabIndex] = useState(1)
  const navigate = useNavigate()
  const params = useParams()

  const isMobile = getIsMobile()

  useEffect(() => {
    getProductActivitiesByName(params.name || '')
      .then(res => {
        const dto: GetProductActivitiesDTO = {
          ...res
        }

        setProductActivities(dto.productActivities || [])

      })
  }, [])

  const urlParams = new URLSearchParams(window.location.search)
  const action = urlParams.get('action')
  const sort_by = urlParams.get('sort_by')
  
  
  const filteredPA = productActivities
  .filter(pa => {
    if (!action) return true
    if (action === 'ALL ACTIVITY') return true
    console.log(pa.action, action)
    return pa.action === action
  })
  .sort((a, b) => {
    switch (sort_by) {
      case 'LATEST FIRST':
        return b.createdAt - a.createdAt
      case 'OLDEST FIRST':
        return a.createdAt - b.createdAt
    }
    return 1
  })

  const rows: GridRowsProp = filteredPA

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

  return (

    <div
      style={{ marginTop: 50, width: '100%' }}
    >

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          flexWrap: 'wrap'
        }}
      >

        <Typography variant='h6' color="text.primary" gutterBottom>
          TRANSACTION HISTORY
        </Typography>

        <div>

          <FormControl style={{ width: '50%', maxWidth: 160, }} size='small'>
            <InputLabel id="action-label">ALL ACTIVITY</InputLabel>
            <Select
              style={{ maxWidth: 200 }}
              labelId="action-label"
              value={action}
              onChange={e => {
                const action: string = typeof e.target.value === 'string' ? e.target.value : ''
                const searchParams = new URLSearchParams(window.location.search)
                searchParams.set('action', action)

                navigate(`?${searchParams.toString()}`)
              }}
            >
              <MenuItem value={'ALL ACTIVITY'}>ALL ACTIVITY</MenuItem>
              <MenuItem value={'SOLD'}>SALES</MenuItem>
              <MenuItem value={'MINTED'}>MINTING</MenuItem>
            </Select>
          </FormControl>

          <FormControl style={{ width: '50%', maxWidth: 160, marginLeft: 10 }} size='small'>
            <InputLabel id="sort-by-label">LATEST FIRST</InputLabel>
            <Select
              style={{ maxWidth: 200 }}
              labelId="sort-by-label"
              value={sort_by}
              onChange={e => {
                const sort_by: string = typeof e.target.value === 'string' ? e.target.value : ''
                const searchParams = new URLSearchParams(window.location.search)
                searchParams.set('sort_by', sort_by)

                navigate(`?${searchParams.toString()}`)
              }}
            >
              <MenuItem value={'LATEST FIRST'}>LATEST FIRST</MenuItem>
              <MenuItem value={'OLDEST FIRST'}>OLDEST FIRST</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      {
        isMobile ? (
          <div style={{ width: '100%', minHeight: 300, }}>
            {
              filteredPA.map(pa => {
                return (
                  <div
                    key={pa.id}
                    style={{
                      backgroundColor: '#121218',
                      margin: 10
                    }}
                  >
                    <Typography color='text.primary'>
                      {pa.action} {pa.quantity} CONTRACTS
                    </Typography>

                    <Typography sx={{ fontSize: 12 }} color='text.secondary'>
                      {pa.contract}
                    </Typography>
                    <div
                      style={{ display: 'flex', width: '100%', marginTop: 20 }}
                    >
                      <div
                        style={{ flex: 5 }}
                      >
                        <Typography style={{ fontSize: 18 }} display="block" color='rgb(22, 206, 185)'>
                          {pa.yield_string}
                        </Typography>

                        <Typography sx={{ fontSize: 15 }} color='text.secondary'>
                          {getDurationInDaysAgo(pa.createdAt)}
                        </Typography>
                      </div>

                      <div
                        style={{ flex: 1 }}
                      >
                        {
                          pa.action === ProductActivityAction.SOLD ?
                            <AttachMoneyIcon style={{ color: 'rgb(22, 206, 185)' }} />
                            :
                            pa.action === ProductActivityAction.MINTED ?
                              <AutoAwesomeMotionIcon color='info' />
                              : null
                        }
                      </div>
                    </div>
                  </div>
                )
              })
            }

          </div>
        ) : (
          <div style={{ height: 300, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} />
          </div>
        )
      }
    </div>
  )
}


const styles = {
  connectWalletButton: {
    backgroundColor: '#122125',
    color: '#16ceb9',
    height: 60
  }
}