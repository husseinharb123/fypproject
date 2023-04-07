/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useContext,useEffect} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import './sigin.scoped.css'
import image from './logo.JPG'
import { useImmerReducer } from 'use-immer'
import { AuthContext, AuthDispatchContext } from '../../Contexts/AuthcontextProvider'

import axios from 'axios'

export default function Signin() {
  const state1 = useContext(AuthContext)
  const dispatch1 = useContext(AuthDispatchContext)


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
    submiterrormessage :''
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
        if (!draft.Email.value){
          draft.submitError = true;
          draft.submiterrormessage = 'you are  missing email'
        }
        else if (!draft.Password.value && !draft.Email.hasErrors)
        {
          draft.submitError = true;
          draft.submiterrormessage = 'you are  missing password'
        }
        else if (draft.Email.hasErrors){
          draft.submitError = true;
          draft.submiterrormessage = 'write the email properly'
        }
        else if  (!draft.Email.hasErrors) 
        {
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
    if (state.Email.value){
    const delay = setTimeout(()=>{
      dispatch({ type:"EmailDelay"})
    },800)

 return () => {clearTimeout(delay)}
    }

   
  }, [state.Email.value])

  useEffect(() => {
    if (state.submitCount) {
    async function fetchdata(){
      const url = '/signin'
      const body ={Email:state.Email.value,Password :state.Password.value}
      const response = await axios.post(url,body)
      dispatch({ type: "submiterror", value: response.data.responseSuccess })
      if (response.data.responseSuccess){
        dispatch1({ type:"login",value:response.data.userinfo})
        navigate('/')
      }
    }
    fetchdata()
  }
  }, [state.submitCount])
  

function handleSubmit(e){
e.preventDefault();
  dispatch({ type:'SubmitForm'})

}

  return (
    <>

      <div className="Auth-form-container ">
        <form className="Auth-form" >
          <div className="Auth-form-content">
            <div className="text-center">
              <Link rel="stylesheet" to="/" ><img src={image} alt="" srcSet="" className='logoimage' /></Link>
            </div>
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className={`form-control mt-1 ${state.Password.hasErrors && 'form-control-error border-danger'}`}
                placeholder="Enter email"
                onChange={(e) => { dispatch({ type: 'EmailImed', value: e.target.value }) }}
              />
            </div>
            <div> {state.Email.hasErrors ? <span className='text-danger small'>{state.Email.message}</span> : <span className='m-1'> </span>} </div>
            <div className="form-group mt-1">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={(e) => { dispatch({ type:'PasswordImed',value:e.target.value})}}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className={`btn ${state.submitError ? 'btn-danger' : 'btn-dark'}`} onClick={handleSubmit}>
                Submit
              </button>
              <div className='text-center'> {state.submitError ? <span className='text-danger small'>{state.submiterrormessage}</span> : <span className='m-1'> </span>} </div>
            </div>
            <p className=" text-center mt-2">
              have not  account <Link to="/signup" className='mycolin'>signup</Link>
            </p>
            <p className="forgot-password text-right mt-2">
              By signing in, you agree to our Terms of Use and Privacy Policy.
            </p>


          </div>
        </form>
      </div>










    </>
  )
}
