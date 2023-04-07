import React from 'react'
import {Link} from 'react-router-dom'
import './Footer.scoped.css'


export default function Footer() {
  return (
    <>
        <footer className=" myfotr ">
      <section className="myfooter">
        <div className="container text-center text-md-start ">
          <div className="row">
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 mt-3">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <Link to="/storelogin" className="text-reset">Enter Your Store</Link>
              </p>
              <p>
                <Link to="#!" className="text-reset">React</Link>
              </p>
              <p>
                <Link to="#!" className="text-reset">Vue</Link>
              </p>
              <p>
                <Link to="#!" className="text-reset">Laravel</Link>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 mt-3">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <Link to="#!" className="text-reset" id="test"></Link>
              </p>
              <p>
                <Link to="#!" className="text-reset">Settings</Link>
              </p>
              <p>
                <Link to="#!" className="text-reset">Orders</Link>
              </p>
              <p>
                <Link to="#!" className="text-reset">Help</Link>
              </p>
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 mt-3">
              <h6 className="text-uppercase fw-bold mb-4" >Contact</h6>
              <p>
                <i className="fas fa-home me-3 text-secondary"></i>Lebanon,Beirut</p>
              <p>
                <i className="fas fa-envelope me-3 text-secondary"></i>hzh09@mail.aub.edu</p>
              <p>
                <i className="fas fa-phone me-3 text-secondary"></i>+961 81267980
              </p>

            </div>
          </div>
        </div>
      </section>
      <div
        className="text-center p-3 myfooter2">© 2022 Copyright:
        <Link className="text-reset fw-bold" to="#">  D-store</Link>
      </div>
    </footer>
    
    </>
  )
}
