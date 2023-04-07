import React, { useEffect, useState } from 'react'
import './OrderandWish.scoped.css'
import OrderElement from '../../components/OrderElement/OrderElement'
import WishlistElement from '../../components/OrderElement/WishlistElement'
import axios from 'axios';

export default function WishListTable() {
  const [wishListItems, setWishListItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userid = localStorage.getItem('_id');
  const [count,subcount]= useState(0);
  useEffect(() => {
    async function fetchResults() {
        const url = `/wishlist?userid=${userid}`;
        console.log(url);
        try {
            const response = await axios.get(url);
            const data = response.data;
            setWishListItems(data);
            setTimeout(() => {
          setIsLoading(false);
            }, 200); 
            
        } catch (error) {
            console.error(error);
        }
    }
    fetchResults();
  }, [count]);

  return (
    <>
{isLoading ? (
  <div className="text-center mt-5">
    <h2>Loading... <i className="fas fa-spinner fa-spin"></i></h2>
  </div>
) : wishListItems.length > 0 ? (
  <div className="table-container">
    <table className="table table-light table-borderless table-hover text-center mb-0">
      <thead className="thead-dark">
        <tr>
          <th><i className="fas fa-shopping-bag"></i> Product Name</th>
          <th><i className="fas fa-dollar-sign"></i> Price</th>
          <th><i className="fas fa-cog"></i> Action</th>
        </tr>
      </thead>
      <tbody className="align-middle">
        {wishListItems.map((wishListItem, index) => (
          <WishlistElement
            key={index}
            productname={wishListItem.productname}
            price={wishListItem.price}
            productid={wishListItem.productid}
            wishid={wishListItem._id}
            imgurl={wishListItem.imgurl}
            subcount={subcount}
            count={count}
          />
        ))}
      </tbody>
    </table>
  </div>
) : (
  <div className="text-center mt-5">
    <h2><i className="fas fa-heart"></i>You don't have any wishlist items yet</h2>
    <p>Add items to your wishlist now to keep track of them</p>
  </div>
)}
    </>
  );
}