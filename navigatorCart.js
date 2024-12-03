let cartPay = document.getElementById('pay');

function printProd(arr = []) {
    let getList = document.getElementById('list');
    getList.innerHTML = '';

    arr.forEach(element => {
        let myList = document.createElement('li');
        myList.innerHTML = `
            <p>${element.product_name}</p>
            <p>${element.product_description}</p>
            <p>${element.product_price}</p>
            <p>${element.store_address}</p>
            <p>${element.store_name}</p>
            <button class='dltbtn'>Delete From Cart</button>
        `;
        myList.querySelector('.dltbtn').addEventListener('click', (ev) => {
            let lS1 = JSON.parse(localStorage.getItem('cart'));
            const index = lS1.findIndex(item => item.product_name === element.product_name);

            if (index !== -1) {
                lS1.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(lS1));
            }
            if (lS1.length === 0) {
                cartPay.style.display = 'none';
                let tag = document.createElement('h1');
                tag.innerText = 'Cart is Empty';
                tag.style.textAlign = 'center';
                getList.appendChild(tag);
                
            }
            printProd(lS1);
        });
        getList.appendChild(myList);
    });
}

let lS = (localStorage.getItem('cart'));
if (lS && JSON.parse(lS).length > 0) {
    cartPay.style.display = 'flex';
    printProd(JSON.parse(lS));
    console.log(JSON.parse(lS));
} else {
    console.log('Cart is Empty');
    let tag = document.createElement('h1');
    tag.innerText = 'Cart is Empty';
    tag.style.textAlign = 'center';
    document.body.appendChild(tag);
}

let form = document.getElementById('formCart');

cartPay.addEventListener('click', (e) => {
    if (form.style.display === 'block') {
        form.style.display = 'none';
        e.target.innerHTML = 'Confirm Cart';
    } else {
        form.style.display = 'block';
        e.target.innerHTML = 'Hide';
    }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let arr = Object.fromEntries([...new FormData(e.target)]);  
    let cart = JSON.parse(localStorage.getItem('cart')); 
    arr.customerBag = cart; 

    if ((arr.nameClient).trim().length > 4 && (arr.number).trim().length > 4 && (arr.TotalPrice).trim().length > 0) {
        let postOrder = await fetch('http://localhost:5000/add-orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(arr),
        });
// sadece ad soyadi price i yazdim ordere sinifdekinden ferqli olsun deye
        let result = await postOrder.json();
        console.log(result.text);
        if (postOrder.ok) {
            localStorage.clear();
            window.location.href = 'navigatorShop.html';
        }
    } else {
        console.log('False');
    }
});


let list = document.getElementById('listOrders');

function drawList(arr) {
    list.innerHTML = '';
    arr.forEach(element => {
        let customerItem = document.createElement('li');
        customerItem.innerHTML = `
            <p class="customerName customer-item">${element.nameClient}</p>
            <p class="customerNumber customer-item">${element.number}</p>
            <p class="customerAddress customer-item">${element.TotalPrice}</p>
        `;
        element.customerBag.forEach(product => {
            let productItem = document.createElement('li');
            productItem.innerHTML = `
                <p class="product_name product-item">${product.product_name}</p>
                <p class="product_description product-item">${product.product_description}</p>
                <p class="product_price product-item">${product.product_price}</p>
            `;
            customerItem.querySelector('.customerBag').appendChild(productItem);
        });
        list.appendChild(customerItem);
    });
}

async function getOrders() {
    let response = await fetch('http://localhost:5000/orders');
    let data = await response.json();
    if (data.length === 0) {
        let tag = document.createElement('h1');
        tag.innerText = 'No Orders Found';
        tag.style.textAlign = 'center';
        list.appendChild(tag);
    } else {
        drawList(data);
    }
}

getOrders();
