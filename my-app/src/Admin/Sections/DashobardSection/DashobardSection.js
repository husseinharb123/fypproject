import React from "react";
import { Link } from "react-router-dom";
import image from './`1.png';
import image2 from './2.png';
import './DashobardSection.scoped.css'
import '../../CommonCSS/1.scoped.css'
export default function DashobardSection() {
  return (
    <>

          <section className="content-main">
            <div className="content-header">
              <h2 className="content-title">Dashboard</h2>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="card card-body mb-4 shadow-sm">
                  <article className="icontext">
                    <span className="icon icon-sm rounded-circle alert-primary">
                      <i className="text-primary fas fa-usd-circle" />
                    </span>
                    <div className="text">
                      <h6 className="mb-1">Total Sales</h6>
                      <span>$22,678</span>
                    </div>
                  </article>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card card-body mb-4 shadow-sm">
                  <article className="icontext">
                    <span className="icon icon-sm rounded-circle alert-success">
                      <i className="text-success fas fa-bags-shopping" />
                    </span>
                    <div className="text">
                      <h6 className="mb-1">Total Orders</h6>
                      <span>130</span>
                    </div>
                  </article>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card card-body mb-4 shadow-sm">
                  <article className="icontext">
                    <span className="icon icon-sm rounded-circle alert-warning">
                      <i className="text-warning fas fa-shopping-basket" />
                    </span>
                    <div className="text">
                      <h6 className="mb-1">Total Products</h6>
                      <span>70</span>
                    </div>
                  </article>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-6 col-lg-12">
                <div className="card mb-4 shadow-sm">
                  <article className="card-body">
                    <h5 className="card-title">Sale statistics</h5>
                    <img
                      src={image}
                      style={{
                        width: "100%",
                        height: "350px",
                        objectFit: "contain",
                      }}
                      alt=""
                    />
                  </article>
                </div>
              </div>
              <div className="col-xl-6 col-lg-12">
                <div className="card mb-4 shadow-sm">
                  <article className="card-body">
                    <h5 className="card-title">Products statistics</h5>
                    <img
                      src={image2}
                      style={{
                        width: "100%",
                        height: "350px",
                        objectFit: "contain",
                      }}
                      alt=""
                    />
                  </article>
                </div>
              </div>
            </div>
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Latest orders</h5>
                <div className="table-responsive">
                  <table className="table">
                    <tbody>

                      <tr>
                        <td>
                          <b>User</b>
                        </td>
                        <td>user@example.com</td>
                        <td>$345</td>
                        <td>
                          <span className="badge rounded-pill alert-success text-success">
                            Paid At Today at 10:13 AM
                          </span>
                        </td>
                        <td>Today at 10:13 AM</td>
                        <td className="d-flex justify-content-end align-item-center">
                          <Link className="text-success" href="/order">
                            <i className="fas fa-eye" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>User</b>
                        </td>
                        <td>user@example.com</td>
                        <td>$345</td>
                        <td>
                          <span className="badge rounded-pill alert-danger text-danger">
                            Created At Today at 10:13 AM
                          </span>
                        </td>
                        <td>Today at 10:13 AM</td>
                        <td className="d-flex justify-content-end align-item-center">
                          <Link className="text-success" href="/order">
                            <i className="fas fa-eye" />
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

    </>
  );
}
