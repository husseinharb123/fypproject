import React, { useContext, useEffect, useState } from 'react'
import image from './product-4.jpg'
import './CartElement.scoped.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { cartDispatchContext } from '../../Contexts/CartcontextProvider';
import Checkout from '../Checkout/Checkout';



export default function CartElement({ productname, productid, quantity, price, imgurl, shippingCost, cartelementid ,setchangelist ,changelist}) {
    const [Quantity, setQuantity] = useState(quantity);
    const [single ,setsingle] = useState(true)
    const [show, setShow] = useState(false);
    const handleShow = () => {
      setsingle(true)
      setShow(true);
      
    };
    const dispatch = useContext(cartDispatchContext);

    useEffect(() => {
        updatquantity(Quantity);

    }, [Quantity]);

    const increaseQuantity = () => {
        setQuantity(Quantity + 1);

    };

    const decreaseQuantity = () => {
        if (Quantity > 1) {
            setQuantity(Quantity - 1);
            setchangelist(changelist+1);
        }
    };

    async function updatquantity() {
        axios.put(`/cart/${cartelementid}`, {
            quantity: Quantity
          })
            .then(response => {
              console.log(response.data);
              setchangelist(changelist+1);
            })
            .catch(error => {
              console.log(error.response.data);
            });

    }



async function remove() {
    axios.delete(`/cart/${cartelementid}`)
    .then(response => {
        setchangelist(changelist+1);
        dispatch({type:"recount"});
      console.log(response.data);
    })
    .catch(error => {
      console.log(error.response.data);
    });

}


const totalPrice = (price * Quantity) + shippingCost;

return (
    <>
<tr>
  <td className="align-middle">
    <img src={`http://localhost:8070/images/${imgurl}`} alt="" style={{ width: "50px" }} />
    <Link to={`/productdetail/${productid}`} style={{ color: 'black' }}>
      {productname}
    </Link>
  </td>
  <td className="align-middle">${price}</td>
  <td className="align-middle">${shippingCost}</td>
  <td className="align-middle">
    <div className="input-group quantity mx-auto" style={{ width: "100px" }}>
      <div className="input-group-btn">
        <button className="btn btn-sm btn-dark btn-minus rounded" onClick={decreaseQuantity}>
          <i className="fa fa-minus"></i>
        </button>
      </div>
      <input type="text" className="form-control form-control-sm bg-secondary border-0 text-center rounded" value={Quantity} readOnly />
      <div className="input-group-btn rounded">
        <button className="btn btn-sm btn-dark btn-plus rounded" onClick={increaseQuantity}>
          <i className="fa fa-plus"></i>
        </button>
      </div>
    </div>
  </td>
  <td className="align-middle">${totalPrice}</td>
  <td className="align-middle">
    <button className="btn btn-sm rounded" onClick={remove}>
      <i className="fa fa-times"></i>
    </button>
  </td>
  <td>
    <button className="btn btn-block btn-dark font-weight-bold my-3 py-3 rounded" onClick={handleShow}>
      <i class="fa fa-credit-card"></i> Checkout
    </button>
  </td>
</tr>
<Checkout show={show} setShow={setShow} single={single } cartelementid={cartelementid}/>
    </>
);
  };
