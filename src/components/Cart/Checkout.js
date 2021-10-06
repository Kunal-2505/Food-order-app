import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    pin: true,
    city: true,
  });

  const empty = (value) => value.trim() === "";
  const lengthCheck = (value) => value.trim().length !== 6;

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInput.current.value;
    const enteredStreet = streetInput.current.value;
    const enteredPin = pinInput.current.value;
    const enteredCity = cityInput.current.value;

    const validName = !empty(enteredName);
    const validStreet = !empty(enteredStreet);
    const validPin = !lengthCheck(enteredPin);
    const validCity = !empty(enteredCity);
    setFormValidity({
      name: validName,
      street: validStreet,
      pin: validPin,
      city: validCity,
    });

    const validForm = validName && validStreet && validPin && validCity;

    if (!validForm) {
      return;
    }

    props.onSubmit({
      name: validName,
      street: validStreet,
      pin: validPin,
      city: validCity,
    });

    nameInput.current.value = "";
    streetInput.current.value = "";
    pinInput.current.value = "";
    cityInput.current.value = "";

    return;
  };

  const nameInput = useRef();
  const streetInput = useRef();
  const pinInput = useRef();
  const cityInput = useRef();
 
  //const[focus,setFocus]=useState("");

  return (
    <form
      className={`${classes.control} ${
        formValidity.name ? "" : classes.invalid
      } `}
      onSubmit={confirmHandler}
    >
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInput} />
        {!formValidity.name && <p className={classes.error}>Invalid Name</p>}
      </div>
      <div
        className={`${classes.control} ${
          formValidity.street ? "" : classes.invalid
        } `}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInput} />
        {!formValidity.street && (
          <p className={classes.error}>Invalid Street</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          formValidity.pin ? "" : classes.invalid
        } `}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={pinInput} />
        {!formValidity.pin && <p className={classes.error}>Invalid Pin</p>}
      </div>
      <div
        className={`${classes.control} ${
          formValidity.city ? "" : classes.invalid
        } `}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInput} />
        {!formValidity.city && <p className={classes.error}>Invalid City</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
