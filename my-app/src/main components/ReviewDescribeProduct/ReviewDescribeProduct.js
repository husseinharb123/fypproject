import React, { useState } from "react";
import "./ReviewDescribeProduct.scoped.css";
import UserReview from "../../components/UserReview/UserReview";
import LeaveReview from "../../components/LeaveReview/LeaveReview";
import { ProductDetailContext } from "../../Contexts/ProductDetailContextProvider";
import { useContext, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function ReviewDescribeProduct() {
  const useparm = useParams()
  let productid = useparm.id
  const initialstate = {
    listofuserreview: [],
    isthere: false
  }

  const [usersstate, updateusersstate] = useState(initialstate)

  const state = useContext(ProductDetailContext)

  useEffect(() => {
    updateusersstate(previous =>({...previous ,isthere:false}))

    async function fetchdata() {
      const url = `/usersreview/${productid}`
      const response = await axios.get(url)
      if (response.data.responseSuccess) {
        updateusersstate(previous => ({ ...previous, isthere: true ,listofuserreview : response.data.result }))
      }
    }
    fetchdata()

  }, [])




  return (
    <>
      <div className="row px-xl-5 bg-secondary p-30">
        <div className="col">
          <div className="bg-light p-30">
            <div  >
              <div className="row">
                <LeaveReview />

                <div className='col-md-6 columm'>
                  <div className="nav nav-tabs mb-4">Reviews({state.reviews})</div>
                  {usersstate.isthere
                    ?
                    <>
                      {usersstate.listofuserreview.map(userreview => { return <UserReview name={userreview.username} rating={userreview.rating} review={userreview.review} /> })}
                    </>

                    :
                    <div className="text-center" >   <strong>No comments yet</strong>  </div>
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