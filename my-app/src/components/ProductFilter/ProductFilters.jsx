import "./ProductFilters.scoped.css";
import { useContext, useEffect } from 'react';
import {  ProductFiltercontext, ProductFilterDispatch } from "../../Contexts/ProductsSearchResulTSContext";
export default function ProductFilters() {


  
  const state = useContext(ProductFiltercontext)
  const dispatch = useContext(ProductFilterDispatch)
  
useEffect(()=>{


  dispatch({ type: 'searchforit'})

},[])

function handleclickit(){
  dispatch({ type: 'updatestoreid',value:""})
  dispatch({ type: 'searchforit'})

}
  return (
    <aside className="product-sidebar show-filter bg-white">
      <div className="title">
        <div className="heading-3">Filters</div>

        {state.storeid && (
  <span className="tag with-button">
    {state.storename}
    <button className="delete" aria-label="Delete" onClick={handleclickit}>x</button>
  </span>
)}

      </div>

      <div className="filters">


        <div className="filter-wrapper">
          <div className="filter-title">
            Price: &#36;
          </div>
          <div className="filter-value">
            <div className="filter-price">
              <span>&#36; 0</span>
              <span> &#36; 5000 </span>
            </div>
            <input
              type="range"
              list="steplist"
              min="0"
              max="1500"
              step="300"
              onChange={(e)=>dispatch({type:'updatemax_price',value :e.target.value})}
            />
            <datalist id="steplist">
              <option>0</option>
              <option>300</option>
              <option>600</option>
              <option>900</option>
              <option>1200</option>
              <option>1500</option>
            </datalist>
          </div>
        </div>





        <div className="filter-wrapper">
  <div className="filter-title">Category</div>
  <div className="filter-value filter-category">
    <label className={state.category==="Apparel and accessories" ? "ischosen" : ""}>
      <input
        type="radio"
        name="category"
        value="Apparel and accessories"
        onChange={(e) => dispatch({ type: 'updatecategory', value: e.target.value })}
      />{" "}
      Apparel and accessories
    </label>
    <label className={state.category==="Electronics" ? "ischosen" : ""}>
      <input
        type="radio"
        name="category"
        value="Electronics"
        onChange={(e) => dispatch({ type: 'updatecategory', value: e.target.value })}
      />{" "}
      Electronics
    </label>
    <label className={state.category==="Home and garden" ? "ischosen" : ""}>
      <input
        type="radio"
        name="category"
        value="Home and garden"
        onChange={(e) => dispatch({ type: 'updatecategory', value: e.target.value })}
      />{" "}
      Home and garden
    </label>
    <label className={state.category==="Beauty and personal care" ? "ischosen" : ""}>
      <input
        type="radio"
        name="category"
        value="Beauty and personal care"
        onChange={(e) => dispatch({ type: 'updatecategory', value: e.target.value })}
      />{" "}
      Beauty and personal care
    </label>
    <label className={state.category==="Sports and fitness" ? "ischosen" : ""}>
      <input
        type="radio"
        name="category"
        value="Sports and fitness"
        onChange={(e) => dispatch({ type: 'updatecategory', value: e.target.value })}
      />{" "}
      Sports and fitness
    </label>
    <label className={state.category==="Toys and games" ? "ischosen" : ""}>
      <input
        type="radio"
        name="category"
        value="Toys and games"
        onChange={(e) => dispatch({ type: 'updatecategory', value: e.target.value })}
      />{" "}
      Toys and games
    </label>
    <label className={state.category==="Food and beverages" ? "ischosen" : ""}>
      <input
        type="radio"
        name="category"
        value="Food and beverages"
        onChange={(e) => dispatch({ type: 'updatecategory', value: e.target.value })}
      />{" "}
      Food and beverages
    </label>
    <label className={state.category==="Health and wellness" ? "ischosen" : ""}>
      <input
        type="radio"
        name="category"
        value="Health and wellness"
        onChange={(e) => dispatch({ type: 'updatecategory', value: e.target.value })}
      />{" "}
      Health and wellness
    </label>
  </div>
</div>



        <div className="filter-wrapper">
          <div className="filter-title">Rating</div>
          <div className="filter-value filter-rating">
            <label>
              <input
                type="radio"
                name="rating"
                onChange={(e) => dispatch({ type: 'updaterating', value: e.target.value })}
                value="4"
              />{" "}
              4 <i className="fa fa-solid fa-star"></i> & above
            </label>
            <label>
              <input
                type="radio"
                name="rating"
                onChange={(e) => dispatch({ type: 'updaterating', value: e.target.value })}
                value="3"
              />{" "}
              3 <i className="fa fa-solid fa-star"></i> & above
            </label>
            <label>
              <input
                type="radio"
                name="rating"
                onChange={(e) => dispatch({ type: 'updaterating', value: e.target.value })}
                value="2"
                
              />{" "}
              2 <i className="fa fa-solid fa-star"></i> & above
            </label>
            <label>
              <input
                type="radio"
                name="rating"
                onChange={(e) => dispatch({ type: 'updaterating', value: e.target.value })}
                value="1"
              />{" "}
              1 <i className="fa fa-solid fa-star"></i> & above
            </label>
          </div>
        </div>





        <div className="filter-wrapper">
          <div className="filter-title">Others</div>
          <div className="filter-value filter-category">
            <label>
              <input
                type="checkbox"
                onChange={(e)=>dispatch({type:'updatein_stock',value :e.target.checked})}
              />{" "}
              In Stock
            </label>
            <label>
              <input
                type="checkbox"
                onChange={(e)=>dispatch({type:'updatefast_delivery',value :e.target.checked})}
              />{" "}
              Fast Delivery
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
};

