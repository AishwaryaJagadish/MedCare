import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import axios from 'axios'

const API_URL = "http://localhost:8000/";

const UserDashboard = () => {
    const user = useSelector(state => state.medCareReducer.user)
    const [prediction, setPrediction] = useState([])

    useEffect(() => {
        axios.get(`${API_URL}api/users/getPrediction/${user._id}`)
            .then(res => {
                console.log(res.data)
                setPrediction(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    return (
        <section style={{ backgroundColor: "#eee" }}>
            <Navbar />
            <div className="container py-5">

                <div className="row">
                    {/* User Card */}
                    <div className="col-lg-4">
                        <div className="card mb-4">
                            <div className="card-body text-center">
                                <img src="https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg" alt="avatar"
                                    className="rounded-circle img-fluid" style={{ width: "150px" }} />
                                <h5 className="my-3">{user.name}</h5>
                                <p className="text-muted mb-1">{user.gender}</p>
                                <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                            </div>
                        </div>
                    </div>

                    {/* User Details */}
                    <div className="col-lg-8">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Full Name</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{user.name}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Email</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{user.email}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Mobile</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{user.mobile}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Prediction History */}
                    {
                        prediction.length === 0 ? null : <div className="col">
                        <div className="card mb-4">
                            <div className="card-header">
                                <h5 className="mb-0 text-center">Prediction history</h5>
                            </div>
                            <div className="card-body">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Result</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            prediction.map((item, index) => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{item.disease}</td>
                                                        <td>{item.prediction}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    }
                    
                </div>
            </div>
        </section>
    )
}
export default UserDashboard;