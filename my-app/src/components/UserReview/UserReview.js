import React from 'react'
import './ReviewDescribeProduct.scoped.css'
import StarRating from '../Starrating/StarRating'


export default function UserReview({name,review,rating}) {



  return (
    <>
      <div className="media mb-4">
        <div className="media-body">
          <h6>{name}<small> - <i>01 Jan 2045</i></small></h6>
          <StarRating float={true} rating={rating}/>
          <p className='w-100'>{review} </p>
        </div>
      </div>
    

    </>
  )
}
