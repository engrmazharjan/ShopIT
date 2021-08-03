import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MetaData from "./layout/MetaData";
import Product from "./product/Product";
import { getAllProducts } from "../actions/productActions";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { loading, products, error, productCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products Online"} />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default HomeScreen;
