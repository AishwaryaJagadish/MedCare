import React, { useState } from 'react'
import Navbar from './Navbar';
import { json, useLocation } from 'react-router-dom';
import axios from 'axios';
import './DiseaseInput.css'
import { useSelector } from 'react-redux';

const staticData = {
    "Diabetes Prediction": ["Pregnancies", "Glucose", "BloodPressure", "SkinThickness", "Insulin", "BMI", "DiabetesPedigreeFunction", "Age"],
    "Heart Disease Prediction": ["Age", "Sex", "CP", "Trestbps", "Chol", "Fbs", "Restecg", "Thalach", "Exang", "Oldpeak", "Slope", "Ca", "Thal"],
    "Parkinsons Disease Prediction": ["Fo", "Fhi", "Flo", "Jitter", "Jitter_abs", "Rap", "Ppq", "Ddp", "Shimmer", "Shimmer_db", "Shimmer_apq3", "Shimmer_apq5", "Apq", "Shimmer_dda", "Nhr", "Hnr", "RPDE", "DFA", "Spread1", "Spread2", "D2", "PPE"],
    "Medical Insurance Cost Prediction": ["Age", "Sex", "BMI", "Children", "Smoker", "Region"],
    "Calories Burnt Prediction": ["Gender", "Age", "Height", "Weight", "Duration", "Heart_rate", "Body_temp"]
}

const API_URL = "http://localhost:5000";
const BACKEND_URL = "http://localhost:8000";

export const DiseaseInput = () => {
    const location = useLocation();
    const { data } = location.state;
    const [showNegResult, setShowNegResult] = useState(false);
    const [showPosResult, setShowPosResult] = useState(false);
    const [result, setResult] = useState({});
    const user = useSelector(state => state.medCareReducer.user);
    console.log(user);
    console.log(data);

    const handleSubmit = async(event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const jsonData = Object.fromEntries(formData.entries());
        console.log(jsonData);
        for (let prop in jsonData) {
            if(prop != "Gender" && prop != "Smoker" && prop != "Region" && prop != "Sex")
            jsonData[prop] = parseFloat(jsonData[prop]);
        }
        const res = await axios.post(`${API_URL}${data.link}`, jsonData)
        setResult(res.data);
        // const backendRes = await axios.put(`${BACKEND_URL}/api/users/addPrediction/${user._id}`, {prediction: res.data.prediction, disease: data.title});
        if(res.data.result){
            setShowNegResult(true);
            setShowPosResult(false);
        }
        else{
            setShowPosResult(true);
            setShowNegResult(false);
        }
        console.log(result);
        event.target.reset();
    };

    return (
        <>
            <Navbar />
            <div class="card mx-auto w-75 mb-3 my-4 text-bg-light">
                <div class="card-header text-center">
                    <h4>{data.title}</h4>
                </div>
                <div class="card-body">
                    <form onSubmit={handleSubmit}>
                        {staticData[data.title].map((data, index) => {
                            return (
                                <div className="mb-3">
                                    <label for="text" className="form-label">{data}</label>
                                    <input type="text" className="form-control input-sm" name={data} />
                                </div>
                            )
                        }
                        )}
                        <button type="submit" className="btn btn-info ">Submit</button>
                    </form>
                    
                </div>
            </div>

            {showPosResult ? (
            <div className='flip-card mx-auto'>
                <div className='flip-card-inner'>
                    <div className='flip-card-front'>
                        <div class="card border-success mb-3">
                            <div class="card-header">Results</div>
                            <div class="card-body text-success">
                                <h5 class="card-title">{result.prediction}</h5>
                            </div>
                        </div>
                    </div>
                    <div className='flip-card-back'>
                        <div class="card border-success mb-3">
                            <div class="card-header">Tips</div>
                            <div class="card-body text-success">
                                <p class="card-text">{result.tips}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ) : null}

            {showNegResult ? (
            <div className='flip-card mx-auto'>
                <div className='flip-card-inner'>
                    <div className='flip-card-front'>
                        <div class="card border-danger mb-3">
                            <div class="card-header">Results</div>
                            <div class="card-body text-danger">
                                <h5 class="card-title">{result.prediction}</h5>
                            </div>
                        </div>
                    </div>
                    <div className='flip-card-back'>
                        <div class="card border-danger mb-3">
                            <div class="card-header">Tips</div>
                            <div class="card-body text-danger">
                                <p class="card-text">{result.tips}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ) : null}

            

        </>
    )
}

