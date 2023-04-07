import React, { useEffect, useState } from "react";
import './CheckStores.scoped.css';
import Footer from "../../main components/Footer/Footer";
import Header from "../../main components/Header/Header";
import { Link } from "react-router-dom";
import axios from "axios";

const StoreList = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [page , setPage] = useState(1);
  const [count ,setcount] = useState(0);


  const [loaded, setloaded] = useState(false)
  const [data, setdata] = useState({ 'results': [], 'page': 1, 'per_page': 0, 'total_results': 0, 'total_pages': 0, 'results_per_page': 0 });
  useEffect(() => {

    async function fetchdata() {
      setloaded(false);
      const url = `/checkstores?industry=${selectedIndustry}&storename=${searchText}&page=${page}`
      const response = await axios.get(url)
        
        setdata(response.data)
        setloaded(true);

    }
    fetchdata()
  }

    , [selectedIndustry,count])



  const handleSearch = (event) => {
    setcount(count+1)
  };

  const handleIndustryChange = (event) => {
    setSelectedIndustry(event.target.value);
  };

  return (
    <>
      <Header />
      <div className="store-list">
        <div className="filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search store names"
              value={searchText}
              onChange={(event)=>setSearchText(event.target.value)}
            />
            <button className="search-icon" onClick={handleSearch}>
              <i className="fa fa-search"></i>
            </button>
          </div>

          <select value={selectedIndustry} onChange={handleIndustryChange}>
            <option value="">industry</option>
            <option value="grocery">Grocery stores</option>
            <option value="clothing">Clothing stores</option>
            <option value="electronics">Electronic stores</option>
            <option value="furniture">Furniture stores</option>
            <option value="beauty">Beauty and cosmetics stores</option>
            <option value="sporting">Sporting goods stores</option>
            <option value="books">Bookstores</option>
            <option value="home-improvement">Home improvement stores</option>
          </select>
        </div>
        <div className="heading-3 mb-30 " >Currently on page {data.page} of {data.total_pages} </div>
        {/* <div> Showing {data.results_per_page} of {data.total_results} Products </div> */}
        <ul className="pagination">
              <li className="page-item "><button className="page-link"  onClick={() => setPage(page - 1)} disabled={page <= 1}>Previous</button></li>
              <li className="page-item"><button className="page-link"onClick={()=>setPage(page+1)}>Next</button>
                </li>
              </ul>
      </div>
      <div className="store-cards">
        {data.results.map((store) => (
          <div className="store-card" key={store.id}>
            <img  src={`http://localhost:8070/images/${store.storeprofileid}`}  alt={store.storeprofileid} />
            <div className="store-info">
              <Link style={{ color: 'black', textDecoration: 'none' }} to={`/store/${store._id}`}>
                <h2>{store.storename}</h2>
              </Link>
              <p>{store.industry}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default StoreList;