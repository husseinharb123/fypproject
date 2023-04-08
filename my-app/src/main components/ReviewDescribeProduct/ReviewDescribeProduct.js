import React, { useState } from "react";
import "./ReviewDescribeProduct.scoped.css";
import UserReview from "../../components/UserReview/UserReview";
import LeaveReview from "../../components/LeaveReview/LeaveReview";
import { useContext, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


export default function ReviewDescribeProduct({ userreviews, userreviewsnum, count, setCount }) {
  const useparm = useParams()
  let productid = useparm.id

  const isthere = userreviewsnum > 0 ? true : false

  return (
    <>
      <div className="row px-xl-5 bg-secondary p-30">
        <div className="col">
          <div className="bg-light p-30">
            <div  >
              <div className="row">
                <LeaveReview setCount={setCount} count={count} />

                <div className='col-md-6 columm'>
                  <div className="nav nav-tabs mb-4">Reviews({userreviewsnum})</div>
                  {isthere
                    ?
                    <div className="reviews-container" style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                      {userreviews.map(userreview => { return <UserReview name={userreview.username} rating={userreview.rating} review={userreview.review} /> })}
                    </div>
                    :
                    <div className="text-center"><strong>No comments yet</strong></div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}