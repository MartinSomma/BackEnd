import express from 'express'
import ProductManager from './entregable2.js'



const app = express()
const manager = new ProductManager('./products.json');


app.get('/products', (request, response) => {
    const limit = request.query.limit
    const id = request.query.pid
    
    manager.getProducts().then((data) => {
        if (!limit && !id) {
        response.send(data) 
        } else if (id) {
            const prod = data.find(item => item.id == id)
            if (!prod) return response.send({ error: 'El producto no existe' })
            response.send(prod)
        } else if (limit) {
            response.send ( data.slice(0, limit) )
        } 
    } )
    
})
    


app.listen(8080, () => console.log('Server Up'))

