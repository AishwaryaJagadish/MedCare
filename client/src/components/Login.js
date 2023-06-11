import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../redux/actions';

function Login() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [islogin, setisLogin] = useState(true)
    const [mobile, setMobile] = useState("")
    const [gender, setGender]  = useState("")
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.medCareReducer);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, email, password)
        if(islogin){
            dispatch(login({email, password}))
        }
        else{
            dispatch(register({name, email,mobile, password, gender}))
        }
    }

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
                                    <input type="text" className="form-control" id="floatingInput" placeholder="Name" onChange={e => setName(e.target.value)} />
                                    <label for="floatingInput">Name</label>
                                </div>)}
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} />
                                    <label for="floatingInput">Email address</label>
                                </div>
                                {islogin ? "" :
                                (<div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="Mobile" onChange={e => setMobile(e.target.value)} />
                                    <label for="floatingInput">Mobile</label>
                                </div>)}
                                {islogin ? "" :
                                (<div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="Gender" onChange={e => setGender(e.target.value)} />
                                    <label for="floatingInput">Gender</label>
                                </div>)}
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                                    <label for="floatingPassword">Password</label>
                                </div>
                                <div className="d-grid">
                                    <button className="btn btn-info btn-login " type="submit" onClick={handleSubmit} disabled={isFetching} >{!islogin ? "Create an account" : "Sign in"}</button>
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