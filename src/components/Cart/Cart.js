import { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [form, setForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const mealsFormHandler = () => {
    setForm(true);
  };
  const submitOrderHandler = async (userData) => {
    setLoading(true);

    await fetch(
      "https://react-http-94d4d-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          items: cartCtx.items,
        }),
      }
    );
    setLoading(false);
    setSuccess(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const buttonDisplay = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={mealsFormHandler}>
          Order
        </button>
      )}
    </div>
  );
  const cartContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {form && (
        <Checkout onCancel={props.onClose} onSubmit={submitOrderHandler} />
      )}
      {!form && buttonDisplay}
    </>
  );
  const sendingData = <p>Sending order data...</p>;
  const submitData = (
    <>
      <p>Successfully ordered</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose} >
          Close
        </button>
      </div>
    </>
  );
  return (
    <Modal onClose={props.onClose}>
      {!loading && !success && cartContent}
      {loading && !success && sendingData}
      {!loading && success && submitData}
    </Modal>
  );
};

export default Cart;
