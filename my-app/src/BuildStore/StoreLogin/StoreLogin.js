import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import image from './logo.JPG'
import './StoreLogin.scoped.css'
import { useImmerReducer } from 'use-immer'
import axios from 'axios'
import { AuthStoreContext, AuthStoreDispatchContext } from '../../Contexts/AuthStorecontextProvider'

export default function StoreLogin() {

    const state1 = useContext(AuthStoreContext)
    const dispatch1 = useContext(AuthStoreDispatchContext)


    const navigate = useNavigate();
    const initialState = {
        Email: {
            value: '',
            hasErrors: false,
            message: '',
        },
        Password: {
            value: ''
        },
        submitCount: 0,
        submitError: false,
        submiterrormessage: ''
    }

    function ourReducer(draft, action) {
        switch (action.type) {
            case 'EmailImed':
                draft.Email.hasErrors = false
                draft.Email.value = action.value
                return
            case 'EmailDelay':
                if (!/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(draft.Email.value)) {
                    draft.Email.hasErrors = true;
                    draft.Email.message = 'ex: something@someserver.something'
                }
                return

            case 'PasswordImed':
                draft.Password.hasErrors = false
                draft.Password.value = action.value
                return


            case 'SubmitForm':
                draft.submitError = false
                if (!draft.Email.value) {
                    draft.submitError = true;
                    draft.submiterrormessage = 'you are  missing email'
                }
                else if (!draft.Password.value && !draft.Email.hasErrors) {
                    draft.submitError = true;
                    draft.submiterrormessage = 'you are  missing password'
                }
                else if (draft.Email.hasErrors) {
                    draft.submitError = true;
                    draft.submiterrormessage = 'write the email properly'
                }
                else if (!draft.Email.hasErrors) {
                    draft.submitCount++;
                }
                return
            case 'submiterror':
                if (!action.value) {
                    draft.submitError = true
                    draft.submiterrormessage = 'invalid email or password'
                }
                return
            default:
                break;
        }
    }


    const [state, dispatch] = useImmerReducer(ourReducer, initialState)

    useEffect(() => {
        if (state.Email.value) {
            const delay = setTimeout(() => {
                dispatch({ type: "EmailDelay" })
            }, 800)

            return () => { clearTimeout(delay) }
        }


    }, [state.Email.value])

    useEffect(() => {
        if (state.submitCount) {
            async function fetchdata() {
                const url = '/enterstore'
                const body = { Email: state.Email.value, Password: state.Password.value }
                const response = await axios.post(url, body)
                dispatch({ type: "submiterror", value: response.data.responseSuccess })
                if (response.data.responseSuccess) {
                    dispatch1({ type: "login", value: response.data.userinfo })
                    navigate(`/admin/${response.data.userinfo._id}`)
                }
            }
            fetchdata()
        }
    }, [state.submitCount])


    function handleSubmit(e) {
        e.preventDefault();
        dispatch({ type: 'SubmitForm' })

    }



























    return (
        <>

            <div className='stagescontainer'>
                <div className="main">
                    <section className="signup">

                        <div className="container">

                            <div className="signup-content">
                                <div className='text-center'><Link rel="stylesheet" to="/" ><img src={image} alt="" srcSet="" className='logoimage' /></Link></div>
                                
                                <form method="POST" id="signup-form" className="signup-form">
                                    <h2 >Enter Your Store</h2>
                                    <div className="form-group">
                                        <input type="text" className={`form-input mt-1 ${state.Password.hasErrors && 'form-control-error border-danger'}`} name="name" id="name"  placeholder="Admin Email"  
                                            onChange={(e) => { dispatch({ type: 'EmailImed', value: e.target.value }) }}
                                        />
                                    </div>
                                    <div> {state.Email.hasErrors ? <span className='text-danger small'>{state.Email.message}</span> : <span className='m-1'> </span>} </div>
                                <div className="form-group">
                                    <input type="text" className={`form-input `} name="name" id="name" placeholder="Password"
                                    
                                            onChange={(e) => { dispatch({ type: 'PasswordImed', value: e.target.value }) }}
                                    />
                                </div>
                                    <div className="form-group">
                                        <button onClick={handleSubmit}>Enter Store</button> 
                                    </div>
                                    <div className='text-center'> {state.submitError ? <span className='text-danger small'>{state.submiterrormessage}</span> : <span className='m-1'> </span>} </div>
                                </form>
                                <p className="loginhere">
                                   If You Don't Have One  ? <Link to="/buildstore" className="loginhere-link">Build now</Link>
                                </p>
                            </div>
                        </div>
                    </section>

                </div></div>
        </>
    )
}
