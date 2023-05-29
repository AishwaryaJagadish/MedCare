import React, { useState } from 'react'

function Login() {
    const [islogin, setisLogin] = useState(true)

    return (
        <div className="container text-center">
            <div className="row align-items-center">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card border-0 shadow rounded-3 my-5">
                        <div className="card-body p-4 p-sm-5">
                            <h3>Med<span className="text-info">Care</span></h3>
                            <h5 className="card-title text-center py-4 fs-5">{islogin ? "Sign In" : "Sign Up"}</h5>
                            <form>
                                {islogin ? "" :
                                (<div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="Name" />
                                    <label for="floatingInput">Name</label>
                                </div>)}
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                    <label for="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                                    <label for="floatingPassword">Password</label>
                                </div>
                                <div className="d-grid">
                                    <button className="btn btn-info btn-login " type="submit">Sign
                                        in</button>
                                </div>
                            </form>
                            <p className="py-4 text-center">
                                Not a member?{' '}
                                <span className="font-semibold text-info hover:pointer" style={{ cursor: 'pointer' }} onClick={() => setisLogin(!islogin)}>
                                    {islogin ? "Create an account" : "Sign in"}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login