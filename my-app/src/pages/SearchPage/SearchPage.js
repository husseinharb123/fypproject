import React, { useContext } from 'react'
import ProductFilter from '../../components/ProductFilter/ProductFilters'
import Header from '../../main components/Header/Header'
import Footer from '../../main components/Footer/Footer'
import SearchElements from '../../components/SearchElements/SearchElements'
import './SearchPage.scoped.css'
import { ProductFiltercontext } from '../../Contexts/ProductsSearchResulTSContext'
export default function SearchPage() {

  
  const state = useContext(ProductFiltercontext)
  return (<>
    <Header />
    <div className="page-wrapper">
    <h2 className='heading-3'>{state.productname ? `Search Result for "${state.productname}"` : ''}</h2>
      <section className="main-section">
        <main className="product-container">
          <ProductFilter />
          <SearchElements />
          
        </main>
      </section>
    </div>
    <Footer />
  </>
  )
}
