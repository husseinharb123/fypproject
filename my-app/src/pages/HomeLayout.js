import React from 'react'
import { useEffect } from 'react';
import Header from '../main components/Header/Header.js';
import Footer from "../main components/Footer/Footer.js";
import Services from '../main components/services/services'
import Slideshow from '../components/Slide show/Slideshow.js';
import { Link } from 'react-router-dom';
import Categories from '../main components/Categories/Categories.js';

export default function HomeLayout() {

  
  return (
    <>
      <div>
        <Header />
      <Slideshow />
      <Categories />
      <Services />
      <Footer /></div>

    </>
  );
}
