import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import buildimage from './slide1.jpg';
import shopimage from "./slide2.jpg";
import './Slideshow.scoped.css'
import { ProductFilterDispatch, ProductFiltercontext } from '../../Contexts/ProductsSearchResulTSContext';



export default function Slideshow() {
  const nav = useNavigate()






  const navigate = useNavigate();
  const dispatch = useContext(ProductFilterDispatch);
  const state = useContext(ProductFiltercontext);


  const handleSearchFormSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "updatecategory", value: "" })
    dispatch({ type: "searchforit" })
    navigate('/search');
  };
  return (
    <>
      <div
        id="carouselExampleDark"
        className="carousel carousel-dark slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          />
        </div>
        <div className="carousel-inner">
          <div className="carousel-item" data-bs-interval="5000">
            <img src={buildimage} className="d-block imag" alt="..." />
            <div className="carousel-caption d-none d-md-block ">
              <span className="btn btn-light border border-dark" onClick={()=>{nav('buildstore')}}> build</span>
              <h2 className="text-dark">Build You Own Store Page</h2>
            </div>
          </div>

          <div className="carousel-item active" data-bs-interval="5000">
            <img src={shopimage} className="d-block imag" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <span className="btn btn-dark" onClick={handleSearchFormSubmit}> shop now</span>
              <h2 className="text-white">
                Start Shopping By Exploring Shops Products
              </h2>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}
