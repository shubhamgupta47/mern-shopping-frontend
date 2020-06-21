import React, { useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";
import { emptyCart } from "./helper/cartHelper";

const StripeCheckoutWrapper = ({ products, setReload, reload }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const { user, token } = isAuthenticated();

  const getFinalPrice = () => {
    return products.reduce(
      (accumulator, currentVal) => accumulator + currentVal.price,
      0
    );
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripe-payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        emptyCart();
        //call further methods
        // createOrder();
      })
      .catch((err) => console.log(err));
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckout
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
        token={makePayment}
        amount={getFinalPrice() * 100}
        name="Buy Tshirts"
        currency="INR"
        // shippingAddress
        // billingAddress
      >
        <button className="btn btn-success">Pay with Stripe</button>
      </StripeCheckout>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white">Stripe Checkout {getFinalPrice()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckoutWrapper;
