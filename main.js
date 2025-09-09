const categoryContainer = document.getElementById('category-container');

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
    <li data id="all" class="text-[gray]
     font-semibold bg-[#F0FDF4] hover:bg-[green] 
    hover:text-[white] mb-1 p-2 rounded-lg cursor-pointer">
      All
    </li>
  `;
    categories.forEach(cat => {
       
    categoryContainer.innerHTML += `<li onClick = "loadPlantByCat(${cat.id})"><button  class="  text-[gray]
     font-semibold bg-[#F0FDF4] hover:bg-[green] 
    hover:text-[white] mb-1 p-2 rounded-lg cursor-pointer">${cat.category_name}</button></li>`;
});
    categoryContainer.addEventListener('click',(e)=>{
        const allBtn = document.querySelectorAll("button")
        allBtn.forEach(button => {
            button.classList.remove('bg-[green]')
        });
        if(e.target.localName === 'button'){
           // console.log(e.target.id);
            e.target.classList.add('bg-[green]')
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
    const middleTree = document.getElementById("middle-tree");
    middleTree.innerHTML = ''
    trees.forEach(tree =>{
        console.log(tree);
        const card = document.createElement("div")
        card.innerHTML=`<div class="tree-card p-3 rounded-lg bg-[#ffffff] ">
      <img src="${tree.image}" alt="" class="w-full h-[350px] object-cover mb-2 rounded-lg" />
      <h4 class="font-bold text-[1.5rem]">${tree.name}</h4>
      <p>${tree.description}</p>
      <div class="flex justify-between items-center my-2">
        <p class="text-[1rem] text-[#15803D] p-2 bg-[#DCFCE7] rounded-lg">${tree.category}</p>
        <p class="font-bold">৳<span>${tree.price}</span></p>
      </div>
      <button class="rounded-[50px] bg-[#15803D] text-[#ffffff] p-2 cursor-pointer w-full">Add to Cart</button>
    </div>`
        middleTree.append(card)
    })
}
