import React from 'react'
import '../../CommonCSS/1.scoped.css'
import image from './product-1.jpg'
import { Link } from 'react-router-dom'
import axios from 'axios';

export default function ProductCart({productid,productprice,productname,imgurl,productsFilter, setProductsFilter,setcount}) {



    function handleDelete() {
        const isConfirmed = window.confirm("Are you sure you want to delete?");

        if (isConfirmed) {
            
            // Perform delete operation
            axios.post(`/deleteproduct/${productid}`)
                .then(response => {
                    setcount((prev) => prev + 1);
                })
                .catch(error => {
                    // Handle error response
                    console.error(error);
                });
        }
    }






    return (
        <>
            <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
                <div className="card card-product-grid shadow-sm">
                    <Link className="img-wrap" href="/products"><img src={`http://localhost:8070/images/${imgurl}`} alt="Product" /></Link>
                    <div className="info-wrap">
                        <Link className="title text-truncate" to="/products"
                        >{productname}
                        </Link>
                        <div className="price mb-2">${productprice}</div>
                        <div className="row">
                            <Link
                                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
                                href="/product/1/edit"
                            >
                                <i className="fas fa-pen"></i>
                            </Link>
                            <button
                                onClick={handleDelete}
                                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
                            >
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
