import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);


  useEffect(() => {
    console.log('productA API called');
    fetch('products.JSON')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        console.log('Products received ');

      })
  }, [])

  useEffect(() => {
    console.log('Local Storage Called ');
    if (products.length) {
      const savedCart = getStoredCart();
      const storedCart = [];
      // console.log(savedCart);
      for (const key in savedCart) {
        // console.log(key);
        // console.log(products);
        const addedProduct = products.find(product => product.key === key);

        // console.log(key, addedProduct);
        if (addedProduct){
          const quantity = savedCart[key];
          addedProduct.quantity = quantity;
          // console.log(addedProduct);
          
          storedCart.push(addedProduct)
        }
       
      }
      setCart(storedCart);
    }

  }, [products])

  const handleAddToCart = (product) => {
    // console.log(product.name);
    // console.log('clicked');
    const newCart = [...cart, product];
    setCart(newCart);
    // console.log(product);
    // save to local storage (for now)
    addToDb(product.key);

  }


  return (
    <div className="shop-container">
      <div className="product-container">
        {/* <h3>Products: {products.length} </h3> */}
        {
          products.map(product => <Product
            key={product.key}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>)
        }
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;