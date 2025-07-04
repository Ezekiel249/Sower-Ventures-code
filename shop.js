import {cart ,addToCart} from './cart.js';
import {products} from './product.js';
import { formatCurrency } from './utilities/money.js';

let productHTML ='';


products.forEach((product) => {
    productHTML +=`
    
<div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <div class="product-rating-stars">
            <img src="images/Rating/rating-${product.rating.stars * 10}.png">
          </div> 
            
            
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${formatCurrency(product.priceCent)}
        </div>

        <div class="product-quantity-container">
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button
         button-primary js-add-to-cart" data-product-ID= "${product.Id}">
          Add to Cart
        </button>
      </div>

    `;
})




document.querySelector('.js-product-grid')
.innerHTML = productHTML;

function updateCartQuantity() {
  let cartQuantity = 0;
cart.forEach((item) =>{
  cartQuantity += item.quantity;
});
console.log(cartQuantity)

document.querySelector('.js-cart-quantity')
.innerHTML = cartQuantity;

console.log (cart)
}



document.querySelectorAll('.js-add-to-cart')
   .forEach((button) => {
 button.addEventListener('click',() => {
 const productId = button.dataset.productId;
 addToCart(productId);
 updateCartQuantity();

})
 });
   