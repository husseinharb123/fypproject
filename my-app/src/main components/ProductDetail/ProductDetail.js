import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import image from "./img/product-1.jpg";
import "./ProductDetail.scoped.css";
import { useContext } from "react";
import StarRating from "../../components/Starrating/StarRating";

export default function ProductDetail({productdetail ,userreviewsnum}) {


  function findpriceafterdiscount() {
    return productdetail.price * (1- productdetail.discount / 100)
}



  return (
    <>

   
      <div className="row px-xl-5 bg-secondary p-30">
        <div className="heading-section">
          <h2>Product Details</h2>
        </div>
        <div className="col-lg-5 mb-15">
          <div
            id="product-carousel"
            className="carousel slide"
            data-ride="carousel"
          >

            <div className="carousel-inner bg-light">
              <div className="carousel-item active">

                <img className="w-100 h-100" src={`http://localhost:8070/images/${productdetail.imgurl}`} alt="Image1" />
              </div>

            </div>
          </div>
        </div>

        <div className="col-lg-7 h-auto mb-30">

          <div className="h-100 bg-light p-30 pb-0 ">

            <h3>{productdetail.productname}</h3>
            
            <p className="small "><Link to={`/store/${productdetail.storeid}`}> Visit {productdetail.storename}</Link></p>
            
            
            {productdetail && (
  <StarRating
    reviews={userreviewsnum}
    allowclick={false}
    rating={productdetail.rating}
    viewreview={true}
  />
)}
            
            
            <div className="d-flex align-items-center  mt-2">
              <h3>${findpriceafterdiscount()}</h3>
              <h4 className="text-muted ml-2">
                <del>${productdetail.price}</del>
              </h4>
              <div className="discount">{productdetail.discount}% off</div>
            </div>

            <hr />
            <h5>Product detail</h5>
            <p>{productdetail.productdes}</p>
            <div className="single-product">
              <div className="card-description">
                <ul className="spaced-list">
                  <li>
                    Category:{" "}<span className="list-value">{productdetail.category}</span></li>
                  <li>Availability:{" "}<span className="list-value">{productdetail.in_stock}</span></li>
                  <li>
                    Delivery:{" "}
                    <span className="list-value">
                      {productdetail.fast ? 'Fast' : 'Not mentioned'}
                    </span>
                  </li>
                  {/* <li>Buyers:{" "}<span className="list-value">{productdetail.buyers}</span></li> */}
                  <li>Barcode:{" "}<span className="list-value">{productdetail.barcode}</span></li>
                </ul>
              </div>
            </div>
            <div className="d-flex align-items-center mb-4 pt-2">

              <button className="btn btn-primary rounded-pill px-3">
                <i className="fa fa-shopping-cart mr-1" /> Add To Cart
              </button>
              <button className="btn btn-primary rounded-pill px-3 " style={{ marginLeft: '20px' }}>
                <i className="fa fa-heart mr-1" /> wishlist
              </button>
            </div>
          </div>
        </div>
      </div>



    </>
  );
}
