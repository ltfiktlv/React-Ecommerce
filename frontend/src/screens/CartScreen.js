import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./CartScreen.css";
const Cart = ({
  cart,
  handleChange,
  handleRemove,
  handlePrice,
  price,
  quantity,
}) => {
  useEffect(() => {
    handlePrice();
  });

  return (
    <article>
      {cart.length === 0 && <div>Shopping cart is empty.</div>}
      {cart.map((item, index) => (
        <div className="cart_box" key={index}>
          <Link to={`/product/${item._id}`} style={{ textDecoration: "none" }}>
            <div className="cart_img">
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
            </div>
          </Link>
          <div>
            <button onClick={() => handleChange(item, 1)}>+</button>
            <button>
              {item.defaultCartStock >= item.countInStock
                ? item.countInStock
                : item.defaultCartStock}
            </button>
            <button onClick={() => handleChange(item, -1)}>-</button>
          </div>
          <div>
            <span>{item.price}₺</span>
            <button onClick={() => handleRemove(item._id)}>
              <i class="fa fa-trash" aria-hidden="true"></i>Remove
            </button>
          </div>
        </div>
      ))}
      <div className="total">
        <span>
          Total({quantity} Items): {price}₺
        </span>
      </div>
      <Link to="/">
        <Button variant="secondary my-3 mx-4" type="button">
          Continue to Shopping
        </Button>
      </Link>
    </article>
  );
};

export default Cart;
