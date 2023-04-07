import axios from 'axios';
import React, { useEffect } from 'react'
import { createContext } from 'react'
import { useImmerReducer } from 'use-immer';


const ProductFiltercontext = createContext(null);
const ProductFilterDispatch = createContext(null);


function ProductFilterProvider({ children }) {


  const initialState = {
    storename:'',
    storeid:'',
    productname: '',
    category: '',
    in_stock: '',
    fast_delivery: '',
    sort_by: '',
    rating: '',
    max_price: '',
    results:[] ,
    page:1, 
    per_page: 0, 
    total_results: 0,
    total_pages: 0,
    results_per_page : 0,
    submitcount:0
  }
   




  function OurReducer(draft, action) {
    switch (action.type) {
      case 'updateproductname':
        draft.productname = action.value
        break;
      case 'updatecategory':
        draft.category = action.value
        break;
      case 'updatein_stock':
        draft.in_stock = action.value
        break;
      case 'updatefast_delivery':
        draft.fast_delivery = action.value
        break;
      case 'updatesort_by':
        console.log(action.value);
        draft.sort_by = action.value
        break;
      case 'updatemax_price':
        draft.max_price = action.value
        break;

        case 'updatestoreid':
          draft.storeid = action.value
          break;
          case 'updatestorename':
            draft.storename = action.value
            break;     
      case 'updaterating':
        draft.rating = action.value
        break;
      case 'incpage':
        console.log(draft.page);
        draft.page = draft.page +1
        break;
      case 'decpage':
        draft.page = draft.page -1
        break;
        case 'searchforit':
          draft.submitcount++;
          break;

      case 'fetchresults':
        draft.results=action.value.results
        draft.page=action.value.page
        draft.per_page=action.value.per_page
        draft.total_results=action.value.total_results
        draft.total_pages=action.value.total_pages
        draft.results_per_page =action.value.results_per_page
        break;
      default:
        break;
    }



  }

  const [state, dispatch] = useImmerReducer(OurReducer, initialState);

  useEffect(() => {
    if (state.submitcount>0){
     async function  fetchResults() {
      const url = `/search?productname=${state.productname}&max_price=${state.max_price}&category=${state.category}&rating=${state.rating}&sort_by=${state.sort_by}&in_stock=${state.in_stock}&fast_delivery=${state.fast_delivery}&page=${state.page}&storeid=${state.storeid}`;
      console.log(url);
      await axios.get(url).then(response => {
        const data = response.data;
        console.log(data);
        dispatch({ type: 'fetchresults', value: data })
      }).catch(error => {
        console.error(error);
      });
    };
    fetchResults();}

  }, [state.submitcount, state.productname, state.category, state.in_stock, state.fast_delivery, state.sort_by, state.rating, state.max_price, state.page]);

  return (
    <>

      <ProductFiltercontext.Provider value={state}>
        <ProductFilterDispatch.Provider value={dispatch}>
          {children}
        </ProductFilterDispatch.Provider>
      </ProductFiltercontext.Provider>
    </>
  )
}

export { ProductFilterProvider, ProductFiltercontext, ProductFilterDispatch }
