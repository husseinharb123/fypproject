import React, { useEffect, useState } from 'react'
import './AboutSection.scoped.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function AboutSection() {


    const storeid  = useParams().id
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('/store-settings', {
              params: { storeid: storeid }
            });
    
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
<div className="container">
<h1 className="page-title">About Our Store</h1>
<p>{data.aboutus1}</p>
<img className="main-image" src="https://images.unsplash.com/photo-1523908511403-7fc7b25592f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60" alt="product display"/>
<div className="main-text">
<h2 className="section-title">Our Team</h2>
<p>{data.aboutus2}</p>
<h2 className="section-title sub">Our Products</h2>
<p>{data.aboutus3}</p>
</div>
</div>
<footer className="footer">
<div className="footer-text">
<p>Thank you for choosing our store. If you have any feedback or questions, please don't hesitate to contact us. To stay updated on our latest products and promotions, be sure to follow us on social media.</p>
<p className="end">We appreciate your business and hope to see you again soon!</p>
<p className="copyright">© {new Date().getFullYear()} {data.storename} </p>
</div>
<div className="social">
<a href={data.facebookurl}     className="facebook icon"><i className="fab fa-facebook-f"></i></a>
<a href={data.twitterurl} className="twitter icon"><i className="fab fa-twitter"></i></a>
<a href={data.insturl} className="instagram icon"><i className="fab fa-instagram"></i></a>
</div>
</footer>
</>
)
}