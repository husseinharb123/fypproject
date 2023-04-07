
import './SearchBar.scoped.css'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react';
import { ProductFiltercontext, ProductFilterDispatch } from '../../Contexts/ProductsSearchResulTSContext';
export default function SearchBar() {

  const navigate = useNavigate();
  const dispatch = useContext(ProductFilterDispatch);
  const state = useContext(ProductFiltercontext);

  const [state1,setstate1] = useState('')

  const handleSearchFormSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "updateproductname", value: state1 })
    dispatch({ type: "searchforit" })
    navigate('/search');
  };

  return (
    <>

      <div className="searchbar nav-item ">
        <Link onClick={handleSearchFormSubmit} ><i className="fa fa-search" aria-hidden="true"></i></Link>
        <input type="text" name="" value={state1.productname} placeholder="search for anything" onChange={(event)=>setstate1(event.target.value)} />
      </div>

    </>
  );
}
