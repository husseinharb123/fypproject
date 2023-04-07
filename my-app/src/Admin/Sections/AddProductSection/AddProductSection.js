import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './AddProductSection.scoped.css';
import '../../CommonCSS/1.scoped.css'
import { useImmer, useImmerReducer } from "use-immer";
import axios from "axios";
export default function AddProductSection() {

  const parm = useParams()
  const storeid = parm.id;

  const [selectedImage, setSelectedImage] = useState(null);
  const initialstate = {
    productname: '',
    price: 0,
    in_stock: 0,
    discount: 0,
    category: '',
    fast_delivery:false,
    sellingtech: '',
    productdes: '',
    barcode: '',
    imgurl: null,
    review:[],
    reviews:0,
    submitcount: 0,
    haserror: false,


  }
  function ourReducer(draft, action) {
    switch (action.type) {
      case 'productname':
        draft.productname = action.value
        break;
      case 'price':
        draft.price = action.value
        break;
      case 'in_stock':
        draft.in_stock = action.value
        break;
      case 'discount':
        draft.discount = action.value
        break;
      case 'sellingtech':
        draft.sellingtech = action.value
        break;
      case 'productdes':
        draft.productdes = action.value
        break;
      case 'barcode':
        draft.barcode = action.value
        break;
        case 'updatefast_delivery':
          draft.fast_delivery = action.value
          break;
      case 'imgurl':
        draft.imgurl = action.value
        break;
      case 'category':
        draft.category = action.value
        break;
      case 'submitform':
        if (draft.productname && draft.price && draft.in_stock && draft.discount && draft.sellingtech && draft.productdes && draft.barcode && draft.category) {
          draft.haserror = false
          draft.submitcount++

        }
        else {
          console.log('error');
          draft.haserror = true
        }
        break;
      default:
        break;
    }
  }
  const [state, dispatch] = useImmerReducer(ourReducer, initialstate)


  function handlepublish(e) {
    e.preventDefault();
    dispatch({ type: 'submitform' })
    if (!state.haserror) {
      const data = new FormData();
      data.append('productname', state.productname);
      data.append('price', state.price);
      data.append('in_stock', state.in_stock);
      data.append('discount', state.discount);
      data.append('category', state.category);
      data.append('fast_delivery', state.fast_delivery);
      data.append('sellingtech', state.sellingtech);
      data.append('productdes', state.productdes);
      data.append('barcode', state.barcode);
      data.append('imgurl', selectedImage);
      data.append('storeid', storeid);
      data.append('review', state.review);
      data.append('reviews', state.reviews);
  
      axios.post('/publishproduct', data)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }


  return (
    <>

      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form>
          <div className="content-header">
            <Link className="btn btn-danger text-white" to="products">
              Go to products
            </Link>
            <h2 className="content-productname">Add product</h2>
            <div>
              <button type="submit" className="btn btn-primary"
                onClick={handlepublish}
              >
                Publish now
              </button>
            </div>
          </div>
          <div className=" border-danger">
            <div className="w-75">
              <div className="card mb-4 shadow-sm ">
                <div className="card-body">
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Product productname<span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control ui-autocomplete-input"
                      id="product_title"
                      required
                      autoComplete="off"
                      onChange={(e) => dispatch({ type: 'productname', value: e.target.value })}
                      value={state.productname}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Price<span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control ui-autocomplete-input"
                      id="product_price"
                      required
                      autoComplete="off"
                      onChange={(e) => dispatch({ type: 'price', value: e.target.value })}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Quantity<span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control ui-autocomplete-input"
                      id="product_price"
                      required
                      autoComplete="off"
                      onChange={(e) => dispatch({ type: 'in_stock', value: e.target.value })}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Discount
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control ui-autocomplete-input"
                      id="product_price"
                      required
                      autoComplete="off"
                      onChange={(e) => dispatch({ type: 'discount', value: e.target.value })}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price h2" className="form-label">
                      Barcode<span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control ui-autocomplete-input"
                      id="product_price"
                      required
                      autoComplete="off"
                      onChange={(e) => dispatch({ type: 'barcode', value: e.target.value })}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Selling Techniques <span style={{ color: 'red' }}>*</span>
                    </label>
                    <select className="form-select"
                      multiple
                      onChange={(e) => dispatch({ type: 'sellingtech', value: e.target.value })}

                    >
                      <option></option>
                      <option>Active</option>
                      <option>Disabled</option>
                      <option>Show all</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Category<span style={{ color: 'red' }}>*</span>
                    </label>
                    <select className="form-select"
                      onChange={(e) => dispatch({ type: 'category', value: e.target.value })}

                    >
                      <option value="">Select a category</option>
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



                  <div className="mb-4">

                    <input
                      type="checkbox"
                      onChange={(e) => dispatch({ type: 'updatefast_delivery', value: e.target.checked })}
                    />
                    <label className="form-label">Fast Delivery</label>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">productdes<span style={{ color: 'red' }}>*</span></label>
                    <textarea
                      placeholder="Type here"
                      className="form-control"
                      rows="7"
                      required
                      onChange={(e) => dispatch({ type: 'productdes', value: e.target.value })}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Images</label>

                    <input
                      className="form-control mt-3 ui-autocomplete-input"
                      type="file"
                      autoComplete="off"
                      onChange={(e) => setSelectedImage(e.target.files[0])}
                      
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
