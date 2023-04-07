import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SearchElement from '../SearchElement/SearchElement'
import { ProductFiltercontext, ProductFilterDispatch } from '../../Contexts/ProductsSearchResulTSContext';
import './SearchElements.scoped.css'

export default function SearchElements() {

  const state = useContext(ProductFiltercontext)
  const dispatch = useContext(ProductFilterDispatch)
  const products = state.results
  function findpriceafterdiscount(price, discount) {
    return price * (1- discount / 100)
}

  return (
    <>
      <div className="row px-xl-5">
        <div className="row pb-3">
          <div className="heading-3 mb-30 " >Showing {state.results_per_page} of {state.total_results} Products
            <select className="form-select float-end w-25 sortby" aria-label="Default select example"
            
            value={state.sort_by}
            onChange={(e)=>dispatch({type:'updatesort_by',value :e.target.value})}
            >
              <option selected>Sort By</option>
              <option value="price_high_to_low">price_high_to_low</option>
              <option value="price_low_to_high">price_low_to_high</option>
            </select>
          
          </div>

         
          {products.map(product =>{return  <>
          
          
          <SearchElement
          productname= {product.productname}
          initialprice={product.price}
          discount={product.discount}
          currentprice={findpriceafterdiscount(product.price, product.discount)}
          rating={product.rating}
          reviews={product.reviews}
          productid={product._id}
          imgurl = {product.imgurl}
            />
          </>

          })}

        </div>
        <div className='position-relative p-30'>

          <nav aria-label="Page navigation example " className='position-absolute bottom-0 end-50'>
            <ul className="pagination">
              <li className="page-item">
                <Link className="page-link" to="#" aria-label="Previous"onClick={()=>{dispatch({type:"decpage"})}}>
                  <span aria-hidden="true">&laquo;</span>
                </Link>
              </li>
              
              <li className="page-item">
                <Link className="page-link" to="#" aria-label="Next" onClick={()=>{dispatch({type:"incpage"})}}>
                  <span aria-hidden="true">&raquo;</span>
                </Link>
              </li>
            </ul>
          </nav>

        </div>

      </div>
    </>
  )


}
