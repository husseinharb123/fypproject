import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext, AuthDispatchContext } from '../../Contexts/AuthcontextProvider'
import './HeaderSignButton.scoped.css'

export default function HeaderSignButton() {
    const state = useContext(AuthContext);
    const dispatch = useContext(AuthDispatchContext)
  return (

    <>
    
          <div className="dropdown">
              <Link to='/signin' style={{ textDecoration: "none" }} role="button" data-bs-toggle="dropdown" aria-expanded="false" ><div className="login nav-item d-none d-md-flex dropdown-toggle"  >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="2em"
                      height="2em"
                      fill="currentColor"
                      className="bi bi-person"
                      viewBox="0 0 16 16"
                  >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                  </svg>
                  <div className="signin nav-item" >
                      <p>Hi,{state.isloggedin ? state.FirstName : 'Sign in'}</p>
                      <p>Account</p>
                  </div>
              </div>
              </Link>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                  <li><Link className="dropdown-item small" to="/" ><i className="bi bi-house"></i>   Home</Link></li>
                  {state.isloggedin ? <li><Link className="dropdown-item small" to="/" onClick={() => { dispatch({ type: "logout" }) }}><i className="bi bi-box-arrow-right "></i>   Logout</Link></li> : <li><Link className="dropdown-item small" to="/signin" onClick={() => { dispatch({ type: "logout" }) }}><i className="bi bi-person-circle"></i>   SignIn</Link></li>}
                  {!state.isloggedin && <li><Link className="dropdown-item small" to="/signup" ><i className="bi bi-person-plus"></i>   sign up</Link></li>}
              </ul>
          </div>
    
    </>
  )
}
