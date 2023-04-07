import React from 'react';
import Category from '../../components/Category/Category';
import image1 from './categoryimages/1.png';
import image2 from './categoryimages/2.jpg';
import image3 from './categoryimages/3.jpg';
import image4 from './categoryimages/4.jpg';
import image5 from './categoryimages/5.jpg';
import image6 from './categoryimages/6.webp';
import image7 from './categoryimages/7.webp';
import image8 from './categoryimages/8.jpg';
import './Category.scoped.css';

export default function Categories() {
  const categories = [
    { categoryname: 'Apparel and accessories', url: image1 },
    { categoryname: 'Electronics', url: image2 },
    { categoryname: 'Home and garden', url: image3 },
    { categoryname: 'Beauty and personal care', url: image4 },
    { categoryname: 'Sports and fitness', url: image5 },
    { categoryname: 'Toys and games', url: image6 },
    { categoryname: 'Food and beverages', url: image7 },
    { categoryname: 'Health and wellness', url: image8 },
  ];

  return (
    <>
 <div className="container-fluid pt-5 bg-secondary">
        <h2 className="section-title position-relative text-uppercase w-100">
          <span className="bg-secondary pr-3">
            <span className="title-anim">
              Explore Our Categories
            </span>
          </span>
        </h2>
        <div className="row px-xl-5 pb-3">
          {categories.map((category, index) => (
            <Category
              key={index}
              categoryname={category.categoryname}
              url={category.url}
            />
          ))}
        </div>
      </div>
    </>
  );
}