import fs, { readFile } from 'fs';
import { v4 as uuidv4 } from "uuid";

class ProductManager {
    constructor(path){
        this.path = path;
    }

    getAll = async() =>{
        try {
            if(fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(products)
            }
            return [];
        } catch (error) {
            throw new Error(error)
        }
    }

    getById = async(id) =>{
        try {
            const products = await this.getAll();
            const product = products.find((p)=> p.id === id);
            if(!product) throw new Error("no existe el producto")
                return product
        } catch (error) {
            throw new Error(error)
        }
    }

    create = async(obj) =>{
        try {
            const product = {
                id: uuidv4(),
                ...obj,
            };
            const products = await this.getAll();
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return product;
        } catch (error) {
            throw new Error(error)
        }
    };

    update = async(obj,id) =>{
        try {
            const products = await this.getAll();
            let productExist = await this.getById(id);
            productExist = {...productExist, ...obj};
            const newArray = products.filter((prod)=> prod.id !== id);
            newArray.push(productExist)
            await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            return productExist;
        } catch (error) {
            throw new Error(error)
        }
    }

    delete = async(id)=>{
        try {
            const product = await this.getById(id)
            const products = await this.getAll();
            const newProducts = products.filter((p)=> p.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
            return `producto con id: ${product.id} eliminado`
        } catch (error) {
            throw new Error(error)
        }
    }
}

export const productManager = new ProductManager("../data/products.json")