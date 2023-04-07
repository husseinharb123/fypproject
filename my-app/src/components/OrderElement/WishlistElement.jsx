import React, { useContext } from 'react'
import image from'./product-1.jpg'
import './OrderElement.scoped.css'
import axios from 'axios';
import { cartDispatchContext } from '../../Contexts/CartcontextProvider';

export default function WishlistElement({
productname ,
price,
productid,
wishid,
imgurl,
subcount,
count
}) {


    const dispatch = useContext(cartDispatchContext);
 async function deletewish(){
    try {
        const response = await axios.post('/deletewish', {
          userid: localStorage.getItem('_id'),
          productid: productid
        });
        console.log(response.data); // Successfully deleted wishlist item
        subcount(count+1)
      } catch (error) {
        console.error(error);
        // TODO: show error message to user
      }

    
 }  
 


 async function movetocart(){
     
    try {
      const response = await axios.post('/postcart', {
        userid: localStorage.getItem('_id'),
        productid: productid
      });
        
      dispatch({type:"recount"});
      deletewish();
      subcount(count+2);
      
    } catch (error) {
      console.error(error);
      // TODO: show error message to user
    }


 }
return (
<tr>
<td className="align-middle font-weight-bolder">
<img src={`http://localhost:8070/images/${imgurl}`}alt="" style={{ width: "50px" }} />{" "}
{productname}
</td>
<td className="align-middle font-weight-bolder">{price}$</td>
<td>
<button className="btn btn-block btn-dark font-weight-bold my-2 py-2 rounded" onClick={deletewish}>
<i className="fas fa-trash"></i>  Remove
</button>
<button className="btn btn-block btn-dark font-weight-bold my-2 py-2 rounded" onClick={movetocart}>
<i className="fas fa-shopping-cart"></i>  Move to Cart
</button>
</td>
</tr>
);
}