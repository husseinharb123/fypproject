import React, { useContext, useEffect, useState } from 'react';
import Footer from '../main components/Footer/Footer';
import Header from '../main components/Header/Header';
import ProductDetail from '../main components/ProductDetail/ProductDetail';
import ReviewDescribeProduct from '../main components/ReviewDescribeProduct/ReviewDescribeProduct';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetailPage() {
  const { id } = useParams();

  const [loaded, setLoaded] = useState(true);
  const [productDetail, setProductDetail] = useState({});
  const [userReviews, setUserReviews] = useState([]);
  const [userReviewsNum, setUserReviewsNum] = useState(0);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState(0);
  const [rating,setrating] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const url = `/productdetail/${id}`;
      const response = await axios.get(url);
      setProductDetail(response.data);
      setrating(response.data)
      console.log(response.data.rating);
      setNext(next + 1);
    }
    fetchData();
  }, [count]);

  useEffect(() => {
    async function fetchData() {
      const url = `/productreview/${id}`;
      const response = await axios.get(url);
      setUserReviews(response.data.reviewslist);
      setUserReviewsNum(response.data.reviewcount);
      setrating(productDetail.rating)
    }
    fetchData();
  }, [next,count]);

  return (
    <>
      {loaded && (
        <>
          <Header />
          <div className="container-fluid pb-5">
            <ProductDetail
              productdetail={productDetail}
              userreviewsnum={userReviewsNum}
              count={count}
              setCount={setCount}
              rating = {rating}

            />
            <ReviewDescribeProduct
              userreviews={userReviews}
              userreviewsnum={userReviewsNum}
              count={count}
              setCount={setCount}
            />
          </div>
          <Footer />
        </>
      )}
    </>
  );
}