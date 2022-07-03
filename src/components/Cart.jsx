import React from "react";
import { useSelector, useDispatch } from "react-redux";
//import { NavLink } from "react-router-dom";
import { addCart, delCart } from "../redux/action";
import Alert from "./Alert";

const Cart = (props) => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const handleAdd = (item) => {
    dispatch(addCart(item));
  };

  const handleDel = (item) => {
    dispatch(delCart(item));
  };

  const emptyCart = () => {
    return (
      <div className="px-4 my-5 bg-light rounded-3 py-5">
        <div className="container py-4">
          <div className="row">
            <h3>Your Cart is Empty</h3>
          </div>
        </div>
      </div>
    );
  };

  const cartItems = (product) => {
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
                <p className="lead fw-bold">
                  {product.qty} X ${product.price} = $
                  {product.qty * product.price}
                </p>
                <button
                  className="btn btn-outline-dark me-4"
                  onClick={() => handleDel(product)}
                >
                  <i className="fa fa-minus"></i>
                </button>
                <button
                  className="btn btn-outline-dark"
                  onClick={() => handleAdd(product)}
                >
                  <i className="fa fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const calculateFinalAmount = () => {
    let amount = 0;
    state.map((product) =>  {
      amount = amount + product.qty * product.price;
    });
    return amount;
  };

  const makePayment = () => {
    const successPromise = new Promise((resolve) => {
      const randomNumber = Math.floor(Math.random()*100);
      resolve(randomNumber)
    })
    successPromise.then(result => {
      if(result < 50){
         props.showMessage({ type : "success"})
      }else{
         props.showMessage({ type : "error"})
      }
    })
  }

  const buttons = () => {
    return (
      <>
        <div className="container">
          <div className="row">
            <button
              onClick={makePayment}
              className="btn btn-outline-dark mb-5 w-25 mx-auto"
            >
              Proceed to pay <b>{calculateFinalAmount()}</b>
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      {state.length === 0 ? (
        emptyCart()
      ) : (
        <>
          {state.map(cartItems)}
          {buttons()}
        </>
      )}
    </div>
  );
};

export default (Alert)(Cart);
