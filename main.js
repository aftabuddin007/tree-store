const categoryContainer = document.getElementById('category-container');
 const middleTree = document.getElementById("middle-tree");

const loadAllTree = ()=>{
    fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(data =>{
    displayPlant(data.plants)

    })
}
const loadCategory = ()=>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => {
const categories = data.categories;
//console.log(categories)
showCategory(categories);

})
    .catch(error => console.log(error));
};
loadCategory();
const showCategory = (categories)=>{
 categoryContainer.innerHTML += `
    <li data id="all" class="text-[gray] text-[12px]
     font-semibold bg-[#F0FDF4] hover:bg-[green] 
    hover:text-[white] mb-1 p-2 rounded-lg cursor-pointer border-1">
      All
    </li>
  `;
    categories.forEach(cat => {
       
    categoryContainer.innerHTML += `<li onClick = "loadPlantByCat(${cat.id})"><button  class="  text-[gray]
     font-semibold bg-[#F0FDF4] hover:bg-[green] text-[12px]
    hover:text-[white] mb-1 p-2 rounded-lg cursor-pointer border-1 w-full">${cat.category_name}</button></li>`;
});
    categoryContainer.addEventListener('click',(e)=>{
        const allBtn = document.querySelectorAll("button")
        allBtn.forEach(button => {
            button.classList.remove("bg-green-600", "text-white")
        });
        if(e.target.localName === 'button'){
           // console.log(e.target.id);
            e.target.classList.add("bg-green-600", "text-white")
           // loadPlantByCat(e.target.id)
        }
    });


};
const loadPlantByCat = (plantId)=>{

    const url = `https://openapi.programming-hero.com/api/category/${plantId}`;
        console.log(url)
    fetch(url)
    .then (res =>res.json())
    .then(data =>{
        displayPlant(data.plants)
    })
    .catch (err =>{
        console.log(err)
    })
} 
const displayPlant = (trees)=>{
   
    middleTree.innerHTML = ''
    trees.forEach(tree =>{
        //console.log(tree);
        const card = document.createElement("div")
        card.innerHTML=`<div id="${tree.id}" class="tree-card p-4 rounded-lg bg-[#ffffff]  w-full shadow-lg">
      <img src="${tree.image}" alt="" class="w-full h-[200px] object-cover mb-2 rounded-lg" />
      <h4 class="font-bold text-[1.5rem]">${tree.name}</h4>
      <p class = 'overflow-hidden  line-clamp-3'>${tree.description}</p>
      <div class="flex justify-between items-center my-2">
        <div>
        <p class="text-[1rem] text-[#15803D] p-2 bg-[#DCFCE7] rounded-lg">${tree.category}</p>
        </div>
        <div>
        <p class="font-bold">৳<span>${tree.price}</span></p>
        </div>

        
      </div>
      <button class="rounded-[50px] bg-[#15803D] text-[#ffffff] p-2 cursor-pointer w-full">Add to Cart</button>
    </div>`
        middleTree.append(card)
    })
}

loadAllTree()
const cartTree = document.getElementById("right-tree");
let yourCarts = [];
middleTree.addEventListener("click",(e)=>{
    //console.log(e.target.innerText)
    if(e.target.innerText === "Add to Cart"){
        handleCarts(e)
    }
})
const handleCarts = (e)=>{
    //console.log("book click")

        const cartTitle = e.target.parentNode.children[1].innerText;
        //console.log(cartTitle)
        const cartId = e.target.parentNode.id
        //console.log(cartId)
        const teePrice = e.target.parentNode.children[3].innerText
        //console.log(teePrice)
        yourCarts.push({
            cartId :cartId ,
            cartTitle:cartTitle,
            teePrice:teePrice

        })
        showCartItem(yourCarts)
}
const showCartItem = (yourCarts)=>{
    cartTree.innerHTML = "";
    yourCarts.forEach(yourCart =>{
        cartTree.innerHTML += `
        <div class="flex justify-between mb-3 items-center bg-green-200 px-4">
      <div>
        <h2>${yourCart.cartTitle}</h2>
        <p><span>${yourCart.teePrice}</span>* 1</p>
      </div>
      <p onclick = "handleCartItem('${yourCart.cartId}')"><i class="fa-solid fa-trash-can"></i></p>
    </div>
    
        `
    })
}
const handleCartItem = (itemId) => {
    const filterCartId = yourCarts.filter(yourCart => yourCart.cartId !== itemId)
    yourCarts = filterCartId
    showCartItem(yourCarts)
}
 
