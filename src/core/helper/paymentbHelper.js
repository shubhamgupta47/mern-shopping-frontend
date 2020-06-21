import { API } from "../../backend";

//Here we are using Braintree library (created by PayPal) for adding a payment gateway

/**
 * This method is 1 of the 2 steps to complete a payment using Braintree.
 * This method is to pass a token to our server, which will then use this token
 * to pass a 'nonce' to the Braintree server.
 **/

export const getPaymentToken = (userId, nonceToken) => {
  //nonceToken is just a token only, its named as such at Braintree
  console.log("USER", userId);
  console.log("TOKEN", nonceToken);

  return fetch(`${API}/payment/get-token/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${nonceToken}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

/**
 * This method actually processes payment by calling a backend API for the same
 */
export const processPayment = (userId, token, paymentInfo) => {
  console.log("in process payment");
  return fetch(`${API}/payment/braintree/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paymentInfo),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
