import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './style.scoped.css';
import axios from 'axios';

export default function Checkout({ show, setShow, single, cartelementid,cartelementsid, paymentemethod1,paymentemethod2 }) {
    const [paymentMethod, setPaymentMethod] = useState('cash'); // State to store selected payment method
    const [step, setStep] = useState(1); // State to track the current step

    const [countpurchasehand ,setcountpurchasehand]= useState(0);
    const [countpurchaseonline ,setcountpurchaseonline]= useState(0);

    function getCurrentDateTime() {
        const currentDate = new Date();
      
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
      
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        return formattedDateTime;
      }
    async function addsingleorder(paymentmethod,status,paymentstatus,paymentdate) {

        const data = {
        cartelementid:cartelementid,
        paymentmethod : paymentmethod,
        status : status,
        paymentstatus: paymentstatus,
        paymentdate: paymentdate
        }
        console.log(data);
        axios.post("/addsingleorder",data)
            .then(response => {
                remove() 
            })
            .catch(error => {
              console.log(error.response.data);
            });

    }

    async function remove() {
        axios.delete(`/cart/${cartelementid}`)
        .then(response => {
        })
        .catch(error => {
          console.log(error.response.data);
        });
    
    }



    async function remove_many(cartElementIds) {
        try {
          // Create an array of promises for each DELETE request
          const deletePromises = cartElementIds.map(id => axios.delete(`/cart/${id}`));
      
          // Wait for all promises to resolve
          await Promise.all(deletePromises);
      
          console.log('Cart elements deleted successfully');
        } catch (error) {
          console.error(error);
        }
      }
      



    async function addmultipleorder(paymentmethod,status,paymentstatus,paymentdate) {
        const data ={
            cartelementsid : cartelementsid,
            paymentmethod : paymentmethod,
            status: status,
            paymentstatus: paymentstatus,
            paymentdate:paymentdate
        }
        axios.post("/addmultipleorder",data)
            .then(response => {
                remove_many(cartelementsid)
            })
            .catch(error => {
              console.log(error.response.data);
            });

    }



    useEffect(()=>{
        if(countpurchasehand>0){

            if(single){
                addsingleorder("Cash on Hand",'awaiting_payment',false,"Pending");
            }
            else{
                addmultipleorder("Cash on Hand",'awaiting_payment',false,"Pending");
            }

        }


    },[countpurchasehand])



    useEffect(()=>{
        if(countpurchaseonline>0){

            if(single){
                addsingleorder("Online",'confirmed',true,getCurrentDateTime());
            }
            else{
                addmultipleorder("Online",'confirmed',true,getCurrentDateTime());
            }

        }


    },[countpurchaseonline])








    const handleClose = () => {
        setShow(false);
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
        setStep(1); // Reset step to 1 when payment method changes
    };

    const handleDelivery = () => {
        // Logic for delivery based on selected payment method
        if (paymentMethod === 'cash') {
           

            setcountpurchasehand(countpurchasehand+1);

        } else if (paymentMethod === 'creditCard') {
            
            setcountpurchaseonline(countpurchaseonline+1);
           
        
        }
    };



    const handleNextStep = () => {
        if (paymentMethod === 'creditCard' && step === 1) {
            setStep(2);
        }
    };

    const handleBack = () => {
        if (step === 2) {
            setStep(1);
        }
    };

    // Render content based on selected payment method and current step
    const renderContent = () => {
        if (paymentMethod === 'cash' && step === 1) {
            return (
                <div>
                    <p
                        style={{
                            fontSize: "18px",
                            color: "#333",
                            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                            fontStyle: "italic",
                            fontWeight: "bold",
                            marginBottom: "10px",
                            marginTop: "20px", // Added top margin
                        }}
                    >
                        Please pay in cash when the delivery arrives.
                    </p>
                    {/* Add additional content for cash payment */}
                </div>
            );
        } else if (paymentMethod === 'creditCard' && step === 1) {
            return (
                <div>
                    <Form className="payment-form">
                        <p
                            style={{
                                fontSize: "18px",
                                color: "#333",
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                                fontStyle: "italic",
                                fontWeight: "bold",
                                marginBottom: "10px",
                                marginTop: "20px", // Added top margin
                            }}
                        >
                            Click Next To Procced
                        </p>
                    </Form>
                </div>
            );
        } else if (paymentMethod === 'creditCard' && step === 2) {
            return (
                <div>
                    <main id="main">
                        <section id="right">
                            <form action="#">
                                <div id="form-card" className="form-field">
                                    <label htmlFor="cc-number">
                                        <i className="fas fa-credit-card"></i> Card number:
                                    </label>
                                    <input
                                        id="cc-number"
                                        maxLength="19"
                                        placeholder="1111 2222 3333 4444"
                                        required
                                    />
                                </div>

                                <div id="form-date" className="form-field">
                                    <label htmlFor="expiry-month">
                                        <i className="fas fa-calendar-alt "></i> Expiry date:
                                    </label>
                                    <div id="date-val">
                                        <select id="expiry-month " className='mr-3' required>
                                            <option value="" defaultValue="default" selected="selected">
                                                Month
                                            </option>
                                            {/* options here */}
                                        </select>
                                        <select id="expiry-year" required>
                                            <option value="" defaultValue="" selected="selected">
                                                Year
                                            </option>
                                            {/* options here */}
                                        </select>
                                    </div>
                                </div>

                                <div id="form-sec-code" className="form-field">
                                    <label htmlFor="sec-code">
                                        <i className="fas fa-lock"></i> Security code:
                                    </label>
                                    <input type="password" maxLength="3" placeholder="123" required />
                                </div>


                            </form>
                        </section>
                    </main>
                </div>
            );
        }
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    {step === 1 && (
                        <div>
                            <h4>Select Payment Method:</h4>
                            <Form.Select value={paymentMethod} onChange={handlePaymentMethodChange}>
                                <option value="cash">Cash</option>
                                <option value="creditCard">Credit Card</option>
                            </Form.Select>
                            {renderContent()}
                        </div>
                    )}
                    {step === 2 && (
                        <div>
                            <h2 className="checkout-form-header">Checkout Information</h2>
                            {renderContent()}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {step === 2 && (<>
                        <Button variant="secondary" onClick={handleBack}>
                            Back
                        </Button>
                        <Button variant="primary" onClick={handleBack}>
                        Delivery Now
                        </Button>
                        </>
                    )}
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>

                    {step === 1 && (
                        <Button variant="primary" onClick={handleDelivery} disabled={paymentMethod === 'creditCard'}>
                            Delivery Now
                        </Button>
                    )}
                    {step === 1 && (
                        <Button variant="primary" onClick={handleNextStep} disabled={paymentMethod === 'cash'}>
                            Next
                        </Button>
                    )}

                </Modal.Footer>
            </Modal>
        </div>
    );
};