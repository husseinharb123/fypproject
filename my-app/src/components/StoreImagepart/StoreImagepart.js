import React from 'react'
import {Link} from 'react-router-dom'
import image from './carousel-2.jpg'
import './product.scoped.css'
export default function product() {
  return (

<>
   <div className="container-fluid">
        <div className="row px-xl-5">
            <div className="col-lg-8">
                <div id="header-carousel" className="carousel slide carousel-fade " data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item position-relative active" style={{height: '430px'}}>
                            <img className="position-absolute w-100 h-100" src={image} style={{objectFit: 'cover'}} alt=''/>
                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <div className="p-3" style={{maxWidth: '700px'}}>
                                    <Link className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp" to="#">Shop Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="product-offer mb-30" style={{height: '200px'}}>
                    <img className="img-fluid" src={image} alt=""/>
                    <div className="offer-text">
                        <h6 className="text-white text-uppercase">Save 20%</h6>
                        <h3 className="text-white mb-3">Special Offer</h3>
                        <Link to="" className="btn btn-primary">Shop Now</Link>
                    </div>
                </div>
                <div className="product-offer mb-30" style={{height: '200px'}}>
                    <img className="img-fluid" src={image} alt=""/>
                    <div className="offer-text">
                        <h6 className="text-white text-uppercase">Save 20%</h6>
                        <h3 className="text-white mb-3">Special Offer</h3>
                        <Link to="" className="btn btn-primary">Shop Now</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
 

</>
    )
}
