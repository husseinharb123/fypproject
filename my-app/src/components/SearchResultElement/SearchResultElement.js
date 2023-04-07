import React from 'react'
import { Link } from 'react-router-dom'
import image from './product-1.jpg'
import "./SearchResultElement.scoped.css";
export default function SearchResultElement() {
  return (
    <>

      <div className="col-lg-4 col-md-6 col-sm-6 pb-1">
        <div className="product-item bg-light mb-4">
          <div className="product-img position-relative overflow-hidden">
            <img
              className="img-fluid w-100"
              src={image}
              alt=""
            />
            <div className="product-action">
              <Link
                className="btn btn-outline-dark btn-square"
                to=""
              >
                <i className="fa fa-shopping-cart" />
              </Link>
              <Link
                className="btn btn-outline-dark btn-square"
                to=""
              >
                <i className="far fa-heart" />
              </Link>
              <Link
                className="btn btn-outline-dark btn-square"
                to=""
              >
                <i className="fa fa-search" />
              </Link>
            </div>
          </div>
          <div className="text-center py-4">
            <Link
              className="h6 text-decoration-none text-truncate"
              to=""
            >
              Product Name Goes Here
            </Link>
            <div className="d-flex align-items-center justify-content-center mt-2">
              <h5>$123.00</h5>
              <h6 className="text-muted ml-2">
                <del>$123.00</del>
              </h6>
            </div>
            <div className="d-flex align-items-center justify-content-center mb-1">
              <small className="fa fa-star   text-primary mr-1 " />
              <small className="fa fa-star text-primary mr-1" />
              <small className="fa fa-star text-primary mr-1" />
              <small className="fa fa-star text-primary mr-1" />
              <small className="fa fa-star text-primary mr-1" />
              <small>(99)</small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
