import React, { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";
import { emptyCart } from "./helper/cartHelper"; //loadCart
// import { Link } from "react-router-dom";
import { getPaymentToken, processPayment } from "./helper/paymentbHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";

const BraintreePayment = ({ products, setReload, reload }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getPaymentToken(userId, token).then((info) => {
      // console.log("INFO", info);
      if (info.error) {
        setInfo({
          ...info,
          error: info.error,
        });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, [userId, token]);

  const onPurchase = () => {
    setInfo({ ...info, loading: true });
    let nonce;
    info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getFinalAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          setInfo({ ...info, success: response.success, loading: false });
          console.log("SUCCESS");
          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
          };
          createOrder(userId, token, orderData);
          emptyCart(() => console.log("Did it crash?"));
          setReload(!reload);
        })
        .catch((error) => {
          setInfo({ loading: false, success: false });
          console.log("FAILED", error);
        });
    });
  };

  const showBraintreeDropIn = () => {
    return (
      <div>
        {info.clientToken ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-success btn-block" onClick={onPurchase}>
              Purchase Now
            </button>
          </div>
        ) : (
          <p>Please login to purchase.</p>
        )}
      </div>
    );
  };

  const getFinalAmount = () => {
    return products.reduce(
      (accumulator, currentVal) => accumulator + currentVal.price,
      0
    );
  };

  return (
    <div>
      <h3>Your bill is Rs. {getFinalAmount()}</h3>
      {showBraintreeDropIn()}
    </div>
  );
};

export default BraintreePayment;
