import {Product} from '../types.ts'
import {v4} from 'https://deno.land/std/uuid/mod.ts'

let products: Product[] = [
    {
        id: "1",
        name: "Book",
        description: "Awesome book",
        price: 19.99,
    },
    {
        id: "2",
        name: "Computer",
        description: "Awesome book",
        price: 22.99,
    },
    {
        id: "3",
        name: "Laptop",
        description: "Awesome laptop",
        price: 19.99,
    },
]

const getProducts = ({response}: {response: any}) => {
    response.body = {
        success: true,
        body: products
    }
}

const getProduct = ({params, response}: {params: {id: string},response: any}) => {
    const product: Product | undefined = products.find(p => p.id === params.id)

    if(product) {
        response.status = 200
        response.body = {
            success: true,
            data: product
        }
    } else {
        response.status = 404
        response.body = {
            success: false,
            message: 'No product found'
        }
    }
}

const addProduct = async ({request, response}: {request: any, response: any}) => {
    const body = await request.body()

    if(!request.hasBody){
        response.status = 404
        response.body = {
            success: false,
            message: 'No data'
        }
    } else {
        const product: Product = body.value
        product.id = v4.generate()
        products.push(product)
        response.status = 201
        response.body = {
            success: true,
            data: product
        }
    }
}

const updateProduct = async ({params, request, response}: {params: {id: string}, request: any, response: any}) => {
    const product: Product | undefined = products.find(p => p.id === params.id)

    if(product) {
        const body = await request.body()

        const updatedData: {name?: string; description?: string; price?: number} = body.value

        products = products.map(p => p.id === params.id ? {...p, ...updatedData } : p)

        response.status = 200
        response.body = {
            success: true,
            data: products
        }
    } else {
        response.status = 404
        response.body = {
            success: false,
            message: 'No product found'
        }
    }
}

const deleteProduct = ({params, response}: {params: {id: string},response: any}) => {
    const product: Product | undefined = products.find(p => p.id === params.id)
    products = products.filter(p => p.id !== params.id)
    response.body = {
        success: true,
        data: products
    }
}
export {getProducts, getProduct, addProduct, updateProduct, deleteProduct };