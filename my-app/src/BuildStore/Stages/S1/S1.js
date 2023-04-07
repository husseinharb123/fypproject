import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import StatusBar from '../../Components/StatusBar/StatusBar'
import image from './logo.JPG'
import './S1.scoped.css'
import { BuildStoredispatchcontext } from '../../../Contexts/BuildStorecontextProvider'
import { useImmerReducer } from 'use-immer'
import axios from 'axios'

export default function S1() {
    const dispatch = useContext(BuildStoredispatchcontext)
    const navigate = useNavigate();
    const intialstate = {
        storename:  '',
        haserror: false,
        isunique: true,
        errormsg: '',
        checkcount: 0,
    }
    function ourReducer(draft, action) {
        switch (action.type) {
            case 'storenameimd':
                draft.haserror = false
                draft.storename = action.value
                break;
            case 'storenamedelay':
                if (draft.storename.length < 3) {
                    draft.haserror = true;
                    draft.errormsg = 'store name must be at least 3 characters'
                    return
                }
                if (draft.storename.length > 20) {
                    draft.haserror = true;
                    draft.errormsg = 'store name must be less than 20 characters'
                    return
                }
                if (!draft.haserror ) {
                    draft.isunique = true;
                    draft.checkcount++;
                }
                break;

            case 'storenameunique':
                if (action.value) {
                    draft.isunique = false
                    draft.haserror = true
                    draft.errormsg = 'store name already exist'
                }
                else{
                    draft.submitcount++;
                }
                break;
            case 'submiterror':
                draft.haserror = true;
                draft.errormsg = 'provide a name for the store'
                break 
            default:
                break;
        }
    }

    const [state1, dispatch1] = useImmerReducer(ourReducer, intialstate)

    useEffect(() => {
        if (state1.storename) {
            const delay = setTimeout(() => { dispatch1({ type: 'storenamedelay' }) }, 800);
            return () => { clearTimeout(delay) }
        }
    }
        , [state1.storename])


    useEffect(() => {
        async function fetchdata() {
            try {
                const url = '/CheckifstorenameExist'
                const body = { storename: state1.storename }
                const response = await axios.post(url, body)
                dispatch1({ type: 'storenameunique', value: response.data })
            } catch (error) {
                console.log(error);
            }

        }
        if (state1.checkcount) { fetchdata() }

    }, [state1.checkcount])



    function handleit(e) {
        e.preventDefault();
        if (!state1.haserror && state1.storename && state1.isunique) { dispatch({ type: 'setstorename', value: state1.storename }) ; }
        if (!state1.storename){dispatch1({type:'submiterror'})}

    }

    return (
        <>


                <div className="main">
                    <section className="signup">

                        <div className="container">

                            <div className="signup-content">
                                <div className='text-center'><Link rel="stylesheet" to="/" ><img src={image} alt="" srcSet="" className='logoimage' /></Link></div>
                                <StatusBar stage={1} />
                                <form method="POST" id="signup-form" className="signup-form">
                                    <h2 >Create a store</h2>
                                    <div className="form-group">
                                        <input type="text" className={`form-input ${state1.haserror && 'border-danger'}`} name="name" id="name" value ={state1.storename} placeholder="Store Name" onChange={(e) => dispatch1({ type: 'storenameimd', value: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <button onClick={handleit} >create store</button> {state1.haserror ? <span className='text-danger small'>{state1.errormsg}</span> : <span className='m-1'> </span>}
                                    </div>
                                </form>
                                <p className="loginhere">
                                already Have a store ? <Link to="/storelogin" className="loginhere-link">Enter here</Link>
                                </p>
                            </div>
                        </div>
                    </section>

                </div>
        </>
    )
}
