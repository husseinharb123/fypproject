import React, { useState } from 'react'
import './OrderandWish.scoped.css'
import { Link } from 'react-router-dom'
import OrderElement from '../../components/OrderElement/OrderElement'
import OrderTable from './OrderTable'
import WishListTable from './WishTable'

export default function OrderandWish() {
  const [showOrders, setShowOrders] = useState(true);

  function handleWishlistClick() {
    setShowOrders(false);
  }

  function handleOrdersClick() {
    setShowOrders(true);
  }

  return (
    <>
      <div className="container bg-secondary">
        <div className="row px-xl-5">
          <div className="col table-responsive mb-5">
            <div className="nav nav-tabs ">
            <Link
  className={`nav-item nav-link text-dark font-weight-bold ${
    showOrders ? 'active' : ''
  }`}
  onClick={handleOrdersClick}
  to="#tab-pane-1"
>
  <i className="fas fa-shopping-bag"></i> Orders
</Link>
<Link
  className={`nav-item nav-link text-dark font-weight-bold ${
    !showOrders ? 'active' : ''
  }`}
  onClick={handleWishlistClick}
  to="#tab-pane-3"
>
  <i className="fas fa-heart"></i> Wishlist
</Link>
            </div>
            {showOrders ? <OrderTable /> : <WishListTable/>}
          </div>
        </div>
      </div>
    </>
  );
}