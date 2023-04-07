import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function RecievedOrderElement ({email, total, paymentStatus,paymentdate, deliveryStatus, date,orderid })  {

  const  changecolor = (paymentStatus) => {
    if (paymentStatus!== "Delivered"){
      return false ;
    }
    return true
  };

  return (
    <tr>
      <td>
        <b>{orderid}</b>
      </td>
      <td>{email}</td>
      <td>{total}</td>
      <td>
        {paymentStatus}
      {Boolean(paymentStatus) ? (
  <span className="badge rounded-pill alert-success text-success">
    Paid At {paymentdate}
  </span>
) : (
  <span className="badge rounded-pill alert-danger text-danger">
    Not paid
  </span>
)}
      </td>
      <td>{date}</td>
      <td>
        {changecolor ? (
          <span className="badge btn-success">{deliveryStatus}</span>
        ) : (
          <span className="badge btn-dark">{deliveryStatus}</span>
        )}
      </td>
      <td className="d-flex justify-content-end align-item-center">
        <Link className="text-success" to={`order/${orderid}/action`}>
          <i className="fas fa-eye" />
        </Link>
      </td>
    </tr>
  );
};

