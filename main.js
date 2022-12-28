const shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];
const generateShop = function(){
    return (shop.innerHTML =  shopItems.map((x)=>{

       let{id,name,img,price,desc} = x
       let search = basket.find((x)=> x.id === id) || [];
        return `<div id=product-${id} class="item">
        <img src="${img}" alt="">
        <div class="contents">
            <h2>${name}</h2>
            <p>${desc}</p>
            <h2>$ ${price}</h2>
            <div class="buttons">
                <i class="bi bi-dash-lg" onclick="decrement(${id})"></i>
                <div class="quantity" id=${id}>
                ${search.item === undefined ? 0 : search.item}
                </div>
                <i class="bi bi-plus-lg" onclick="increment(${id})"></i>
            </div>
        </div>
    </div>`
    }).join(" "))
}

generateShop();

const increment = function(id){
    let selectedItems = id
    
    let search = basket.find((x) => 
       x.id === selectedItems.id
    );

    if(search === undefined){
        basket.push({
            id : selectedItems.id,
            item : 1
        })
    }
    else{
        search.item += 1
    }
    localStorage.setItem("data",JSON.stringify(basket))
    console.log(basket);
    update(selectedItems.id);
    
}

const decrement = function(id){
    let selectedItems = id

    let search = basket.find((x) => 
        x.id === selectedItems.id
    )
    if(search === undefined)return;
    else if(search.item == 0)return;
    else{
        search.item -= 1;
    }

    
    console.log(basket)
    update(selectedItems.id);
    basket = basket.filter((x)=>x.item !== 0);

    localStorage.setItem("data",JSON.stringify(basket))
}
let update = function(id){
    let selectedItems = id
    let search = basket.find((x) => x.id === id);
    
    document.getElementById(id).textContent = search.item;
    calculation(selectedItems.id);
}

let calculation = function(){
    document.getElementById("cart-amount").textContent = basket.map((x) => x.item).reduce((x,y)=>x+y,0)
    
}

calculation()

