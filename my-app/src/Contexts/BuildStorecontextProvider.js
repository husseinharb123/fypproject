import axios from 'axios'
import React, { createContext, useEffect } from 'react'
import { useContext } from 'react'
import { useImmerReducer } from 'use-immer'
import { AuthStoreDispatchContext } from './AuthStorecontextProvider'


const BuildStorecontext = createContext(null)
const BuildStoredispatchcontext = createContext(null)
function BuildStorecontextProvider({ children }) {
  const storeauthdispatch = useContext(AuthStoreDispatchContext)
  
  const initialstate = {
    start: {
      show: true
    },
    s1: {
      storename: '',
      show: false
    },
    s2: {
      Email: '',
      FirstName: '',
      LastName: '',
      Address: '',
      Phonenumber: '',
      Password: '',
      show: false
    },
    s3: {
      industry: '',
      deliveryopt1: '',
      deliveryopt2: '',
      deliveryopt3: '',
      show: false
    },
    createstorecount: 0,
    navigatecount:0,
    storeid:''
  }
  function ourReducer(draft, action) {
    switch (action.type) {
      case 'buildstorestart':
        draft.start.show = true
        draft.s1.show = false
        draft.s2.show = false
        draft.s3.show = false
        break;
      case 'show1':
        draft.start.show = false
        draft.s1.show = true
        draft.s2.show = false
        draft.s3.show = false
        break
      case 'show2':
        draft.start.show = false
        draft.s1.show = false
        draft.s2.show = true
        draft.s3.show = false
        break
      case 'show3':
        draft.start.show = false
        draft.s1.show = false
        draft.s2.show = false
        draft.s3.show = true
        break
      case 'setstorename':
        draft.s1.storename = action.value
        draft.start.show = false
        draft.s1.show = false
        draft.s2.show = true
        draft.s3.show = false
        break;
      case 'navcount':
        draft.storeid = action.value;
        draft.navigatecount++;
        
        break
      case 'setinformation':
        draft.s2.Email = action.value.Email
        draft.s2.FirstName = action.value.FirstName
        draft.s2.LastName = action.value.LastName
        draft.s2.Address = action.value.Address
        draft.s2.Phonenumber = action.value.Phonenumber
        draft.s2.Password = action.value.Password
        draft.start.show = false
        draft.s1.show = false
        draft.s2.show = false
        draft.s3.show = true
        break;
      case 'setaddinformation':
        draft.s3.industry = action.value.industry
        draft.s3.deliveryopt1 = action.value.deliveryopt1
        draft.s3.deliveryopt2 = action.value.deliveryopt2
        draft.s3.deliveryopt3 = action.value.deliveryopt3
        draft.createstorecount++;
        break;
      default:
        break;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialstate)


  useEffect(() => {
    if (state.createstorecount) {

      const data = {
        storename: state.s1.storename,
        Email: state.s2.Email,
        FirstName: state.s2.FirstName,
        LastName: state.s2.LastName,
        Address: state.s2.Address,
        Phonenumber: state.s2.Phonenumber,
        Password: state.s2.Password,
        industry: state.s3.industry,
        deliveryopt1: state.s3.deliveryopt1,
        deliveryopt2: state.s3.deliveryopt2,
        deliveryopt3: state.s3.deliveryopt3,

      }


      async function fetchdata() {
        try {
          const url = '/createstore'
          const response = await axios.post(url, data)
          dispatch({ type: 'submiterror', value: response.data.responseSuccess })
          if (response.data.responseSuccess) {
            const data = {
              token: response.data.storeinfo.token,
              _id: response.data.storeinfo._id,
              FirstName: response.data.storeinfo.FirstName,
              LastName: response.data.storeinfo.LastName,
              Email: response.data.storeinfo.Email
            }
            storeauthdispatch({type:'login',value:data})
            dispatch({ type: 'navcount', value: response.data.storeinfo._id})            
          }

        } catch (error) {
          console.log(error);
        }
      }

      fetchdata()

    }

  }, [state.createstorecount])

  return (
    <>
      <BuildStorecontext.Provider value={state}>
        <BuildStoredispatchcontext.Provider value={dispatch}>
            {children}
        </BuildStoredispatchcontext.Provider>

      </BuildStorecontext.Provider>



    </>
  )
}
export { BuildStorecontext, BuildStoredispatchcontext, BuildStorecontextProvider }
