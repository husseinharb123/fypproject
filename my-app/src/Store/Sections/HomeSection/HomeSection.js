import React, { useEffect, useState } from 'react'
import Categories from '../../../main components/Categories/Categories'
import FeaturedProducts from '../../../main components/FeaturedProducts/FeaturedProducts'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './style.scoped.css'
export default function HomeSection() {


  const init = {
    featured:[],
    toprated:[]
  }
  const storeid = useParams().id
  const [data, setData] = useState(init);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/homesec/${storeid}`);

        const data = response.data
        setData(data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);








  return (
    <>
    
    <div class="animated-div">
  <h2>Welcome to our store!</h2>
  <p>Discover our amazing collection of products.</p>
</div>
          <FeaturedProducts data = {data.featured} title ={"FEATURED PRODUCTS"} />
          <FeaturedProducts data = {data.toprated} title ={"Top Rated"}/>
    
    </>
  )
}
