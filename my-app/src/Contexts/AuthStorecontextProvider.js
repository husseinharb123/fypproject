/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { createContext } from "react";
import { useImmerReducer } from 'use-immer'
import { useEffect } from 'react'

const AuthStoreContext = createContext(null);
const AuthStoreDispatchContext = createContext(null);

function AuthStorecontextProvide({ children }) {

  const initialState = {
    isloggedin: Boolean(localStorage.getItem('storetoken')),
    storetoken: localStorage.getItem('storetoken') || '',
    _idstore: localStorage.getItem('_idstore') || '',
    adminFirstName: localStorage.getItem('adminFirstName') || '',
    adminLastName: localStorage.getItem('adminLastName') || '',
    adminEmail: localStorage.getItem('adminEmail') || '',
    signincount: 0,
    signoutcount: 0

  }
  function ourReducer(draft, action) {
    switch (action.type) {
      case 'login':
        draft.isloggedin = true
        draft.storetoken = action.value.token
        draft._idstore = action.value._id
        draft.adminFirstName = action.value.FirstName
        draft.adminLastName = action.value.LastName
        draft.adminEmail = action.value.Email
        draft.signincount++;
        return
      case "logout":
        draft.isloggedin = false
        draft.storetoken = ''
        draft._idstore = ''
        draft.adminFirstName = ''
        draft.adminLastName = ''
        draft.adminEmail = ''
        draft.signoutcount++;
        return

      default:
        break;
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialState)


  useEffect(() => {
    if (state.signincount) {
      localStorage.setItem('storetoken', state.storetoken)
      localStorage.setItem('_idstore', state._idstore)
      localStorage.setItem('adminFirstName', state.adminFirstName)
      localStorage.setItem('adminLastName', state.adminLastName)
      localStorage.setItem('adminEmail', state.adminEmail)

    }
  }, [state.signincount])

  useEffect(() => {
    if (state.signoutcount) {
      localStorage.removeItem('storetoken')
      localStorage.removeItem('_idstore')
      localStorage.removeItem('adminFirstName')
      localStorage.removeItem('adminLastName')
      localStorage.removeItem('adminEmail')

    }
  }, [state.signoutcount])


  return (

    <>
      <AuthStoreContext.Provider value={state}>
        <AuthStoreDispatchContext.Provider value={dispatch}>
          {children}
        </AuthStoreDispatchContext.Provider>
      </AuthStoreContext.Provider>


    </>

  )
}
export { AuthStorecontextProvide, AuthStoreContext, AuthStoreDispatchContext }







