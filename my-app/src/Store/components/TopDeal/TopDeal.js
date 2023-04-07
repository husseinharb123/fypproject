import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './CategoryProduct.scoped.css';
import { cartDispatchContext } from '../../../Contexts/CartcontextProvider';
import { Link } from 'react-router-dom';


export default function TopDeal({ dealdata }) {
const productid = dealdata._id

const [addedToCart, setAddedToCart] = useState(false);
const [addedToWishlist, setAddedToWishlist] = useState(false);

const dispatch = useContext(cartDispatchContext);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`/inoutwishcart/${productid}`);
      setAddedToCart(response.data.addedToCart);
      setAddedToWishlist(response.data.addedToWishlist);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, []);


async function addToCart() {
  if (addedToCart) {
    await deleteFromCart();
    setAddedToCart(false);

    return;
  }
  setAddedToCart(true);
  try {
    const response = await axios.post('/postcart', {
      userid: localStorage.getItem('_id'),
      productid: productid
    });
    console.log(response.data); // Successfully added to cart
    if (addedToWishlist) {
      await deleteFromWishlist();
      setAddedToWishlist(false);
    }
    dispatch({ type: "recount" });
  } catch (error) {
    console.error(error);
    // TODO: show error message to user
  }
}

async function addToWishlist() {
  if (addedToWishlist) {
    await deleteFromWishlist();
    setAddedToWishlist(false);
    return; // If already added to wishlist, don't do anything
  }
  setAddedToWishlist(true);
  try {
    const response = await axios.post('/postwish', {
      userid: localStorage.getItem('_id'),
      productid: productid
    });
    console.log(response.data); // Successfully added to wishlist
    if (addedToCart) {
      await deleteFromCart();
      setAddedToCart(false);
    }

  } catch (error) {
    console.error(error);
    // TODO: show error message to user
  }
}

async function deleteFromWishlist() {
  try {
    const response = await axios.post('/deletewish', {
      userid: localStorage.getItem('_id'),
      productid: productid
    });
    console.log(response.data); // Successfully deleted wishlist item
  } catch (error) {
    console.error(error);
    // TODO: show error message to user
  }
}

async function deleteFromCart() {
  try {
    const response = await axios.post('/deletecart', {
      userid: localStorage.getItem('_id'),
      productid: productid
    });
    dispatch({ type: "recount" });
    console.log(response.data); // Successfully deleted cart item
  } catch (error) {
    console.error(error);
    // TODO: show error message to user
  }
}



  function findpriceafterdiscount() {
    return parseInt(dealdata.price) * (1 - parseInt(dealdata.discount) / 100)
  }



  return (




    <div className="col-md-4">
      <div className="card"> <img src={`http://localhost:8070/images/${dealdata.imgurl}`} className="card-img-top" />
        <div className="card-body">


          <div className="d-flex justify-content-between">        <Link

            to={`/productdetail/${productid}`}
          > <span className="font-weight-bold">{dealdata.productname}</span></Link> <span className="font-weight-bold">${findpriceafterdiscount()}</span> </div>
          <p className="card-text mb-1 mt-1">{dealdata.productdes}</p>
          <div className="d-flex align-items-center flex-row"> <img src="https://i.imgur.com/e9VnSng.png" width="20" /> <span className="guarantee">{dealdata.discount}% Discount</span> </div>
        </div>



        <hr />
        <div className="card-body">

          <div className="text-right buttons">
            <button className="btn btn-dark" onClick={addToCart}>
              {addedToCart ? 'Remove from cart' : 'Add to cart'}
            </button>

            <button className="btn btn-outline-dark" onClick={addToWishlist}>
              {addedToWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
