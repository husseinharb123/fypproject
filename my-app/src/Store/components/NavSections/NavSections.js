import React, { useContext, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './NavSections.scoped.css'
import { ProductFilterDispatch } from '../../../Contexts/ProductsSearchResulTSContext';
export default function NavSections({ data }) {






    const storeid = useParams().id
    const navigate = useNavigate();
    const dispatch = useContext(ProductFilterDispatch);

    const [state1, setstate1] = useState('')

    const handleSearchFormSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: "updateproductname", value: state1 })
        dispatch({ type: 'updatestoreid', value: storeid })
        dispatch({ type: 'updatestorename', value: data.storename })
        dispatch({ type: "searchforit" })
        navigate('/search');
    };









    return (
        <>


            <nav className="navbar navbar-main navbar-expand-lg navbar-light border-bottom t1">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <Link className="nav-link" to="">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="aboutus">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="contactus">Contact us</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="topdeals">Top Deals</Link>
                            </li>

                            <li className="nav-item dropdown">
  <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    <i className="fas fa-credit-card"></i> Payment and Checkout
  </Link>
  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
    {Boolean(data.paymentopt1) && <li><Link className="dropdown-item" disabled><i className="far fa-credit-card"></i> Credit Cards</Link></li>}
    {Boolean(data.paymentopt2_) && <li><Link className="dropdown-item" disabled><i className="fas fa-money-bill-wave"></i> Cash on Hand</Link></li>}
  </ul>
</li>

<li className="nav-item dropdown">
  <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    <i className="fas fa-shipping-fast"></i> Shipping and Delivery
  </Link>
  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
    {Boolean( data.shippingopt1 )&& <li><Link className="dropdown-item" disabled><i className="fas fa-truck"></i> Standard Shipping</Link></li>}
    {Boolean( data.shippingopt2) && <li><Link className="dropdown-item" disabled><i className="fas fa-store"></i> In-Store Pickup</Link></li>}
  </ul>
</li>

                        </ul>

                        <div className="search-box">
                            <input className="search-input" type="text" onChange={(event) => setstate1(event.target.value)} placeholder={`Search in ${data.storename}`} />
                            <button className="search-btn"><i className="fas fa-search" onClick={handleSearchFormSubmit}></i></button>
                        </div>

                    </div>
                </div>
            </nav>


        </>
    )
}
