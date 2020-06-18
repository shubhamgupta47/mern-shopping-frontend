import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
  const imageURL = product
    ? `${API}/product/photo/${product._id}`
    : `https://images.pexels.com/photos/953862/pexels-photo-953862.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
  return (
    <img
      src={imageURL}
      alt="pexel"
      style={{ maxHeight: "100%", maxWidth: "100%" }}
      className="mb-3 rounded"
    />
  );
};

export default ImageHelper;
