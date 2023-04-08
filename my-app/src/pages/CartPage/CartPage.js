import React, { useEffect, useState } from 'react';
import './Cart.scoped.css';
import CartSummary from '../../components/CartSummary/CartSummary';
import CartElement from '../../components/CartElement/CartElement';
import Header from '../../main components/Header/Header';
import Footer from '../../main components/Footer/Footer';
import axios from 'axios';

export default function CartPage() {

    const [cartElements, setCartElements] = useState([]);
    const userid = localStorage.getItem('_id');
    const [changelist, setchangelist] = useState(0);
    const [cartSummary, setCartSummary] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchResults() {
            const url = `/cart?userid=${userid}`;
            console.log(url);
            await axios.get(url).then(response => {
                const data = response.data;
                setCartElements(data);

                axios.get('/cartsummary/' + userid)
                    .then(response => {
                        setCartSummary(response.data);
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.error(error);
                        setIsLoading(false);
                    });

            }).catch(error => {
                console.error(error);
                setIsLoading(false);
            });

        }
        fetchResults();
    }, [changelist]);

    return (
        <>
<Header />
<div className="container-fluid bg-secondary mt-100 cart-container">
  <div className="row px-xl-5">
    <div className="col-lg-8 table-responsive mb-5" style={{ maxHeight: '500px', overflowY: 'auto' }}>
      {isLoading ? (
        <div className="text-center mt-5">
          <h2><i className="fas fa-spinner fa-spin"></i>Loading...</h2>
        </div>
      ) : (
        <>
          {cartElements.length === 0 ? (
            <div className="text-center mt-5">
              <h2><i className="fas fa-shopping-cart"></i>Your cart is empty</h2>
              <p>Start shopping now to add items to your cart</p>
            </div>
          ) : (
            <table className="table table-light table-borderless table-hover text-center mb-0">
              <thead className="thead-dark table-header">
                <tr>
                  <th><i className="fas fa-box"></i> Products</th>
                  <th><i className="fas fa-dollar-sign"></i> Price</th>
                  <th><i className="fas fa-truck"></i> Shipping</th>
                  <th><i className="fas fa-shopping-cart"></i> Quantity</th>
                  <th><i className="fas fa-dollar-sign"></i> Total</th>
                  <th><i className="fas fa-times-circle"></i> Remove</th>
                  <th><i className="fas fa-credit-card"></i> Checkout</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {cartElements.map((cartElement) => {
                  return (
                    <CartElement
                      key={cartElement._id}
                      productname={cartElement.productname}
                      productid={cartElement.productid}
                      quantity={cartElement.quantity}
                      price={cartElement.price}
                      imgurl={cartElement.imgurl}
                      cartelementid={cartElement._id}
                      setchangelist={setchangelist}
                      changelist={changelist}
                      shippingCost={cartElement.shippingprice}
                    />
                  );
                })}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
    <CartSummary

      className="col-lg-4"
    />
  </div>
</div>
<Footer />
        </>
    );
}