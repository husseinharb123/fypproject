import React, { useEffect, useState } from "react";
import { Link,  useParams } from "react-router-dom";
import axios from "axios";
import '../../CommonCSS/1.scoped.css'
export default function OrderActionSection() {



  const parm = useParams();
  const orderid = parm.orderid;
  const storeid = parm.id;
  console.log(orderid);
  const [orderStatus, setOrderStatus] = useState("");
  const [paid, setpaid] = useState(false);
  const [orderelements, setorderelements] = useState([]);
  const [orderinfo, setorderinfo] = useState({});
  const [subtotal, setsubtotal] = useState(0);
  const [total, settotal] = useState(0);
  const [shipping, setshipping] = useState(0);

  const handleStatusChange = (event) => {
    setOrderStatus(event.target.value);
  };

  function clickhandle() {
    try {
      const data = axios.post(`/changeorderstatus/${orderid}`, { status: orderStatus });
      console.log(data.message); // Order status updated successfully
    } catch (error) {
      console.log(error.response.data.error); // Order not found
    }
  }


  useEffect(() => {
    if (orderStatus === "awaiting_payment"){

      setpaid(false);
    }
  }, [orderStatus]);














  useEffect(() => {
    async function fetchResults() {
      const url = `/orderinfo?orderid=${orderid}`;
      console.log(url);
      try {
        const response = await axios.get(url);
        const data = response.data;
        setpaid(data.orderinfo.paymentstatus);
        setorderelements(data.orderelements);
        setorderinfo(data.orderinfo);
        setsubtotal(data.subtotal);
        settotal(data.total);
        setshipping(data.shipping);
      } catch (error) {
        console.error(error);
      }
    }
    fetchResults();
  }, []);

  useEffect(() => {
    const updateOrderPaymentStatus = async () => {
      try {
        const data = await axios.post(`/changeorderpaymentstatus/${orderid}`, {
          paymentstatus: paid,
        });
        console.log(data.message); // Order paymentstatus updated successfully
      } catch (error) {
        console.log(error.response.data.error); // Order not found
      }
    };
    updateOrderPaymentStatus();
  }, [paid]);



  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <Link className="btn btn-dark text-white" to={`/admin/${storeid}/orders`}>
            Back To Orders
          </Link>
        </div>
        <div className="card">
          <header className="card-header p-3 Header-green">
            <div className="row align-items-center ">
              <div className="col-lg-6 col-md-6">
                <span>
                  <i className="far fa-calendar-alt mx-2" />
                  <b className="text-white">{orderinfo.date}</b>
                </span>
                <br />
                <small className="text-white mx-3 ">Order ID: {orderid}</small>
              </div>
              <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                <select
                  className="form-select d-inline-block"
                  style={{ maxWidth: "200px" }}
                  value={orderStatus}
                  onChange={handleStatusChange}
                >
                  <option value="">Change Status:</option>
                  <option value="awaiting_payment">Awaiting Payment</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
                <Link className="btn btn-success ms-2" onClick={clickhandle}>
                  <i className="fas fa-exchange-alt" /> change{" "}
                </Link>
              </div>
            </div>
          </header>
          <div className="card-body">
            <div className="row mb-5 order-info-wrap">
              <div className="col-md-6 col-lg-4">
                <article className="icontext align-items-start">
                  <span className="icon icon-sm rounded-circle alert-success">
                    <i className="text-success fas fa-user" />
                  </span>
                  <div className="text">
                    <h6 className="mb-1">Customer</h6>
                    <p className="mb-1">
                      {orderinfo.name} <br />
                      <a href={`mailto:${orderinfo.email}`}>{orderinfo.email}</a>
                    </p>
                  </div>
                </article>
              </div>
              <div className="col-md-6 col-lg-4">
                <article className="icontext align-items-start">
                  <span className="icon icon-sm rounded-circle alert-success">
                    <i className="text-success fas fa-truck-moving" />
                  </span>
                  <div className="text">
                    <h6 className="mb-1">Order info</h6>
                    <p className="mb-1">
                      Pay method: {orderinfo.paymentmethod}
                    </p>
                  </div>
                </article>
              </div>
              <div className="col-md-6 col-lg-4">
                <article className="icontext align-items-start">
                  <span className="icon icon-sm rounded-circle alert-success">
                    <i className="text-success fas fa-map-marker-alt" />
                  </span>
                  <div className="text">
                    <h6 className="mb-1">Deliver to</h6>
                    <p className="mb-1">
                      Address: {orderinfo.location}
                      <br />
                    </p>
                  </div>
                </article>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-9">
                <div className="table-responsive">
                  <table className="table border table-lg">
                    <thead>
                      <tr>
                        <th style={{ width: "40%" }}>Product</th>
                        <th style={{ width: "20%" }}>Unit Price</th>
                        <th style={{ width: "20%" }}>Quantity</th>
                        <th className="text-end" style={{ width: "20%" }}>
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody >







                      {orderelements.map((orderelement) => {
                        return (
                          <>
                            <tr>
                              <td>
                                <Link className="itemside" href="/order">
                                  <div className="left">
                                    <img
                                      src={`http://localhost:8070/images/${orderelement.imgurl}`}
                                      alt="product"
                                      className="img-xs"
                                      style={{ width: "40px", height: "40px" }}
                                    />
                                  </div>
                                  <div className="info">
                                    {orderelement.productname}
                                  </div>
                                </Link>
                              </td>
                              <td>${orderelement.price}</td>
                              <td>{orderelement.quantity}</td>
                              <td className="text-end">${orderelement.total}</td>
                            </tr>
                          </>
                        );
                      })}




                      <tr>
                        <td colSpan={4}>
                          <article className="float-end">
                            <dl className="dlist">
                              <dt>Subtotal:</dt>
                              <dd>${subtotal}</dd>
                            </dl>
                            <dl className="dlist">
                              <dt>Shipping cost:</dt>
                              <dd>${shipping}</dd>
                            </dl>
                            <dl className="dlist">
                              <dt>Grand total:</dt>
                              <dd>
                                <b className="h5">${total}</b>
                              </dd>
                            </dl>
                            <dl className="dlist">

                              <dt className="text-muted">Status:</dt>
                              <dd>
                                <span
                                style={{width:"150px"}}
                                  className={`badge rounded-pill  ${paid ? 'alert alert-success text-success' : 'alert alert-danger text-danger'
                                    }`}

                                >
                                  {paid ? 'Payment done' : 'Payment not done'}
                                </span>
                              </dd>
                            </dl>
                          </article>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="box shadow-sm bg-light">
                  <button className="btn btn-success col-12" onClick={() => setpaid(true)}>MARK AS PAID</button>
                </div>
                <div className="box shadow-sm bg-light">
                  <button className="btn btn-danger col-12" onClick={() => setpaid(false)}>MARK AS UNPAID</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>;





    </>
  );
}
