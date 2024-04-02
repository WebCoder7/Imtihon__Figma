const wrapper = document.querySelector('.wrapper')
let wishes = JSON.parse(localStorage.getItem("wishes"))
console.log(wishes);



function createCardd(data) {
    while(wrapper.firstChild){
        wrapper.firstChild.remove()
    }
    let fragment = document.createDocumentFragment();
    data.forEach(product => {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <div data-id="${product.id}">
                <div class="main__card">
                    <div class="card__imgDiv">
                        <img name="product-image" class="card__image" src="${product.thumbnail}" alt="">
                        <img name="product-wish" src="../img/main__like.png" alt="" class="card__like">
                    </div>
                    <h5 class="card__title">${product.title}</h5>
                    <p class="card__paragraf">${product.description}</p>
                    <h6 class="card__desc">
                        <span class="span1">${product.price}</span> 
                        <img src="../img/Four Star.svg" alt="" class="card__descImg"> 
                        ${product.rating} 
                    </h6>
                </div>
            </div>
        `
        fragment.appendChild(card);
    });
    wrapper.appendChild(fragment);
}


createCardd(wishes)

const removeWishes = (id)=>{
    // let neWishes = JSON.parse(localStorage.getItem("wishes"))
    let filterData = wishes.filter(el => el.id !== +id)
    localStorage.setItem("wishes", JSON.stringify(filterData))

    createCardd(filterData)
    window.location.reload()
}

wrapper.addEventListener("click", (e)=>{
    if(e.target.name === "product-wish"){
        let id = e.target.closest("[data-id]").dataset.id 
        removeWishes(id)
        console.log();
    }

}) 