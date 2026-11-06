// CHAI TABELA: edit the settings below with your real business details.
const CAFE_WHATSAPP_NUMBER = "91XXXXXXXXXX"; // Example format: 919876543210 (country code + number, no + or spaces)
const CAFE_MAPS_LINK = ""; // Paste your Google Maps link between the quotes.

const menuItems = [
  {id:1,name:"Classic Cutting Chai",category:"Chai",price:20,desc:"Strong, aromatic and freshly brewed.",image:"https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=700&q=80"},
  {id:2,name:"Masala Chai",category:"Chai",price:30,desc:"A warming blend of tea and Indian spices.",image:"https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&w=700&q=80"},
  {id:3,name:"Kulhad Chai",category:"Chai",price:35,desc:"Traditional chai served in an earthy kulhad.",image:"https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=700&q=80"},
  {id:4,name:"Cappuccino",category:"Coffee",price:90,desc:"Espresso topped with silky steamed milk.",image:"https://images.unsplash.com/photo-1534778101976-628	q16c9d5?auto=format&fit=crop&w=700&q=80".replace("\t","")},
  {id:5,name:"Cold Coffee",category:"Coffee",price:110,desc:"Chilled, creamy and refreshing.",image:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80"},
  {id:6,name:"Veg Sandwich",category:"Snacks",price:80,desc:"Toasted sandwich with fresh vegetables.",image:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80"},
  {id:7,name:"French Fries",category:"Snacks",price:90,desc:"Golden, crispy fries with seasoning.",image:"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80"},
  {id:8,name:"Paneer Burger",category:"Fast Food",price:130,desc:"A flavour-packed paneer burger.",image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80"},
  {id:9,name:"Chocolate Brownie",category:"Desserts",price:100,desc:"Rich chocolate treat for your sweet tooth.",image:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80"}
];
let cart = [];
let activeCategory = "All";
const categories = ["All", ...new Set(menuItems.map(item=>item.category))];

function renderCategories(){
  document.getElementById("categories").innerHTML = categories.map(cat=>`<button class="category-btn ${cat===activeCategory?"active":""}" onclick="setCategory('${cat}')">${cat}</button>`).join("");
}
function setCategory(cat){activeCategory=cat;renderCategories();renderMenu();}
function renderMenu(){
  const list=menuItems.filter(item=>activeCategory==="All"||item.category===activeCategory);
  document.getElementById("menuGrid").innerHTML=list.map(item=>`
    <article class="menu-card"><img src="${item.image}" alt="${item.name}" loading="lazy">
      <div class="menu-card-body"><h3>${item.name}</h3><p>${item.desc}</p>
      <div class="menu-card-foot"><span class="price">₹${item.price}</span><button class="add-btn" onclick="addToCart(${item.id})">+ ADD</button></div></div>
    </article>`).join("");
}
function addToCart(id){const item=menuItems.find(x=>x.id===id);const found=cart.find(x=>x.id===id);if(found)found.qty++;else cart.push({...item,qty:1});renderCart();document.getElementById("cartOverlay").classList.add("open");}
function changeQty(id,delta){const item=cart.find(x=>x.id===id);if(!item)return;item.qty+=delta;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);renderCart();}
function renderCart(){
  const count=cart.reduce((s,x)=>s+x.qty,0),total=cart.reduce((s,x)=>s+x.price*x.qty,0);
  document.getElementById("cartCount").textContent=count;document.getElementById("cartTotal").textContent=`₹${total}`;
  document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>`<div class="cart-line"><div><b>${x.name}</b><small>₹${x.price} each</small></div><div class="qty-controls"><button onclick="changeQty(${x.id},-1)">−</button><b>${x.qty}</b><button onclick="changeQty(${x.id},1)">+</button></div></div>`).join(""):'<p class="empty-cart">Your basket is waiting for something delicious.</p>';
}
function openCart(){document.getElementById("cartOverlay").classList.add("open");}
function closeCart(){document.getElementById("cartOverlay").classList.remove("open");}
function checkout(){
  if(!cart.length){alert("Please add an item to your basket first.");return;}
  if(CAFE_WHATSAPP_NUMBER.includes("X")){alert("Before taking orders, add your cafe WhatsApp number in script.js. Replace 91XXXXXXXXXX with your number.");return;}
  const lines=cart.map(x=>`${x.name} x ${x.qty} = ₹${x.price*x.qty}`).join("\n");
  const total=cart.reduce((s,x)=>s+x.price*x.qty,0);
  const message=`Hello CHAI TABELA! I would like to place an order:\n\n${lines}\n\nTotal: ₹${total}\n\nPlease confirm availability.`;
  window.open(`https://wa.me/${CAFE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,"_blank");
}
document.getElementById("year").textContent=new Date().getFullYear();
renderCategories();renderMenu();renderCart();
