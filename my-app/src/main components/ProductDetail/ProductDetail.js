import React ,{useEffect}from "react";
import { Link } from "react-router-dom";
import image from "./img/product-1.jpg";
import "./ProductDetail.scoped.css";
import { ProductDetailContext} from "../../Contexts/ProductDetailContextProvider";
import { useContext } from "react";
import StarRating from "../../components/Starrating/StarRating";

export default function ProductDetail() {
  const state = useContext(ProductDetailContext)
  useEffect(() => {
  }, [])
  
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
                
                <img className="w-100 h-100" src={`http://localhost:8070/images/${state.imgurl}`} alt="Image1" />
              </div>

            </div>
          </div>
        </div>

        <div className="col-lg-7 h-auto mb-30">

          <div className="h-100 bg-light p-30 pb-0 ">

            <h3>{state.productname}</h3>
            <p className="small "><Link to={`/storepage/${state.storeid}`}> Visit {state.storename}</Link></p>
          <StarRating  reviews={state.reviews} allowclick={false} rating = {state.rating} viewreview={true}/>
            <div className="d-flex align-items-center  mt-2">
              <h3>${state.priceafterdis}</h3>
              <h4 className="text-muted ml-2">
                <del>${state.price}</del>
              </h4>
              <div className="discount">{state.discount}% off</div>
            </div>

            <hr />
            <h5>Product detail</h5>
            <p>{state.productdes}</p>
            <div className="single-product">
              <div className="card-description">
                <ul className="spaced-list">
                  <li>
                    Category:{" "}<span className="list-value">{state.category}</span></li>
                  <li>Availability:{" "}<span className="list-value">Out of Stock</span></li>
                  <li>Delivery:{" "}<span className="list-value">Fast</span></li>
                  <li>Buyers:{" "}<span className="list-value">{state.buyers}</span></li>
                  <li>Barcode:{" "}<span className="list-value">{state.barcode}</span></li>
                </ul>
              </div>
            </div>
            <div className="d-flex align-items-center mb-4 pt-2">
              <div
                className="input-group quantity mr-3"
                style={{ width: "130px" }}
              >
                <div className="input-group-btn">
                  <button className="btn btn-primary rounded-circle  btn-minus">
                    <i className="fa fa-minus" />
                  </button>
                </div>
                <input
                  type="text"
                  className="form-control bg-secondary border-0 text-center"
                  value="1"
                />
                <div className="input-group-btn">
                  <button className="btn btn-primary rounded-circle btn-plus">
                    <i className="fa fa-plus" />
                  </button>
                </div>
              </div>
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
