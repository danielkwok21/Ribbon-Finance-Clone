import React, { useEffect, useState } from 'react'
import { GetProductDetailDTO, GetProductsDTO } from '../../dto'
import { Product, ProductInformation } from '../../types'
import './index.css'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Dashboard() {
  const [products, setProducts] = useState<Product[] | []>([])

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

  return (
    <div className='page'>
      <div className='card-container'>

        {
          products.map(product => {
            return <Card
              className='card'
              raised={true}
              key={product.id} sx={{ minWidth: 275 }}
            >

              <div style={{ height: 100, background: product.background }}>
              </div>
              <CardContent>
                <Typography sx={{ fontSize: 30 }} color="text.primary" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="h5" component="div">
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
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          })
        }
      </div>
    </div>
  )
}
