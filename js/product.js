const productSingle = document.querySelector(".product__single")
const notFound = document.querySelector(".not__found")

const API_URL = "https://dummyjson.com/products"

async function fetchData(api) {
    let path = new URLSearchParams(window.location.search)
    let id = path.get("id")

    let getData = await fetch(`${api}/${id}`)
    getData
        .json()
        .then(res => {
            console.log(res)
            createSingle(res)
        })
        .catch(err => {
            console.log(err)
            notFound.style.display = "block"
        })
}


fetchData(API_URL)



function createSingle(data) {
    productSingle.innerHTML = `
        <div class="col-6">
        <img class="product__singleImg" src=${data.thumbnail} alt="">
    </div>
    <div class="col-6">
        <div class="product__singleTexts">
            <h1>${data.title}</h1>
            <p> <img src="../img/Four Star.svg" alt="">    <span>(${data.discountPercentage} Reviews)</span> <span style="color: aqua;">In Stock</span>  </p>
            <h4>${data.price}</h4>
            <p class="product__about">${data.description}</p>
            <hr>
            <img src="../img/Frame 911.svg" alt="" class="frame">
        </div>
    </div>
    

    `
}

