import React from 'react'
import './CartSummary.scoped.css'
export default function CartSummary({totalshipping ,subcost,totalcosts }) {
  return (
    <>

    
<div className="col-lg-4">
      <h5 className="section-title position-relative text-uppercase mb-3">
          <span className="bg-secondary pr-3">
              <i className="fas fa-shopping-cart"></i> Cart Summary
          </span>
      </h5>
      <div className="bg-light p-30 mb-5">
          <div className="border-bottom pb-2">

              <div className="d-flex justify-content-between mb-3">
                  <h6><i className="fas fa-list"></i> Subtotal</h6>
                  <h6>${subcost}</h6>
              </div>
              <div className="d-flex justify-content-between">
                  <h6 className="font-weight-medium"><i className="fas fa-truck"> </i>  Shipping</h6>
                  <h6 className="font-weight-medium">${totalshipping}</h6>
              </div>
          </div>

          <div className="pt-2">
              <div className="d-flex justify-content-between mt-2">
                  <h5><i className="fas fa-money-bill-wave"> </i>  Total</h5>
                  <h5>${totalcosts}</h5>
              </div>
              <button className="btn btn-block btn-dark font-weight-bold my-3 py-3 rounded">
                  <i className="fas fa-credit-card">  </i>  Proceed To Checkout
              </button>
          </div>
      </div>
 </div>
    
    
    
    
    
    
    </>
  )
}
