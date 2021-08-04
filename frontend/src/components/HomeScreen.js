import "rc-slider/assets/index.css";

import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "./layout/Loader";
import MetaData from "./layout/MetaData";
import Pagination from "react-js-pagination";
import Product from "./product/Product";
import Slider from "rc-slider";
import { getAllProducts } from "../actions/productActions";
import { useAlert } from "react-alert";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const HomeScreen = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, products, error, productCount, resultPerPage } = useSelector(
    (state) => state.products
  );

  const keyword = match.params.keyword;

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getAllProducts(keyword, currentPage, price));
  }, [dispatch, alert, error, keyword, currentPage, price]);

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
              {keyword ? (
                <Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{ 1: `$1`, 1000: `$1000` }}
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        tipFormatter={(value) => `$${value}`}
                        tipProps={{ placement: "top", visible: true }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />
                    </div>
                  </div>

                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products &&
                        products.map((product) => (
                          <Product
                            key={product._id}
                            product={product}
                            col={4}
                          />
                        ))}
                    </div>
                  </div>
                </Fragment>
              ) : (
                products &&
                products.map((product) => (
                  <Product key={product._id} product={product} col={3} />
                ))
              )}
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
