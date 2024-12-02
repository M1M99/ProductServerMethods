async function getOrder(){
let a = await fetch('http://localhost:5000/orders')
let result = await a.json()
return result}

async function printProd(arr = []) {
    let getList = document.getElementById('list')
    getList.innerHTML = '';

    for (const element of arr) {
        let myList = document.createElement('li')
        myList.innerHTML = `
        <p><span>Client:</span>${element.nameClient}</p>
        <p><span>Phone:</span>${element.number}</p>
        <p><span>Paid:</span>${element.TotalPrice}</p>
        `
        getList.appendChild(myList)
    }
}
async function a (){
    let a = await getOrder()
    await printProd(a)
}

await a()
