import React from 'react'
import {Link} from 'react-router-dom'
import './services.scoped.css'

export default function Shopby() {
  return (
   <>
        <div className="services-category container">
          <div className="service">
            <div className="icon">
                  <i className="fa fa-check-circle"></i>
            </div>

            <div className="text">
              <div className="heading">Money Guarantee</div>
              <div className="sub-heading">7 Days Money Back</div>
            </div>
          </div>

          <div className="service">
            <div className="icon">
              <i className="fa fa-truck"></i>
            </div>

            <div className="text">
              <div className="heading">Fast Delivery</div>
              <div className="sub-heading">Within 3-5 business days</div>
            </div>
          </div>

          <div className="service">
            <div className="icon">
              <i className="fa fa-credit-card"></i>
            </div>

            <div className="text">
              <div className="heading">Secure Payments</div>
              <div className="sub-heading">All Cards Accepted</div>
            </div>
          </div>
          
        </div>
   </>
  )
}
