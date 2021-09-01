import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartDisplay, setCartDisplay]=useState(false);

  const showCartHandler=props=>{
   setCartDisplay(true);
  };

  const hideCartHandler=props=>{
    setCartDisplay(false);
  };
  return (
    <CartProvider>
    {cartDisplay && <Cart onClose={hideCartHandler}/>}
    
      <Header onClick={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>  
  );
}

export default App;
