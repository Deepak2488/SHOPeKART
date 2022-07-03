import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../redux/action";
import { NavLink } from "react-router-dom";
import Loader from "./Loader";

const Products = () => {
  const allProducts = useSelector((state) => state.allProducts);
  const [filteredData, setFilteredData] = useState(allProducts);
  const [loading, setLoading] = useState(true);
  //let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    console.log("###ALL_PROD_UE", allProducts)
    if(!allProducts.length){
      getProducts();
    }else{
      setLoading(false)
    }
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const finalData = await response.json();
      dispatch({
        type: "FETCH_ALL_PRODUCTS",
        payload: finalData,
      });
      setFilteredData(finalData);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filterProduct = (cat) => {
    const updatedList = allProducts.filter((x) => x.category === cat);
    setFilteredData(updatedList);
  };

  const showProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => setFilteredData(allProducts)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronic
          </button>
        </div>
        {filteredData.map((product) => {
          return (
            <>
              <div className="col-md-3 mb-4">
                <div className="card h-100 text-center p-4" key={product.id}>
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                    height="300px"
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-0">
                      {product.title.substring(0, 12)}...
                    </h5>
                    <p className="card-text lead fw-bold">${product.price}</p>
                    <div></div>
                    <NavLink
                      to={`/products/${product.id}`}
                      className="btn btn-outline-dark my-3"
                    >
                      Buy Now
                    </NavLink>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <button
                        className="btn btn-outline-dark"
                        onClick={() => addProduct(product)}
                        style={{
                          fontSize: "11px",
                          height: "45px",
                          padding: "4px",
                          width: "50%",
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
                            type: "ADD_TO_WISHLIST",
                            payload: product,
                          });
                        }}
                      >
                        Add to Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="diplay-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loader /> : showProducts()}
        </div>
      </div>
    </div>
  );
};

export default Products;
