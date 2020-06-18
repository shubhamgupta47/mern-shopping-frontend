import React from "react";
import Menu from "./Menu";


const Base = ({
  title = "My Title",
  description = "My description",
  className = "bg-dark text-white p-4",
  children,
}) => {
  return (
    <>
      <Menu />
      <div className="container-fluid pb-as-footer">
        <div className="jumbotron bg-dark text-white text-center pb-0">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer bg-dark mt-auto py-3">
        <div className="container-fluid bg-success text-white text-center py-3">
          <h6>If you have any suggestions, feel free to reach out.</h6>
          <button className="btn btn-warning btn-sm">Contact Us</button>
        </div>
        <div className="container">
          <span className="text-muted small">An Amazing <span className="text-white">Fashion</span> store</span>
        </div>
      </footer>
    </>
  );
};

export default Base;
