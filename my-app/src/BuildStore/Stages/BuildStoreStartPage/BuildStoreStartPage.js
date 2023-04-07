import React, { useContext } from 'react'
import './BuildStoreStartPage.scoped.css'
import { Link, useNavigate } from 'react-router-dom'
import image from '../../../main components/Header/logo.JPG'
import { BuildStorecontext, BuildStoredispatchcontext } from '../../../Contexts/BuildStorecontextProvider'


export default function BuildStoreStartPage() {
    const dispatch = useContext(BuildStoredispatchcontext)
    const nav = useNavigate()
    function handleit(e){
        e.preventDefault();
        dispatch({ type:'show1'})
    }


    return (
        <>
            <div className="landing">

                <div className="bg"></div>
                <div className="container landing-flex">
                    <div className="logo nav-item ">
                        <Link to='/'><img src={image} alt="" srcSet="" /></Link>
                    </div>
                    <h1 className="landing-title">
                        Build<br />Your<br /> Online Store.
                    </h1>
                    <button className="purchase-button" onClick={handleit}>
                        Start Now
        
                    </button>
                </div>
            </div>



        </>
    )
}
