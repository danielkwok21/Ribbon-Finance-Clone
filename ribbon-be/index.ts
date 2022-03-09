
import express from 'express'
import cors from 'cors'
import product from './product/index'

const app = express()
const port = 5000

app.use(cors())

app.get('/healthcheck', (req, res) => {
    res.send('hello world from ribbon-be')
})

app.use('/product', product)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})