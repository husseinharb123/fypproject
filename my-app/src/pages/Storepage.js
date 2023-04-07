import React from 'react'

import FeatureProducts from '../main components/FeaturedProducts/FeaturedProducts'
import Footer from "../main components/Footer/Footer";
import Header from "../main components/Header/Header";
import StoreImagepart from '../components/StoreImagepart/StoreImagepart'
import Categories from '../main components/Categories/Categories';

export default function Storepage() {
  return (
    <>
      <Header />
      <StoreImagepart />
      <Categories />
      <FeatureProducts />
      <Footer />

    </>
  )
}
