import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "./layout/Loader";
import MetaData from "./layout/MetaData";
import Pagination from "react-js-pagination";
import Product from "./product/Product";
import { getAllProducts } from "../actions/productActions";
import { useAlert } from "react-alert";

const HomeScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, products, error, productCount, resultPerPage } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getAllProducts(currentPage));
  }, [dispatch, alert, error, currentPage]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
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

          {resultPerPage <= productCount && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default HomeScreen;
