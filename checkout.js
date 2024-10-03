import {cart, removeFromCart, updateDeliveryOption} from './cart.js';
import {products} from './product.js';
import { formatCurrency } from './utilities/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryoptions} from './deliveryoption.js';

const today = dayjs();
const deliverydate = today.add(7, 'days');
const dddd = deliverydate.format('dddd, MMMM D');
console.log(dddd);
let cartSummaryHtml = '';

cart.forEach((cartItem) => {

    const productId = cartItem.productId;
    let matchingProduct;

products.forEach((product) => {
if (product.Id === productId) {
    matchingProduct = product;
}

});

const deliveryOptionId = cartItem.deliveryOptionId;

let deliveryOption;

deliveryoptions.forEach((option) => {
  if (option.id === deliveryOptionId) {
    deliveryOption = option;
  } 
});

const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString =  deliveryDate.format('dddd, MMMM D');

cartSummaryHtml +=
`<div class="cart-item-container js-cart-item-container-${matchingProduct.Id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCent)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link js-delete-link link-primary" data-product-Id="${matchingProduct.Id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryoptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>`

});

function deliveryoptionsHTML(matchingProduct, cartItem) {
  let html = '';
  deliveryoptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString =  deliveryDate.format('dddd, MMMM D');

    const priceString = deliveryOption.priceCent === 0
    ? 'FREE -'
    :`$${formatCurrency(deliveryOption.priceCent)} -`;

    const isChecked = deliveryoptions.id === cartItem.deliveryOptionId;

    html +=

      `<div class="delivery-option js-delivery-option" 
      data-product-Id= "${matchingProduct.Id}"
      data-delivery-product-id= "${deliveryoptions.id}">
      <input type="radio" 
      ${isChecked ? 'checked' : ''}
      class="delivery-option-input"
        name="delivery-option-${matchingProduct.Id}">
      <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
        <div class="delivery-option-price">
         ${priceString} Shipping
        </div>
      </div>
    </div>`
  });
  return html;
};


document.querySelector('.js-order-summary')
.innerHTML = cartSummaryHtml;

document.querySelectorAll('.js-delete-link')
.forEach(
  (link) => {
    link.addEventListener('click',() => {
      const productId = link.dataset.productId;
      console.log(productId);
      removeFromCart(productId);
      console.log(cart);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
    });

  });

  document.querySelectorAll('.js-delivery-options')
  .forEach((element)=> {
    element.addEventListener('click', () => {
      const {productId,deliveryOptionid} = element.dataset;
    updateDeliveryOption(productId,deliveryOptionid);

    });
  });