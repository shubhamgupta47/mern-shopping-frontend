import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
// import StripeCheckoutWrapper from "./StripeCheckout";  // Un-comment if using Stripe payment method
import { Link } from "react-router-dom";
import BraintreePayment from "./BraintreePayment";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    loadCart() ? setProducts(loadCart()) : setProducts([]);
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2>This section is to load product</h2>
        {products.map((product, index) => {
          return (
            <Card
              product={product}
              key={index}
              removeFromCart
              addToCart={false}
              reload={reload}
              setReload={setReload}
            />
          );
        })}
      </div>
    );
  };

  // const loadCheckout = () => {
  //   return (
  //     <div>
  //       <h2>This section is for checkout</h2>
  //     </div>
  //   );
  // };

  return (
    <Base title="Cart Page" description="Items in your cart">
      <div className="row text-center">
        {!!products.length ? (
          <>
            <div className="col-6">{loadAllProducts(products)}</div>
            <div className="col-6">
              {/* Component for adding web drop-ins of different payment methods */}

              {/* Using Braintree (PayPal) */}
              <BraintreePayment
                products={products}
                setReload={setReload}
                reload={reload}
              />
              {/* 
                ***Using Stripe ***

                <StripeCheckoutWrapper
                  products={products}
                  setReload={setReload}
                  reload={reload}
                /> 
              */}
            </div>
          </>
        ) : (
          <p className="col-12">
            Your cart is empty. You can add some cool products from{" "}
            <Link to="/">here</Link>.
          </p>
        )}
      </div>
    </Base>
  );
};

export default Cart;
