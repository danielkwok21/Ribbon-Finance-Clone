
import express from 'express'
const app = express()
const port = 3000
import product from './product/index'

app.get('/healthcheck', (req, res) => {
    res.send('hello world from ribbon-be')
})

app.use('/product', product)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
