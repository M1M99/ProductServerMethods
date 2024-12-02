let cartPay = document.getElementById('pay')

function printProd(arr = []) {
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
        <button id='dltbtn'>Delete From Cart</button>
        `
        myList.querySelector('#dltbtn').addEventListener('click', (ev) => {
            let lS1 = JSON.parse(localStorage.getItem('cart'))
            const index = lS1.findIndex(item => item.product_name === element.product_name);

            if (index !== -1) {
                lS1.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(lS1));
            }
            if (lS1.length === 0) {
                cartPay.style.display = 'none';
                let tag = document.createElement('h1')
                tag.innerText = 'Cart is Empty'
                tag.style.textAlign = 'center'
                document.body.appendChild(tag)
            }
            printProd(lS1);
        })
        getList.appendChild(myList)
    })
}

let lS = (localStorage.getItem('cart'))
if (lS && JSON.parse(lS).length > 0) {
    cartPay.style.display = 'flex'
    printProd(JSON.parse(lS))
    console.log(JSON.parse(lS))
}
else {
    console.log('Cart is Empty')
    let tag = document.createElement('h1')
    tag.innerText = 'Cart is Empty'
    tag.style.textAlign = 'center'
    document.body.appendChild(tag)
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
    e.preventDefault()
    let arr = Object.fromEntries([...new FormData(e.target)])

    if ((arr.nameClient).trim().length > 7 && (arr.number).trim().length > 7 && (arr.TotalPrice).trim().length > 7) {
        let postOrder = await fetch('http://localhost:5000/add-orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(arr),
        });

        let result = await postOrder.json();
        console.log(result.text);
        if (postOrder.ok) {
            localStorage.clear()
            window.location.href = 'navigatorShop.html'
        }
    }
    else {
        console.log('False');
    }
})