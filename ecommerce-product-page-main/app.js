// variables
const menu = document.querySelector(".menu");
const menuOpen = document.querySelector(".open");
const menuClose = document.querySelector(".close");

const cart = document.querySelector(".cart");
const cartBtn = document.querySelector(".cart-btn");

const btnPlus = document.querySelector("#addBtn");
const btnMinus = document.querySelector("#minusBtn");
const productCounter = document.querySelector(".counter");

const gallery = document.querySelectorAll('.pic');
const heroImg = document.querySelector('.product-hero');

const btnPrev = document.querySelector('.prev');
const btnNext = document.querySelector('.next');

const addToCartBtn = document.querySelector('.btn');
const cartCount = document.querySelector('.cart-count');
const productInShoppingCart = document.querySelector('.cart-item');

const msgEmpty = document.querySelector('.msg-empty');
const checkoutBtn = document.querySelector('.checkout');

const overlay = document.querySelector('.overlay');
const displayBox = document.querySelector('.display-box')

// event listener ;
cartBtn.addEventListener('click', toggleCart);

menuOpen.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);

btnPlus.addEventListener('click', addProduct);
btnMinus.addEventListener('click', removeProduct);

btnPrev.addEventListener('click', btnClickPrev);
btnNext.addEventListener('click', btnClickNext);

gallery.forEach(function(img){
    img.addEventListener('click', function(e){
        gallery.forEach(function(img){
            img.classList.remove('active');
        });
        let event = e.currentTarget
        event.classList.add('active');

        heroImg.src = event.childNodes[1].src.replace('-thumbnail', '');
    });
});

addToCartBtn.addEventListener('click', addToCart);

heroImg.addEventListener('click', heroImgClick);

let displayBoxGallery;
let displayBoxHero;

// functions
let valueCounter = 1; 
let productInCart = 0;
let  price = 250.0;
let discount = 0.5;

function openMenu(){
    menu.classList.remove('hidden');
}
function closeMenu(){
    menu.classList.add('hidden');
}
function toggleCart(){
    cart.classList.toggle('hidden');
}
function  addProduct(){
    setProductCounter(1);
}
function  removeProduct(){
    setProductCounter(-1);
}
function setProductCounter(value){
    if((valueCounter + value) > 0){
        valueCounter += value;
        productCounter.innerHTML = valueCounter;
    }
}
function btnClickNext(){
    let imageIndex = getCurrentImgIndex();
    imageIndex++;
    if(imageIndex > 4){
        imageIndex = 1
    }
    setHeroImg(imageIndex);
}
function btnClickPrev(){
    let imageIndex = getCurrentImgIndex();
    imageIndex--
    if(imageIndex < 1){
        imageIndex = 4
    }
    setHeroImg(imageIndex);
}
function getCurrentImgIndex(){
    const imageIndex = parseInt(heroImg.src.split('//').pop().split('/').pop().replace('.jpg', '').replace('image-product-',''));
    return imageIndex;
}
function setHeroImg(imageIndex){
    heroImg.src = `image-product-${imageIndex}.jpg`
    gallery.forEach(function(img){
        img.classList.remove('active');
    });
    gallery[imageIndex-1].classList.add('active');
}
function addToCart(){
    productInCart = valueCounter
    const productHTMLElelment = `
        <div class="item">
            <img class="product-img" src="image-product-1.jpg" alt="">
            <div class="details">
                <div  class="title">Autumn Limited Edition...</div>
                <div class="price-container">
                <div class="price">$${(price*discount).toFixed(2)}</div>
                x
                <div class="count">${productInCart}</div>
                <div class="total-amount">$${(price*discount*productInCart).toFixed(2)}</div>
            </div>
            </div>
            <img id="deleteBtn" src="icon-delete.svg" alt="">
        </div>`

  productInShoppingCart.innerHTML = productHTMLElelment; 

    updateCart();

    const deleteBtn = document.querySelector('#deleteBtn');
    deleteBtn.addEventListener('click', deleteBtnClick)
}
function updateCart(){
    updateCartIcon();
    updateMsgEmpty();
    updateCheckoutBtn();
}
function updateCartIcon(){
    cartCount.textContent = productInCart
    if(productInCart == 0){
        if(!cartCount.classList.contains('hidden')){
            cartCount.classList.add('hidden');
        }
    }else{
        cartCount.classList.remove('hidden');
    }
}
function updateMsgEmpty(){
    if(productInCart == 0){
        if(msgEmpty.classList.contains('hidden')){
            msgEmpty.classList.remove('hidden');
        }
    }else{
        if(!msgEmpty.classList.contains('hidden')){
            msgEmpty.classList.add('hidden');
        }
    }
}
function updateCheckoutBtn(){
    if(productInCart == 0){
        if(!checkoutBtn.classList.contains('hidden')){
            checkoutBtn.classList.add('hidden');
        }
    }else{
        checkoutBtn.classList.remove('hidden');
    }
}
function deleteBtnClick(){
    productInCart --;
    updateCart();
    
    const el = document.querySelector('.count');
    const totalAmount = document.querySelector('.total-amount');
    el.innerHTML = productInCart
    totalAmount.innerHTML = `$${(price*discount*productInCart).toFixed(2)}`

    if(productInCart ==0){
        productInShoppingCart.innerHTML = '';
    }
}
function heroImgClick(){
    if(window.innerWidth >= 1440){
        if(overlay.childElementCount == 1){
            const newNode = displayBox.cloneNode(true);
            overlay.appendChild(newNode); 

            const overlayClose = document.querySelector('#overlay-close');
            overlayClose.addEventListener('click', function(){
                overlay.classList.add('hidden');
            });
            displayBoxGallery = overlay.querySelectorAll('.pic');
            displayBoxHero = overlay.querySelector('.product-hero')
            displayBoxGallery.forEach(function(img){
            img.addEventListener('click', onDisplayBoxClick);
            
        });
        
        const overlayNext = overlay.querySelector('.next');
        const overlayPrev = overlay.querySelector('.prev');
        overlayNext.addEventListener('click',btnClickNextOverlay);
        overlayPrev.addEventListener('click',btnClickPrevOverlay);
        } 
            overlay.classList.remove("hidden");  
    }
}
function onDisplayBoxClick(event){
    displayBoxGallery.forEach(function(img){
        img.classList.remove('active');
    });
    event.target.parentElement.classList.add('active');

    displayBoxHero.src = event.target.src.replace('-thumbnail',"");
}
function btnClickNextOverlay(){
    let imageIndex = getOverlayCurrentImgIndex();
    imageIndex++;
    if(imageIndex > 4){
        imageIndex = 1
    }
    setOverlayHeroImg(imageIndex);
}
function btnClickPrevOverlay(){
    let imageIndex = getOverlayCurrentImgIndex();
    imageIndex--
    if(imageIndex < 1){
        imageIndex = 4
    }
    setOverlayHeroImg(imageIndex);
}
function getOverlayCurrentImgIndex(){
    const imageIndex = parseInt(displayBoxHero.src.split('//').pop().split('/').pop().replace('.jpg', '').replace('image-product-',''));
    return imageIndex;
}
function setOverlayHeroImg(imageIndex){
    displayBoxHero.src = `image-product-${imageIndex}.jpg`
    displayBoxGallery.forEach(function(img){
        img.classList.remove('active');
    });
    displayBoxGallery[imageIndex-1].classList.add('active');
}
