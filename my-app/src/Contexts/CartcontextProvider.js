
import React from 'react'
import { createContext } from "react";
import { useImmerReducer } from 'use-immer'
import { useEffect } from 'react'
import axios from 'axios';

const cartContext = createContext(null);
const cartDispatchContext = createContext(null);

function CartcontextProvider({ children }) {
  const initialState = {
    orderscount: 0, 
    recounter:0
  }
  function ourReducer(draft, action) {
    switch (action.type) {
      case 'recount':
        draft.recounter++;
        return
      case 'setcount':
       draft.orderscount = action.value

      default:
        break;
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialState)


  useEffect(() => {

      async function fetchdata(){


  
      await axios.get(`/countcart?userid=${localStorage.getItem('_id')}`)
      .then(response => {
          dispatch({type:'setcount',value: response.data})
      })
      }

      fetchdata();


  }, [state.recounter])


  return (

    <>
      <cartContext.Provider value={state}>
        <cartDispatchContext.Provider value={dispatch}>
          {children}
        </cartDispatchContext.Provider>
      </cartContext.Provider>


    </>

  )
}
export { CartcontextProvider, cartContext, cartDispatchContext }







