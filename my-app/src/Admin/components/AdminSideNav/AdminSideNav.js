import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './AdminSideNav.scoped.css'
import '../../CommonCSS/1.scoped.css'
import { useContext } from 'react'
import { AuthStoreDispatchContext } from '../../../Contexts/AuthStorecontextProvider'
export default function AdminSideNav() {
    const storeid = useParams().id
    const storeauthdispatch = useContext(AuthStoreDispatchContext)
    const nav = useNavigate()

    function handlelogout(e) {
        e.preventDefault();
        storeauthdispatch({ type: 'logout' })
        nav('/')


    }


    return (
        <>

            <aside className="navbar-aside" id="offcanvas_aside">
                <nav>
                    <ul className="menu-aside">
                        <li className="menu-item">
                            <Link
                                aria-current="page"
                                className="menu-link active"
                                to=""
                            >
                                <i className="icon fas fa-home" />
                                <span className="text">Dashboard</span>
                            </Link>
                        </li>
                        <li className="menu-item">
                            <Link className="menu-link" to="products">
                                <i className="icon fas fa-shopping-bag" />
                                <span className="text">Products</span>
                            </Link>
                        </li>
                        <li className="menu-item">
                            <Link className="menu-link" to="addproduct">
                                <i className="icon fas fa-cart-plus" />
                                <span className="text">Add product</span>
                            </Link>
                        </li>
                        <li className="menu-item">
                            <Link className="menu-link" to="orders">
                                <i className="icon fas fa-bags-shopping" />
                                <span className="text">Orders</span>
                            </Link>
                        </li>
                        <li className="menu-item">
                            <Link className="menu-link" to="users">
                                <i className="icon fas fa-user" />
                                <span className="text">Users</span>
                            </Link>
                        </li>

                        <li className="menu-item">
                            <Link className="menu-link" onClick={handlelogout}>
                                <i className="icon fas fa-sign-out" />
                                <span className="text">Logout</span>
                            </Link>
                        </li>

                        <li className="menu-item">
                            <Link className="menu-link " to={`/store/${storeid}`}  >
                                <i className="icon fas fa-store" />
                                <span className="text">website page</span>
                            </Link>
                        </li>
                        <li className="menu-item">
                            <Link className="menu-link " to="setting">
                                <i className="icon fas fa-cog" />
                                <span className="text">Setting</span>
                            </Link>
                        </li>
                    </ul>
                    <br />
                    <br />
                </nav>
            </aside>







        </>
    )
}
