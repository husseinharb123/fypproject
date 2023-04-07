import React, { useReducer } from 'react'
import { useImmerReducer } from 'use-immer'

export default function CreateStore() {
    const initialstate = {}
  function ourReducer(draft,action){
    switch (action.type) {
        case 'value':
            break;
    
        default:
            break;
    }
  }
  const [state ,dispatch] = useImmerReducer(ourReducer,initialstate)
  
  return (
    <>
    
    
    
    
    
    
    </>
  )
}
