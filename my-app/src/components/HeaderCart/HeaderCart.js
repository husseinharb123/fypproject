import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Contexts/CartcontextProvider';
import './HeaderCart.scoped.css'


export default function HeaderCart() {


    const state = useContext(cartContext);
    return (
        <>

            <Link to='/cart' style={{ textDecoration: "none", color: 'black' }}><div className="cart nav-item">
                <i className="fa fa-lg  badge-pill" value={state.orderscount} style={{ color: "black" }}>&#xf07a;</i>
                <span>0.00$</span>
            </div>
            </Link>


        </>
    )
}
