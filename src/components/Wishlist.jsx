import React from "react";
import { useSelector, useDispatch } from "react-redux";
//import { NavLink } from "react-router-dom";
//import { addCart, delCart } from "../redux/action";

const Wishlist = () => {
  const wishList = useSelector((state) => state.handleWishlist);
  const dispatch = useDispatch();

  const emptyWishList = () => {
    return (
      <div className="px-4 my-5 bg-light rounded-3 py-5">
        <div className="container py-4">
          <div className="row">
            <h3>Your Wishlist is Empty</h3>
          </div>
        </div>
      </div>
    );
  };

  const renderWishlist = (product) => {
    return (
      <>
        <div className="px-4 my-5 bg-light rounded-3 py-5">
          <div className="container py-4">
            <div className="row justify-content-center">
              <div className="col-md-4">
                <img
                  src={product.image}
                  alt={product.title}
                  height="200px"
                  width="180px"
                />
              </div>
              <div className="col-md-4">
                <h3>{product.title}</h3>
                <p className="lead fw-bold">{product.price}</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "60%",
                  }}
                >
                  <button
                    className="btn btn-outline-dark"
                    style={{
                      fontSize: "11px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      dispatch({
                        type: "ADDITEM",
                        payload: product,
                      });
                      dispatch({
                        type: "REMOVE_FROM_WISHLIST",
                        payload: product,
                      });
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn btn-outline-dark"
                    style={{
                      fontSize: "11px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      dispatch({
                        type: "REMOVE_FROM_WISHLIST",
                        payload: product,
                      });
                    }}
                  >
                    Remove From Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      {wishList.length === 0 ? emptyWishList() : wishList.map(renderWishlist)}
    </div>
  );
};

export default Wishlist;
