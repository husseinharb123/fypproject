import React from 'react'
import image2 from './1.jpg'
import image3 from './2.jpg'
import './HeaderProfile.scoped.css'
export default function HeaderProfile({data}) {










    
  return (
    <>
          <main>
              <div id="profile-upper">
                  <div id="profile-banner-image">
                      <img src={`http://localhost:8070/images/${data.storebackgroundid}`} alt="Banner " />
                  </div>
                  <div id="profile-d">
                      <div id="profile-pic">
                          <img src={`http://localhost:8070/images/${data.storeprofileid}`} alt='dfd' />
                      </div>
                      <div id="u-name" >{data.storename}</div>
                  </div>
              </div>
          </main>
    </>
  )
}
