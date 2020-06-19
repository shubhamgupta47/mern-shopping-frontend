import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  !!products.length && console.log(products[0]._id);
  return (
    <Base title="Home Page" description="Choose from our huge collection">
      <div className="row text-center">
        <h1 className="text-white">All T-Shirts</h1>
        <div className="row">
          {error && (
            <div className="alert alert-danger">{error}</div>
          )}
          {!!products.length &&
            products.map((product, index) => {
              return (
                <div key={index} className="col-4 mb-4">
                  <Card product={product} />
                </div>
              );
            })}
        </div>
      </div>
    </Base>
  );
}
