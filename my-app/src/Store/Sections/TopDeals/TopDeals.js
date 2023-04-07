import React, { useEffect, useState } from 'react'
import './CategoryProducts.scoped.css'
import TopDeal from '../../components/TopDeal/TopDeal'
import { useParams } from 'react-router-dom';
import axios from 'axios';
export default function TopDeals() {


  const storeid = useParams().id
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/deals/${storeid}`);

        const data = response.data
        console.log(data);
        setData(data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);




  return (
    <>


      <div className="container-fluid mt-2 mb-5 bg-secondary  bg-gradient">
        <div className="tab-content" id="myTabContent">
          <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <div className="d-flex justify-content-between p-3 bg-white mb-3 align-items-center"> <h3 className="font-weight-bold text-uppercase">Top Deals</h3>
            </div>


            <div className="row g-4 ">

              {data.map(dealdata => {
                return <>
                  <TopDeal dealdata={dealdata} />
                </>


              })}


            </div>


          </div>

        </div>

      </div>








    </>
  )
}
