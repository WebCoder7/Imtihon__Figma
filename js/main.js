const wrapper = document.querySelector('.wrapper')
const loading = document.querySelector('.loading')
const API_URL = "https://dummyjson.com/products"



async function fetchData(api) {
    let getData = await fetch(api);
    getData
        .json()
        .then(res => {
            console.log(res); // Log the response to see its structure
            createCardd(res);
        })
        .catch(err => console.log(err))
        .finally(() => {
            loading.style.display = "none";
        });
}

fetchData(API_URL)

function createCardd(data) {
    while (wrapper.firstChild) {
        wrapper.firstChild.remove()
    }
    let fragment = document.createDocumentFragment();
    data.products.forEach(product => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <div data-id="${product.id}">
                <div class="main__card">
                    <div class="card__imgDiv">
                        <img name="product-image" class="card__image" src="${product.thumbnail}" alt="">
                        <img name="product-wish" src="./img/main__like.png" alt="" class="card__like">
                    </div>
                    <h5 class="card__title">${product.title}</h5>
                    <p class="card__paragraf">${product.description}</p>
                    <h6 class="card__desc">
                        <span class="span1">${product.price}</span> 
                        <img src="./img/Four Star.svg" alt="" class="card__descImg"> 
                        ${product.rating} 
                    </h6>
                </div>
            </div>
        `
        fragment.appendChild(card);
    });
    wrapper.appendChild(fragment);
}






const singleRoate = (id) => {
    window.open(`/pages/product.html?id=${id}`, "_self")
}

const setWish = async (id) => {

    let getData = await fetch(`${API_URL}/${id}`)
    getData
        .json()
        .then(res => {
            let wishes = JSON.parse(localStorage.getItem("wishes")) || []
            let index = wishes.findIndex(el => el.id === +id)
            if (index < 0) {
                localStorage.setItem("wishes", JSON.stringify([...wishes, res]))
                console.log(index);
            }
        })
        .catch(err => {
            console.log(err)
        })
}



wrapper.addEventListener("click", (e => {
    let { name } = e.target
    if (name === "product-image") {
        let id = e.target.closest("[data-id]").dataset.id
        singleRoate(id);
    } else if (name === "product-wish") {
        let id = e.target.closest("[data-id]").dataset.id
        setWish(id)
    }
}))



























// ============= Navbar toggle START ================
// const navbarCollection = document.querySelector(".navbar__collection")
// const navbarMenu = document.querySelector(".navbar__menu")

// navbarMenu.addEventListener("click", () => {
//     navbarCollection.classList.toggle('show')
// })
// ============= Navbar toggle END ================
