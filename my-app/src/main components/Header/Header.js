import React from 'react'
import './Header.scoped.css'
import { Link } from 'react-router-dom'
import image from './logo.JPG'
import HeaderSignButton from '../../components/HeaderSignButton/HeaderSignButton'
import HeaderCart from '../../components/HeaderCart/HeaderCart'
import SearchBar from '../../components/SearchBar/SearchBar'

export default function Header() {
  

  return (
    <>
      <div className=" headercontainer edgef">
        <div className="header-p1 navbar ">
          <Link to="/" >
            <div className="logo nav-item ">
              <img src={image} alt="" srcSet="" />
            </div>
          </Link>


          <SearchBar/>
          <div className="department nav-item d-none d-md-block ">
  <Link to="/checkstore" className="header-links"><i className="fas fas fa-store"></i> CheckStores</Link>
</div>
<div className="department nav-item  d-none d-md-block " >
  <Link to="/buildstore" className="header-links"><i className="fas fa-building"></i> BuildStore</Link>
</div>

          < HeaderCart />


          <Link to='/OrderWish' style={{ textDecoration: "none" }}> <div className="orders nav-item d-none d-md-flex  " >
            <svg
              className="svg-icon mychart"
              style={{ width: "2em", height: "2em", verticalAlign: "middle", fill: "currentColor", overflow: "hidden", }}
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M402.773 85.333h66.56v44.373h-46.080c-17.067 0-30.72 13.653-30.72 32.427 0 17.067 13.653 32.427 30.72 32.427h186.027c17.067 0 30.72-13.653 30.72-32.427 0-17.067-13.653-32.427-30.72-32.427h-46.080v-44.373h68.267c17.067 0 30.72-13.653 30.72-32.427 0-17.067-13.653-32.427-30.72-32.427h-228.693c-17.067 0-30.72 13.653-30.72 32.427 1.707 18.773 15.36 32.427 30.72 32.427v0zM266.24 366.933c0 20.48 13.653 37.547 30.72 37.547h440.32c17.067 0 30.72-17.067 30.72-37.547s-13.653-37.547-30.72-37.547h-440.32c-17.067 0-30.72 17.067-30.72 37.547v0zM266.24 541.013c0 20.48 13.653 37.547 30.72 37.547h440.32c17.067 0 30.72-17.067 30.72-37.547s-13.653-37.547-30.72-37.547h-440.32c-17.067 0-30.72 17.067-30.72 37.547v0zM266.24 711.68c0 20.48 13.653 37.547 30.72 37.547h269.653c17.067 0 30.72-17.067 30.72-37.547s-13.653-37.547-30.72-37.547h-269.653c-17.067 0-30.72 17.067-30.72 37.547v0zM960.853 814.080c0 0 0-600.747 0-602.453-1.707-17.067-5.12-34.133-11.947-47.787-13.653-30.72-35.84-49.493-56.32-59.733-29.013-15.36-58.027-17.067-61.44-17.067 0 0 0 0 0 0h-52.907c-17.067 0-30.72 13.653-30.72 30.72s-1.707 42.667 13.653 47.787h52.907c1.707 0 18.773 1.707 34.133 10.24 20.48 11.947 32.427 30.72 34.133 59.733 0 3.413 0 616.107 0 616.107 0 44.373-34.133 80.213-75.093 80.213h-581.973c-40.96 0-75.093-35.84-75.093-80.213 0 0 0-612.693 0-616.107 3.413-29.013 15.36-47.787 34.133-59.733 17.067-10.24 32.427-10.24 34.133-10.24h52.907c20.48-10.24 13.653-30.72 13.653-47.787s-13.653-30.72-30.72-30.72v0h-52.907c0 0 0 0 0 0-3.413 0-30.72 0-61.44 17.067-29.013 15.36-63.147 47.787-68.267 112.64 0 1.707 0 3.413 0 5.12 0 1.707 0 3.413 0 5.12v640c0 76.8 61.44 139.947 136.533 139.947h616.107c75.093 0 136.533-61.44 136.533-139.947 0 0 0-20.48 0-52.907v0zM590.507 902.827c5.12 5.12 11.947 8.533 18.773 8.533s13.653-3.413 18.773-8.533l186.027-180.907c10.24-10.24-6.827-27.307-17.067-39.253-10.24-10.24-22.187-18.773-39.253 0l-150.187 145.067-42.667-40.96c-10.24-10.24-27.307-10.24-39.253 0-10.24 10.24-30.72 22.187 0 56.32l64.853 59.733zM590.507 902.827z" />
            </svg>
            <div className="signin nav-item " >
              <p>Wishlist</p>
              <p>&Orders</p>
            </div>
          </div>
          </Link>


          <HeaderSignButton />

        </div>
      </div>
    </>
  );
}
