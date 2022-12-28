import {faker} from '@faker-js/faker'

function generateRandomProducts() {
    const listProd = [];
        for (let index = 0; index < 5; index++) {
        
        const item = {
            id : index + 1 ,
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            thumbnail: faker.image.imageUrl()
        }
            listProd.push(item)
    }
    return listProd
} 
export default generateRandomProducts