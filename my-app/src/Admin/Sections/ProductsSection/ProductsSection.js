import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../CommonCSS/1.scoped.css';
import ProductCart from '../../components/ProductCart/ProductCart';
import axios from 'axios';

export default function ProductsSection() {
  const parm = useParams()
  const storeid = parm.id;
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [productsFilter, setProductsFilter] = useState({ results: [] });
  const [sortOption, setSortOption] = useState('Latest added');
  const [inStock, setInStock] = useState('');
  const [count, setcount] = useState(0);
  useEffect(() => {
    async function fetchResults() {
      try {
        const response = await axios.get(`/search1?searchQuery=${searchQuery}&category=${category}&page=${page}&inStock=${inStock}&sortOption=${sortOption}&storeid=${storeid}`);
        setProductsFilter(response.data);
        console.log(response.data.results);
      } catch (error) {
        console.error(error);
      }
    }
    {fetchResults();}
    
  }, [category,count,sortOption,inStock,page]);

  return (<>
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Products</h2>
        <div>
          <Link className="btn btn-primary" to="/Linkddproduct">Create new</Link>
        </div>
      </div>
      
      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <div className="input-group">
                <input type="search" placeholder="Search..." className="form-control p-2 ui-autocomplete-input" autoComplete="off" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <button className="btn btn-outline-secondary" type="button" onClick={()=>setcount(count+1)}>
                  <i className="bi bi-search"></i>
                </button>
              </div>
              
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">All category</option>
                <option value="Apparel and accessories">Apparel and accessories</option>
                <option value="Electronics">Electronics</option>
                <option value="Home and garden">Home and garden</option>
                <option value="Beauty and personal care">Beauty and personal care</option>
                <option value="Sports and fitness">Sports and fitness</option>
                <option value="Toys and games">Toys and games</option>
                <option value="Food and beverages">Food and beverages</option>
                <option value="Health and wellness">Health and wellness</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="Latest added">Latest added</option>
                <option value="Most viewed">Most viewed</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <div className="form-check">
              <input className="form-check-input" type="checkbox" id="instockCheckbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} />
                <label className="form-check-label" htmlFor="instockCheckbox">In stock</label>
              </div>
            </div>
          </div>
        </header>
        <div className="card-body">
          <div className="row">
            {productsFilter.results.map((product) => <ProductCart key={product._id}  productname={product.productname} productprice={product.price} productid={product._id} imgurl={product.imgurl}productsFilter={productsFilter} setProductsFilter={setProductsFilter}setcount={setcount}  />)}
          </div>
          
          <nav className="float-end mt-4" aria-label="Page navigation">
          
            <ul className="pagination">
              <li className="page-item "><button className="page-link"  onClick={() => setPage(page - 1)} disabled={page <= 1}>Previous</button></li>
              <li className="page-item"><button className="page-link"onClick={()=>setPage(page+1)}>Next</button>
                </li>
              </ul>
            </nav>
            <div className="heading-3 mb-30 " >Currently on page {productsFilter.page} of {productsFilter.total_pages} </div>
          </div>

        </div>
       
      </section>
    </>
  )
}