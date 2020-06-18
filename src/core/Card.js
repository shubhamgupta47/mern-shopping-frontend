import React, { useState } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart } from "./helper/cartHelper";

const Card = ({ product, addToCart = true, removeFromCart = false }) => {
  const [redirect, setRedirect] = useState(false);

  const cardTitle = product ? product.name : "Title Not Available";
  const cardDescription = product
    ? product.description
    : "Description Not Available";
  const cardPrice = product ? product.price : "--";

  const onAddToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addToCart) => {
    return (
      addToCart && (
        <div className="col-12">
          <button
            onClick={onAddToCart}
            className="btn btn-block btn-outline-success mt-2 mb-2"
          >
            Add to Cart
          </button>
        </div>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <div className="col-12">
          <button
            onClick={() => {}}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
            Remove from cart
          </button>
        </div>
      )
    );
  };
  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        <div className="rounded border border-success p-2">
          <ImageHelper product={product} />
        </div>
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p className="badge badge-success  px-4 py-2">Rs. {cardPrice}</p>
        <div className="row">
          {showAddToCart(addToCart)}
          {showRemoveFromCart(removeFromCart)}
        </div>
      </div>
    </div>
  );
};

export default Card;
