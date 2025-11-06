import React, { useEffect, useState } from 'react'
import instance from "../config/axiosConfig";
import { useCart } from '../contexts/CartProvider';


function Cart() {
  const {cart}=useCart()
  const[cartItems,setCartItems]=useState([])

  useEffect(()=>{
    getCartProducts(cart)
  },[cart])

  async function getCartProducts() {
    const promises=cart.map((obj)=>{
      return instance.get("/product/product/"+ obj.id)
    })
    let temp=await Promise.all(promises)
    console.log(temp)
    setCartItems(temp.map((obj)=>obj.data))
  }
  console.log(cartItems)
  return (
    <>
   <div className="left">
  {cartItems.map((obj) => (
    <div className="items" key={obj.id}>
      <div className="item-image">
        <img src={obj.image} alt={obj.name} />
      </div>
      <div className="item-name">
        <h3>{obj.name}</h3>
        <p>₹{obj.price}</p>
      </div>
    </div>
  ))}
</div>
   <div className='right'></div>
   </>
  )
}

export default Cart