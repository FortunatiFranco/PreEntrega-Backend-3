const socket = io()

const form = document.getElementById('form');
const inputName = document.getElementById('name');
const inputPrice = document.getElementById('price');
const products = document.getElementById('products');

form.onsubmit = (e)=>{
    e.preventDefault();
    const name = inputName.value;
    const price = inputPrice.value;
    socket.emit('new-product', {name, price})
}

socket.on('array-products', (array)=>{
    let infoProducts = '';
    array.forEach(p =>{
        infoProducts += `${p.name} - $${p.price} <br/>`
    })
    products.innerHTML = infoProducts;
})
