import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [btnHighlight, setBtnHighlight] = useState(false);
  const cartCtx = useContext(CartContext);
  //console.log(cartCtx.items);
  const cartItemsNumber = cartCtx.items.reduce((curNumber, item) => {
    //console.log(curNumber);
    //console.log(item.amount);
    return curNumber + item.amount;

  }, 0);
  const btnClasses = `${classes.button} ${btnHighlight ? classes.bump : ""} `;
  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }

    setBtnHighlight(true);
    const timer = setTimeout(() => {
      setBtnHighlight(false);
    }, 300);
    return ()=>{
      clearTimeout(timer);
    };
  }, [cartCtx.items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartItemsNumber}</span>
    </button>
  );
};

export default HeaderCartButton;
