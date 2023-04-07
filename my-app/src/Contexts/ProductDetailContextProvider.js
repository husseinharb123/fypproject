import React,{useEffect} from 'react'
import { createContext } from 'react'
import { useImmerReducer } from 'use-immer';
const ProductDetailContext = createContext(null);
const ProductDetailDispatch = createContext(null);

function findpriceafterdiscount(price, discount) {
    return price * (1- discount / 100)
}

 function ProductDetailContextProvider({children}) {

    const initialState = {
        id :'',
        productname:'',
        storeid :'',
        storename:'',
        price :1,
        priceafterdis:1,
        discount :1,
        productdes:'',
        rating:1,
        category:'',
        instock:1,
        buyers:1,
        barcode:'',
        deliverytype:'',
        imgurl :'',
        review:[],
        reviews:0,
        fetchcount:0,
        showrating:false

    }
    function OurReducer(draft,action){
        switch (action.type) {
            case 'fetchdata':
                draft.showrating = true
                draft.id = action.value.id
                draft.productname= action.value.productname
                draft.review = action.value.review
                draft.barcode = action.value.barcode
                draft.buyers = action.value.buyers
                draft.discount = action.value.discount
                draft.price = action.value.price
                draft.productdes = action.value.productdes
                draft.storename = action.value.storename
                draft.storeid = action.value.storeid
                draft.rating = action.value.rating
                draft.category = action.value.category
                draft.imgurl = action.value.imgurl
                draft.reviews = action.value.reviews
                draft.priceafterdis = findpriceafterdiscount(draft.price,draft.discount)               
                break;
            default:
                break;
        }



    }

const [state,dispatch] = useImmerReducer(OurReducer,initialState);

useEffect(() => {}, [])

  return (
    <>
    
    <ProductDetailContext.Provider value={state}>
        <ProductDetailDispatch.Provider value={dispatch}>
            {children}
        </ProductDetailDispatch.Provider>
    </ProductDetailContext.Provider>
    </>
  )
}

export  {ProductDetailContextProvider,ProductDetailContext,ProductDetailDispatch}
