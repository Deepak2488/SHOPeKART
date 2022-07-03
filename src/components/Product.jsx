import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../redux/action";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import Loader from "./Loader";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const allProducts = useSelector((state) => state.allProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      setProduct(await response.json());
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const showProduct = () => {
    return (
      <>
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.title}
            height="400px"
            width="400px"
          />
        </div>
        <div className="col-md-6">
          <h4 className="text-uppercase text-black-50">{product.category}</h4>
          <h1 className="display-5">{product.title}</h1>
          <p className="lead fw-bolder">
            Rating {product.rating && product.rating.rate}
            <i className="fa fa-star"></i>
          </p>
          <h3 className="display-6 fw-bold my-4">$ {product.price}</h3>
          <p className="lead">{product.description}</p>

          <button
            className="btn btn-outline-dark px-4 py-2"
            onClick={() => addProduct(product)}
          >
            Add to Cart
          </button>

          <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2">
            Go to Cart
          </NavLink>

          <NavLink to="/wishlist" className="btn btn-dark ms-2 px-3 py-2">
            Go to wishlist
          </NavLink>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row py-4">
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Loader />
            </div>
          ) : (
            showProduct()
          )}
        </div>
      </div>
    </div>
  );
}
