import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import image from './product-8.jpg';
import './Productl1.scoped.css';
import StarRating from '../Starrating/StarRating';
import { cartDispatchContext } from '../../Contexts/CartcontextProvider';
export default function FeaturedProduct({ product }) {
    const [addedToCart, setAddedToCart] = useState(false);
    const [addedToWishlist, setAddedToWishlist] = useState(false);
    const dispatch = useContext(cartDispatchContext)
    const productid = product._id
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/inoutwishcart/${product._id}`);
                setAddedToCart(response.data.addedToCart);
                setAddedToWishlist(response.data.addedToWishlist);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [product._id]);

    async function addToCart() {
        if (addedToCart) {
            await deleteFromCart();
            setAddedToCart(false);
            return;
        }
        setAddedToCart(true);
        try {
            const response = await axios.post('/postcart', {
                userid: localStorage.getItem('_id'),
                productid: product._id,
            });
            console.log(response.data); // Successfully added to cart
            if (addedToWishlist) {
                await deleteFromWishlist();
                setAddedToWishlist(false);
            }
            dispatch({ type: 'recount' });
        } catch (error) {
            console.error(error);
            // TODO: show error message to user
        }
    }

    async function addToWishlist() {
        if (addedToWishlist) {
            await deleteFromWishlist();
            setAddedToWishlist(false);
            return;
        }
        setAddedToWishlist(true);
        try {
            const response = await axios.post('/postwish', {
                userid: localStorage.getItem('_id'),
                productid: product._id,
            });
            console.log(response.data); // Successfully added to wishlist
            if (addedToCart) {
                await deleteFromCart();
                setAddedToCart(false);
            }
        } catch (error) {
            console.error(error);
            // TODO: show error message to user
        }
    }

    async function deleteFromWishlist() {
        try {
            const response = await axios.post('/deletewish', {
                userid: localStorage.getItem('_id'),
                productid: product._id,
            });
            console.log(response.data); // Successfully deleted wishlist item
        } catch (error) {
            console.error(error);
            // TODO: show error message to user
        }
    }

    async function deleteFromCart() {
        try {
            const response = await axios.post('/deletecart', {
                userid: localStorage.getItem('_id'),
                productid: product._id,
            });
            dispatch({ type: 'recount' });
            console.log(response.data); // Successfully deleted cart item
        } catch (error) {
            console.error(error);
            // TODO: show error message to user
        }
    }

    function findpriceafterdiscount() {
        return parseInt(product.price) * (1 - parseInt(product.discount) / 100);
    }


    return (

        <>
            <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                <div className="product-item bg-light mb-4">
                    <div className="product-img position-relative overflow-hidden">
                        <img className="img-fluid w-100" src={`http://localhost:8070/images/${product.imgurl}`} alt="" />
                        <div className="product-action">
                        <Link
                                className={`btn btn-outline-dark btn-square ${addedToCart ? 'chosen' : ''}`}
                                onClick={addToCart}

                            >
                                <i className="fa fa-shopping-cart" />
                            </Link>

                            <Link
                                className={`btn btn-outline-dark btn-square ${addedToWishlist ? 'chosen' : ''}`}
                                onClick={addToWishlist}

                            >
                                <i className="far fa-heart" />
                            </Link>

                        </div>
                    </div>
                    <div className="text-center py-4">
                        <Link className="h6 text-decoration-none text-truncate" to={`/productdetail/${productid}`}>{product.productname}<small>({product.reviews})</small></Link>
                        <div className="d-flex align-items-center justify-content-center mt-2">
                            <h5>${product.price}</h5><h6 className="text-muted ml-2 discount"><del>${findpriceafterdiscount()}</del></h6>
                        </div>



                        <div className="d-flex align-items-center justify-content-center mb-1">
                            <StarRating float={true} rating={product.rating} />
                            
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}
