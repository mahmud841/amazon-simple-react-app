import React from 'react';
import './Cart.css';

const Cart = (props) => {
  // console.log(props.cart);
  const {cart} = props;
  const total = cart.reduce((previous, product )=> previous + product.price, 0 );
 /*  let total = 0;
  for (const product of cart) {
    total = total + product.price;
  } */
  

  const shipping = 15;
  const tax = (total + shipping) * 10; 
  const grandTotal = (total + shipping + tax);
  return (
    <div className="order-product">
        <h3>  Order Summary</h3>
        <h3>Items ordered: {props.cart.length}</h3>
        {/* <h5>Items Ordered: {cart.length} </h5> */}
        <br />
        <p>Total:{total.toFixed(3)} </p>
        <p>Shipping:{shipping} </p>
        <p>Tax:{tax.toFixed(3)} </p>
        <p>Grand Total: {grandTotal.toFixed(3)} </p>
    </div>
  );
};

export default Cart;