const categoryContainer = document.getElementById('category-container');
const middleTree = document.getElementById("middle-tree");
const cartTree = document.getElementById("right-tree");
const cartAllPrice = document.getElementById("cartAllPrice");

let yourCarts = [];

// --- Data Fetching ---
const loadAllTree = () => {
    showLoading();
    fetch("https://openapi.programming-hero.com/api/plants")
        .then(res => res.json())
        .then(data => displayPlant(data.plants))
        .catch(err => console.log(err));
};

const loadCategory = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then(data => {
            showCategory(data.categories);
        })
        .catch(error => console.log(error));
};

// --- UI Rendering ---
const showCategory = (categories) => {
    categoryContainer.innerHTML = ''; // Clear loading text if any
    
    categories.forEach(cat => {
        // Modern sidebar button design
        categoryContainer.innerHTML += `
        <li class="mb-2 list-none">
            <button 
                onclick="loadPlantByCat(${cat.id}, this)" 
                class="category-btn w-full text-left px-4 py-2.5 text-sm font-medium text-slate-600 bg-slate-50 hover:bg-emerald-500 hover:text-white rounded-xl transition-all duration-200 border border-transparent hover:border-emerald-600 cursor-pointer">
                ${cat.category_name}
            </button>
        </li>`;
    });
};

const loadPlantByCat = (plantId, btnElement) => {
    // 1. Remove active styles from all buttons
    const allBtns = document.querySelectorAll('.category-btn');
    allBtns.forEach(btn => {
        btn.classList.remove('bg-emerald-500', 'text-white', 'shadow-md');
        btn.classList.add('bg-slate-50', 'text-slate-600');
    });
    
    // 2. Add active styles to the clicked button
    if (btnElement) {
        btnElement.classList.remove('bg-slate-50', 'text-slate-600');
        btnElement.classList.add('bg-emerald-500', 'text-white', 'shadow-md');
    }

    showLoading();
    const url = `https://openapi.programming-hero.com/api/category/${plantId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPlant(data.plants))
        .catch(err => console.log(err));
};

const displayPlant = (trees) => {
    middleTree.innerHTML = '';
    
    if (!trees || trees.length === 0) {
        middleTree.innerHTML = `<div class="col-span-full text-center text-slate-500 py-10">No plants found.</div>`;
        return;
    }

    trees.forEach(tree => {
        const card = document.createElement("div");
        card.className = "group h-full"; 
        
        // Using data-* attributes in the button for safer Cart data handling
        card.innerHTML = `
          <div class="h-full flex flex-col justify-between bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div>
              <div class="relative overflow-hidden rounded-xl mb-4 bg-slate-100 cursor-pointer" onclick="loadPlantDetail(${tree.id})">
                <img src="${tree.image}" alt="${tree.name}" class="w-full h-[210px] object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                <span class="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                  ${tree.category}
                </span>
              </div>
              <h4 onclick="loadPlantDetail(${tree.id})" class="font-bold text-lg text-slate-800 hover:text-emerald-700 transition-colors cursor-pointer mb-2 line-clamp-1">
                ${tree.name}
              </h4>
              <p class="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4">
                ${tree.description}
              </p>
            </div>
            
            <div class="pt-3 border-t border-slate-50">
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs text-slate-400 font-medium uppercase tracking-wider">Price</span>
                <p class="font-extrabold text-xl text-slate-900">৳<span>${tree.price}</span></p>
              </div>
              
              <button 
                data-id="${tree.id}" 
                data-title="${tree.name}" 
                data-price="${tree.price}"
                class="add-to-cart-btn w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 group/btn cursor-pointer">
                <i class="fa-solid fa-basket-shopping transition-transform group-hover/btn:-translate-y-0.5"></i>
                <span>Add to Cart</span>
              </button>
            </div>
          </div>`;
          
        middleTree.append(card);
    });
};

// --- Cart Logic ---
middleTree.addEventListener("click", (e) => {
    // .closest() makes sure the click works even if they click the SVG icon inside the button
    const btn = e.target.closest('.add-to-cart-btn');
    if (btn) {
        handleCarts(btn);
    }
});

const handleCarts = (btn) => {
    // Pull data safely from the button's data attributes
    const cartId = btn.dataset.id;
    const cartTitle = btn.dataset.title;
    const plantPrice = parseFloat(String(btn.dataset.price).replace(/[^0-9.]/g, '')) || 0; 
    
    // Check if item is already in the cart
    const existingItem = yourCarts.find(item => item.cartId === cartId);
    if (existingItem) {
        alert(`${cartTitle} is already in your cart!`);
        return;
    }

    yourCarts.push({ cartId, cartTitle, plantPrice });
    showCartItem(yourCarts);
};

const showCartItem = (yourCarts) => {
    cartTree.innerHTML = "";
    let totalPrice = 0;

    if (yourCarts.length === 0) {
        cartTree.innerHTML = `<p class="text-slate-400 text-sm text-center py-8">Your cart is empty</p>`;
    }

    yourCarts.forEach(yourCart => {
        totalPrice += yourCart.plantPrice; 
        
        // Modern UI for Cart Items
        cartTree.innerHTML += `
        <div class="flex justify-between items-center bg-slate-50 p-3 rounded-xl mb-3 border border-slate-100 shadow-sm group">
            <div>
                <h2 class="font-bold text-sm text-slate-800 line-clamp-1">${yourCart.cartTitle}</h2>
                <p class="font-semibold text-emerald-700 text-sm">৳ ${yourCart.plantPrice}</p>
            </div>
            <button onclick="handleCartItem('${yourCart.cartId}')" class="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer">
                <i class="fa-solid fa-trash text-xs"></i>
            </button>
        </div>`;
    });
    
    cartAllPrice.innerText = totalPrice.toFixed(2);
};

const handleCartItem = (itemId) => {
    yourCarts = yourCarts.filter(yourCart => yourCart.cartId !== itemId);
    showCartItem(yourCarts);
};

// --- Modal Logic ---
const loadPlantDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayTreeDetails(details.plants);
};

const displayTreeDetails = (tree) => {
    const modalBox = document.getElementById("modalName");
    
    // Modernized Modal UI
    modalBox.innerHTML = `
        <div class="relative">
            <img src="${tree.image}" alt="${tree.name}" class="w-full h-64 object-cover" />
            <div class="absolute top-4 right-4 bg-white/90 backdrop-blur text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full shadow">
                ${tree.category}
            </div>
        </div>
        <div class="p-6 md:p-8">
            <div class="flex justify-between items-start mb-4">
                <h4 class="font-extrabold text-2xl text-slate-900">${tree.name}</h4>
                <p class="font-black text-xl text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg">৳ ${tree.price}</p>
            </div>
            <div class="mb-6">
                <h5 class="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Description</h5>
                <p class="text-slate-600 leading-relaxed text-sm">${tree.description}</p>
            </div>
            <div class="modal-action mt-0">
                <form method="dialog" class="w-full">
                    <button class="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer">
                        Close Details
                    </button>
                </form>
            </div>
        </div>
    `;
    document.getElementById("modalTree").showModal();
};

// --- Utilities ---
const showLoading = () => {
    middleTree.innerHTML = `
    <div class="col-span-full flex justify-center items-center py-20">
        <span class="loading loading-spinner loading-lg text-emerald-500"></span>
    </div>`;
};

// Initialize App
loadAllTree();
loadCategory();