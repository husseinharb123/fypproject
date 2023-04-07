import React, { useEffect } from 'react';
import image from './product-1.jpg';
import './OrderElement.scoped.css';

export default function OrderElement({
  date,
  arrivaldate,
  status,
  productname,
  price,
  productid,
  orderid,
  imgurl,
}) {
  return (
    <tr>
      <td className="align-middle font-weight-bolder">
        <img src={image} alt="" style={{ width: '50px' }} />
        {productname}
      </td>
      <td className="align-middle font-weight-bolder">{price}</td>
      <td className="align-middle font-weight-bolder">{date}</td>
      <td className="align-middle font-weight-bolder">{arrivaldate}</td>
      <td className={`align-middle font-weight-bolder text-${status === 'Shipped' ? 'primary' : status === 'Delivered' ? 'success' : 'danger'}`}>
        <i className={`fas ${status === 'Shipped' ? 'fa-truck' : status === 'Delivered' ? 'fa-check-circle' : 'fa-times-circle'}`} />
        {status}
      </td>
      <td>
        <button className="btn btn-block btn-dark font-weight-bold my-3 py-3 rounded">
          <i className="fas fa-pencil-alt mr-2" />
          {'Action'}
        </button>
      </td>
    </tr>
  );
}