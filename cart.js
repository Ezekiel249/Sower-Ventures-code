export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = 
  [{
    productId:'erfghjyrtsfdghjy',
    quantity: 1,
    deliveryOptionId: '1',
  },
  {
    productId:'mjhgfdcxdertghuytf',
    quantity: 2,
    deliveryOptionId: '2',
  }
  ];
}





function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
}


export function addToCart(productId) {
    let matchingitem;
  
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingitem = cartItem;
    }
  });
  
  if (matchingitem) {
    matchingitem.quantity += 1
  }else{
    cart.push({
      productId: productId,
      quantity: 1, 
      deliveryOptionId: '1',
      });
  }
  saveToStorage();
  }




  export function removeFromCart(productId) {
    const newCart = [];
     cart.forEach((cartItem) => {
if (cartItem.productId !== productId) {
  newCart.push(cartItem);
}
     });
     cart = newCart;
     saveToStorage();
  };
  
  export  function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingitem;

    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingitem = cartItem;
      }
    });

    matchingitem.deliveryOptionId = deliveryOptionId;
     
    saveToStorage();
  }