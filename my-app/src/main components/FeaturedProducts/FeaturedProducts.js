import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Productl1.scoped.css'
import Featureproduct from '../../components/FeaturedProduct/FeaturedProduct'
export default function FeaturedProducts({data,title}) {


  useEffect(()=>{},[data]);
  return (

    

    <>
      <div className="container-fluid pt-5 pb-3">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">{title}</span></h2>
        <div className="row px-xl-5">

              {data.map(product => {
                return <>
                  <Featureproduct product={product}/>
                </>


              })}
        
        
        </div>
      </div>

    </>
  )
}
