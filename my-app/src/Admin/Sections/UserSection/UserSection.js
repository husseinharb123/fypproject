import React from 'react'
import { Link } from 'react-router-dom'
import './UserSection.scoped.css'
import '../../CommonCSS/1.scoped.css'
export default function UserSection() {
    return (
        <>
            <section className="content-main">
                <div className="content-header">
                    <h2 className="content-title">Customers</h2>
                    <div><Link className="btn btn-primary" to="/users"><i className="material-icons md-plus"></i> Create new</Link></div>
                </div>
                <div className="card mb-4">
                    <header className="card-header">
                        <div className="row gx-3">
                            <div className="col-lg-4 col-md-6 me-auto"><input type="text" placeholder="Search..." className="form-control" /></div>
                            <div className="col-lg-2 col-6 col-md-3">
                                <select className="form-select">
                                    <option>Show 20</option>
                                    <option>Show 30</option>
                                    <option>Show 40</option>
                                    <option>Show all</option>
                                </select>
                            </div>
                            <div className="col-lg-2 col-6 col-md-3">
                                <select className="form-select">
                                    <option>Status: all</option>
                                    <option>Active only</option>
                                    <option>Disabled</option>
                                </select>
                            </div>
                        </div>
                    </header>
                    <div className="card-body">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
                            <div className="col">
                                <div className="card card-user shadow-sm">
                                    <div className="card-header"><img className="img-md img-avatar" src="images/favicon.png" alt="User pic" /></div>
                                    <div className="card-body">
                                        <h5 className="card-title mt-5">Admin</h5>
                                        <div className="card-text text-muted">
                                            <p className="m-0">Admin</p>
                                            <p><Link to="mailto:admin@example.com">admin@example.com</Link></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card card-user shadow-sm">
                                    <div className="card-header"><img className="img-md img-avatar" src="images/favicon.png" alt="User pic" /></div>
                                    <div className="card-body">
                                        <h5 className="card-title mt-5">User</h5>
                                        <div className="card-text text-muted">
                                            <p className="m-0">Customer</p>
                                            <p><Link to="mailto:admin@example.com">user@example.com</Link></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <nav className="float-end mt-4" aria-label="Page navigation">
                            <ul className="pagination">
                                <li className="page-item disabled"><Link className="page-link" to="/users">Previous</Link></li>
                                <li className="page-item active"><Link className="page-link" to="/users">1</Link></li>
                                <li className="page-item"><Link className="page-link" to="/users">Next</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>












        </>
    )
}
