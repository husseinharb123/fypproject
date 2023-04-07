import React, { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import image from './img/cat-1.jpg'
import './Category.scoped.css'
import { ProductFilterDispatch, ProductFiltercontext } from '../../Contexts/ProductsSearchResulTSContext';
export default function Category( {categoryname,url}) {

  const navigate = useNavigate();
  const dispatch = useContext(ProductFilterDispatch);
  const state = useContext(ProductFiltercontext);


  const handleSearchFormSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "updatecategory", value: categoryname })
    dispatch({ type: "searchforit" })
    navigate('/search');
  };

  
  return (
<div className="col-lg-3 col-md-4 col-sm-6 pb-2">
  <Link className="text-decoration-none" 
  
  
  onClick={handleSearchFormSubmit}
  
  
  
  
  >
    <div className="cat-item d-flex flex-column align-items-center mb-4 category-card">
      <div
        className="overflow-hidden rounded-circle mb-3"
        style={{ width: "250px", height: "150px" }}
      >
        <img className="img-fluid rounded-circle" src={url} alt="" style={{objectFit: 'cover', width: '100%', height: '100%'}} />
      </div>
      <div className="flex-fill pl-3 text-center">
        <h6 className="text-uppercase font-weight-bold mb-0">{categoryname}</h6>
      </div>
    </div>
  </Link>
</div>
  );
}
