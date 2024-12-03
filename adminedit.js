let list = document.getElementById('listProducts')

async function deleteProduct(id) {
    let response = await fetch(`http://localhost:5000/delete-admin/${id}`, {
        method:'DELETE'
    })
    let data = await response.json()
    if(response.ok){
        getProducts()
    }
}

function editProduct(productItem, element) {
    let inputs = productItem.querySelectorAll('.editForm input')
    let form = productItem.querySelector('.editForm')
    if(form.dataset.form === 'false'){
        form.style.display = 'block'
        form.dataset.form = 'true'
    }else{
        form.style.display = 'none'
        form.dataset.form = 'false'
    }

    inputs.forEach((item) => item.value = element[item.name])
}

async function saveProduct(ev, id) {
    ev.preventDefault()
    let formData = Object.fromEntries([...new FormData(ev.target)])

    let response = await fetch(`http://localhost:5000/change-admin/${id}`, {
        method:'PUT',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    let data = await response.json()
    if(response.ok){
        alert(data.text)
        getProducts()
    }else{
        alert('ERROR')
    }
}

function drawList(arr) {
    list.innerHTML = ''
    arr.forEach(element => {
        let productItem = document.createElement('li')
        productItem.innerHTML = `
               <p class="product_name product-item">${element.product_name}</p>
               <p class="product_description product-item">${element.product_description}</p>
               <p class="product_price product-item">${element.product_price}</p>
               <button class="deleteProduct">DELETE</button>
               <button class="editProduct">EDIT</button>
               <form data-form="false" class="editForm">
                 <input type="text" name="product_name" placeholder="product_name" />
                 <input type="text" name="product_description" placeholder="product_description" />
                 <input type="text" name="product_price" placeholder="product_price" />
                 <button>SAVE</button>
               </form>
        ` 
        productItem.querySelector('.editForm').style.display = 'none'
        productItem.querySelector('.deleteProduct').addEventListener('click', () => deleteProduct(element.id))
        productItem.querySelector('.editProduct').addEventListener('click', () => editProduct(productItem, element))
        productItem.querySelector('.editForm').addEventListener('submit', (ev) => saveProduct(ev, element.id))


        list.appendChild(productItem)
    });
}

async function getProducts() {
    let response = await fetch('http://localhost:5000/goods')
    let data = await response.json()
    drawList(data)
}

getProducts()

document.getElementById('addForm').addEventListener('submit', async (ev) => {
    ev.preventDefault()
    let formData = Object.fromEntries([...new FormData(ev.target)])

    let response = await fetch('http://localhost:5000/add-admin', {
        method:'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    let data = await response.json()
    if(response.ok){
        alert(data.text)
        getProducts()
    }else{
        alert('ERROR')
    }
})