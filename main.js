const categoryContainer = document.getElementById('category-container');

const loadCategory = ()=>{
    fetch("https://openapi.programming-hero.com/api/categories")
.then(res => res.json())
.then(data => {
    console.log(data.categories);
const categories = data.categories;
categories.forEach(cat => {
    categoryContainer.innerHTML += `<li><button class="  text-[gray] font-semibold bg-[#F0FDF4] hover:bg-[green] hover:text-[white] mb-1 p-2 rounded-lg">${cat.category_name}</button></li>`;
});
})
.catch(error => console.log(error));
}

loadCategory();
