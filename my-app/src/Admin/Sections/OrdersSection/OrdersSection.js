import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image from './product-2.jpg';
import './OrdersSection.scoped.css'
import '../../CommonCSS/1.scoped.css'
import RecievedOrderElement from "../../components/RecievedOrderElement/RecievedOrderElement";
import axios from "axios";
export default function OrdersSection() {

  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [orderStatus, setOrderStatus] = useState("");
  const [sortType, setSortType] = useState("");
  const [countit ,setcountit] = useState(0);
  const storeid = localStorage.getItem('_idstore');
  useEffect(() => {
    async function fetchResults() {
      const url = `/recievedorders?orderid=${searchQuery}&page_number=${currentPage}&orderStatus=${orderStatus}&sortType=${sortType}&store_filter=${storeid}`;
      console.log(url);
      await axios.get(url).then(response => {
        const data = response.data;
        setOrders(data.results);
        setTotalPages(data.totalPages);

      }).catch(error => {
        console.error(error);
      });
    };
    fetchResults();
  }
    , [sortType,orderStatus,countit]);

   function  handleclickit(e){
    e.preventDefault()
    setcountit(countit+1)
    }





  const handleStatusChange = (event) => {
    setOrderStatus(event.target.value);
    setCurrentPage(1);
  }

  // add the following handleSortChange function
  const handleSortChange = (event) => {
    setSortType(event.target.value);
    setCurrentPage(1);
  }

  // add the following handlePageChange function
  const handlePageChange = (page) => {
    setCurrentPage(page);
  }





  return (
    <>

      <section className="content-main">
        <div className="content-header">


          <h2 className="content-title">Orders</h2>
        </div>
        <div className="card mb-4 shadow-sm">
          <header className="card-header bg-white">
            <div className="row gx-3 py-3">
              <div className="col-lg-4 col-md-6 me-auto">

                <div className="input-group">
                  <input
                    type="search"
                    placeholder="Search..."
                    className="form-control p-2 ui-autocomplete-input"
                    autoComplete="off"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="btn btn-outline-secondary" type="button" onClick ={handleclickit}>
                    <i className="bi bi-search"></i>
                  </button>

                </div>
              </div>
              <div className="col-lg-2 col-6 col-md-3">
                <select
                  id="status-select"
                  className="form-select"
                  value={orderStatus}
                  onChange={handleStatusChange}
                >
                  <option value="">Order Status:</option>
                  <option value="awaiting_payment">Awaiting Payment</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>


              </div>
              <div className="col-lg-2 col-6 col-md-3">
                <select
                  id="sort-select"
                  className="form-select"
                  value={sortType}
                  onChange={handleSortChange}
                >
                  <option value="">Sort By:</option>
                  <option value="recent">Most Recent Order</option>
                  <option value="least">Least Recent Order</option>
                </select>

              </div>

            </div>
            {orders.length > 0 ? (
              <div className="heading-3 mb-30 " >Currently on page {currentPage} of {totalPages} </div>
            ) : (
              <></>
            )}


          </header>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th >OrderID</th>
                    <th scope="col">Email</th>
                    <th scope="col">Total</th>
                    <th scope="col">Paid</th>
                    <th scope="col">Date</th>
                    <th>Status</th>
                    <th scope="col" className="text-end">
                      Action
                    </th>

                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map((order) => {
                      return <RecievedOrderElement
                        email={order.email}
                        total={order.total}
                        paymentStatus={order.paymentstatus}
                        paymentdate={order.paymentdate}
                        deliveryStatus={order.status}
                        date={order.date}
                        orderid={order.orderid}


                      />;
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No orders found.
                      </td>
                    </tr>
                  )}

                </tbody>
              </table>

              {orders.length > 0 ? (



                <nav className="float-end mt-4" aria-label="Page navigation">
                  <ul className="pagination">
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li key={i} className="page-item">
                        <button
                          className={`page-link${currentPage === i + 1 ? ' active' : ''}`}
                          onClick={() => handlePageChange(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>


              ) : (
                <></>
              )}


            </div>
          </div>
        </div>
      </section>
    </>
  );
}
