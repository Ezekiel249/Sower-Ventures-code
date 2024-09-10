export let cart = [{
  productId:'erfghjyrtsfdghjy',
  quantity: 1,
},
{
  productId:'mjhgfdcxdertghuytf',
  quantity: 2,
}
];


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
      });
  }
  }

  export function removeFromCart(productId) {
    const newCart = [];
     cart.forEach((cartItem) => {
if (cartItem.productId !== productId) {
  newCart.push(cartItem);
}
     });
     cart = newCart;
  };
  