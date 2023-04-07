import React, { useEffect } from 'react';
import axios from 'axios';
import './OrderandWish.scoped.css';
import OrderElement from '../../components/OrderElement/OrderElement';

export default function OrderTable() {
  const [orderElements, setOrderElements] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const userid = localStorage.getItem('_id');

  useEffect(() => {
    async function fetchResults() {
      const url = `/orderlist?userid=${userid}`;
      console.log(url);
      setIsLoading(true);
      try {
        const response = await axios.get(url);
        const data = response.data;
        setOrderElements(data);
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
        setIsLoading(false);
          }, 200); 
        
      }
    }
    fetchResults();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="text-center mt-5">
          <h2>Loading... <i className="fas fa-spinner fa-spin"></i></h2>
        </div>
      ) : orderElements.length > 0 ? (
        <div className="table-container">
          <table className="table table-light table-borderless table-hover text-center mb-0">
            <thead className="thead-dark">
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Date</th>
                <th>Arrival Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {orderElements.map((orderElement, index) => (
                <OrderElement
                  key={index}
                  date={orderElement.date}
                  arrivaldate={orderElement.arrivaldate}
                  status={orderElement.status}
                  productname={orderElement.productname}
                  price={orderElement.price}
                  productid={orderElement.productid}
                  orderid={orderElement._id}
                  imgurl={orderElement.imgurl}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center mt-5">
          <h2>You don't have any orders yet</h2>
          <p>Start shopping now to place your first order</p>
        </div>
      )}
    </>
  );
}