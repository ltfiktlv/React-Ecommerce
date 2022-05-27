import React, { useEffect } from "react";
import "./CartScreen.css";
const Cart = ({ cart, handleChange, handleRemove, handlePrice, price }) => {
  useEffect(() => {
    handlePrice();
  });

  return (
    <article>
      {cart.map((item) => (
        <div className="cart_box" key={item.id}>
          <div className="cart_img">
            <img src={item.image} alt="" />
            <p>{item.name}</p>
          </div>
          <div>
            <button onClick={() => handleChange(item, 1)}>+</button>
            <button>{item.defaultCartStock}</button>
            <button onClick={() => handleChange(item, -1)}>-</button>
          </div>
          <div>
            <span>{item.price}</span>
            <button onClick={() => handleRemove(item._id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="total">
        <span>Total Price - {price}₺</span>
      </div>
    </article>
  );
};

export default Cart;
