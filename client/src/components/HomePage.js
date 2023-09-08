import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import prediction from  "../images/prediction.jpg"

// const staticData = [{ "title": "Diabetes Prediction", "description": "This is a short description", "link": "/diabetes-prediction" }, { "title": "Heart Disease Prediction", "description": "This is a short description", "link": "/heart-disease-prediction" }, { "title": "Liver Disease Prediction", "description": "This is a short description", "link": "/liver-disease-prediction" }, { "title": "Kidney Disease Prediction", "description": "This is a short description", "link": "/kidney-disease-prediction" }, { "title": "Breast Cancer Prediction", "description": "This is a short description", "link": "/breast-cancer-prediction" }, { "title": "Stroke Prediction", "description": "This is a short description", "link": "/stroke-prediction" }, { "title": "Pneumonia Prediction", "description": "This is a short description", "link": "/pneumonia-prediction" }]

const staticData = [
    {
        "title": "Diabetes Prediction",
        "description": "Use our machine learning model to predict the likelihood of diabetes based on various health parameters.",
        "link": "/predictDiabetes", 
        "image": "/diabetes.jpg"
    },
    {
        "title": "Heart Disease Prediction",
        "description": "Get personalized insights into your risk for developing heart disease with our advanced machine learning heart disease prediction algorithm.",
        "link": "/predictHeart", 
        "image": "/heartdisease.jpg"
    },
    {
        "title": "Parkinsons Disease Prediction",
        "description": "Our machine learning model can predict the likelihood of Parkinson's disease based on your lifestyle habits and medical history.",
        "link": "/predictParkinsons", 
        "image": "/parkinsons.jpg"
    },
    {
        "title": "Medical Insurance Cost Prediction",
        "description": "Our advanced prediction algorithm can help you estimate your medical insurance costs based on various factors.",
        "link": "/predictInsurance", 
        "image": "/insurance.jpg"
    }, 
    {
        "title": "Calories Burnt Prediction",
        "description": "Our advaced machine learning model can predict the number of calories you will burn based on your duration of exercise and other factors.",
        "link": "/predictCalories", 
        "image": "/calories.jpg"
    }
];


function HomePage() {
    const user = useSelector(state => state.medCareReducer.user);

    return (
        <>
            <Navbar />
            <section className="py-5 text-center container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="text-info">Welcome, {user.name}!</h1>
                        <p className="lead text-body-secondary">Get accurate disease predictions using machine learning. Explore our various prediction options for conditions such as diabetes, heart disease, and more. Take control of your health today with MedCare.</p>
                    </div>
                </div>
            </section>

            <div className="album py-5 bg-body-tertiary">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {staticData.map((data, index) => {
                            return (
                                <div className="col">
                                    <div className="card shadow-sm">
                                        <img src={prediction} class="card-img-top" alt="Diabetes prediction" />
                                        <div className="card-body">
                                            <h5 class="card-title text-info-emphasis">{data.title}</h5>
                                            <p className="card-text">{data.description}</p>
                                            <div className="d-flex justify-content-end align-items-center">
                                                <div className="btn-group">
                                                    <Link to='/diseasePrediction' state= {{data}}className="btn btn-outline-secondary">Get Started</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage