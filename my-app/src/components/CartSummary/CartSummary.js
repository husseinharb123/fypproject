import React, { useEffect, useState } from 'react'
import './CartSummary.scoped.css'
import Checkout from '../Checkout/Checkout';
import axios from 'axios';
export default function CartSummary() {



    const [show, setShow] = useState(false);
    const [storenames, setstorenames] = useState([])
    const [cartelementsid, setcartelementsid] = useState([])
    const [selectedstore , setselectedstore] = useState('')
    const  [summary ,setsummary] = useState({}); 

    const handleShow = () => {
        setShow(true);

    };



    useEffect(() => {

        const apiUrl = '/storenames';

        // Define the specific `userid` for the request
        const userid = localStorage.getItem('_id')

        // Make the Axios GET request
        axios.get(`${apiUrl}/${userid}`)
            .then(response => {
                // Handle successful response
                setstorenames(response.data)
                // Process the `storenames` data as needed
            })
            .catch(error => {
                // Handle error
                console.error('Error fetching store names:', error);
                // Handle the error as needed
            });

    }, [])

    useEffect(() => {
        const getCartElements = async () => {
          try {
            const user_id = localStorage.getItem('_id'); // Replace with actual user ID
            const store_id = selectedstore; // Replace with actual store ID
            const response = await axios.get('/cartofstore', {
              params: {
                userid: user_id,
                storeid: store_id
              }
            });
            setcartelementsid(response.data);
            console.log(response.data);
          } catch (error) {
            console.error('Error fetching cart elements:', error);
          }
        };
    
        getCartElements();
      }, [selectedstore]);



      useEffect(() => {
        const getCartElements = async () => {
          try {
            const user_id = localStorage.getItem('_id'); // Replace with actual user ID
            const store_id = selectedstore; // Replace with actual store ID
            const response = await axios.get('/cartsummarys', {
              params: {
                userid: user_id,
                storeid: store_id
              }
            });
            setsummary(response.data);
            console.log(response.data);
          } catch (error) {
            console.error('Error fetching cart elements:', error);
          }
        };
    
        getCartElements();
      }, [selectedstore]);












    return (
        <>






            <div className="col-lg-4">
                <h5 className="section-title position-relative text-uppercase mb-3">
                    <span className="bg-secondary pr-3">
                        <i className="fas fa-shopping-cart"></i> Cart Summary
                    </span>
                </h5>
                <div className="bg-light p-30 mb-5">
                    <div className="border-bottom pb-2">

                        <select className="form-select btn-secondary mb-30 rounded" aria-label="Default select example" 
                        value={selectedstore} onChange={(e)=>setselectedstore(e.target.value)}
                        >

                            <option value="">Select the store</option>
                            {storenames.map(store => (
                                <option key={store.store_id} value={store.store_id}>
                                    {store.store_name}
                                </option>
                            ))}


                        </select>

                        <div className="d-flex justify-content-between mb-3">
                            <h6><i className="fas fa-list"></i> Subtotal</h6>
                            <h6>${summary.subcost}</h6>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h6 className="font-weight-medium"><i className="fas fa-truck"> </i>  Shipping</h6>
                            <h6 className="font-weight-medium">${summary.totalshipping}</h6>
                        </div>
                    </div>

                    <div className="pt-2">
                        <div className="d-flex justify-content-between mt-2">
                            <h5><i className="fas fa-money-bill-wave"> </i>  Total</h5>
                            <h5>${summary.totalcosts}</h5>
                        </div>
                        <button className="btn btn-block btn-dark font-weight-bold my-3 py-3 rounded" onClick={handleShow}
                        
                        
                                disabled={!Boolean(selectedstore)}
                            
                        >
                            <i className="fas fa-credit-card">  </i>  Proceed To Checkout
                            
                        </button>
                    </div>
                </div>
            </div>

            <Checkout show={show} setShow={setShow} cartelementsid={cartelementsid} />




        </>
    )
}
