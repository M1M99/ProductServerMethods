let links = document.querySelectorAll('.allLink')
links.forEach(element => {
    element.addEventListener('mouseover', (ev) => {
        ev.target.style.color = 'aqua';
    })

    element.addEventListener('mouseout', (ev) => {
        ev.target.style.color = 'antiquewhite';
    })
});

export function printArray (arr = []) {
    let getList = document.getElementById('list')
    getList.innerHTML = '';

    arr.forEach(element => {
        let myList = document.createElement('li')
        myList.innerHTML = `
        <p>${element.product_name}</p>
        <p>${element.product_description}</p>
        <p>${element.product_price}</p>
        <p>${element.store_address}</p>
        <p>${element.store_name}</p>
        <button id="btn">Cart</button>
        `
        getList.appendChild(myList)  
        
        myList.querySelector('#btn').addEventListener('click' , (ev) => {
            let lS = JSON.parse(localStorage.getItem('cart')) || []
            if(!lS.some(i => i.product_name === element.product_name )){
                lS.push(element)
                localStorage.setItem('cart',JSON.stringify(lS))
            }
        })
    })
}

fetch('http://localhost:5000/goods').then((res) => res.json()).then((data) => printArray(data))
