/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { createContext } from "react";
import { useImmerReducer } from 'use-immer'
import { useEffect } from 'react'

const AuthContext = createContext(null);
const AuthDispatchContext = createContext(null);

function AuthcontextProvider({ children }) {
  const initialState = {

    isloggedin: Boolean(localStorage.getItem('token')),
    token: localStorage.getItem('token') || '',
    _id: localStorage.getItem('_id') || '',
    FirstName: localStorage.getItem('FirstName') || '',
    LastName: localStorage.getItem('LastName') || '',
    Email: localStorage.getItem('Email') || '',
    signincount: 0,
    signoutcount: 0

  }
  function ourReducer(draft, action) {
    switch (action.type) {
      case 'login':
        draft.isloggedin = true
        draft.token = action.value.token
        draft._id = action.value._id
        draft.FirstName = action.value.FirstName
        draft.LastName = action.value.LastName
        draft.Email = action.value.Email
        draft.signincount++;
        return
      case "logout":
        draft.isloggedin = false
        draft.token = ''
        draft._id = ''
        draft.FirstName = ''
        draft.LastName = ''
        draft.Email = ''
        draft.signoutcount++;
        return

      default:
        break;
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialState)


  useEffect(() => {
    if (state.signincount) {
      localStorage.setItem('token', state.token)
      localStorage.setItem('_id', state._id)
      localStorage.setItem('FirstName', state.FirstName)
      localStorage.setItem('LastName', state.LastName)
      localStorage.setItem('Email', state.Email)

    }
  }, [state.signincount])

  useEffect(() => {
    if (state.signoutcount) {
      localStorage.removeItem('token')
      localStorage.removeItem('_id')
      localStorage.removeItem('FirstName')
      localStorage.removeItem('LastName')
      localStorage.removeItem('Email')

    }
  }, [state.signoutcount])


  return (

    <>
      <AuthContext.Provider value={state}>
        <AuthDispatchContext.Provider value={dispatch}>
          {children}
        </AuthDispatchContext.Provider>
      </AuthContext.Provider>


    </>

  )
}
export { AuthcontextProvider, AuthContext, AuthDispatchContext }







