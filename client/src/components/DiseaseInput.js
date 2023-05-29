import React from 'react'
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

const staticData = {
       "Diabetes Prediction" : ["Pregnancies", "Glucose", "BloodSugar", "SkinThickness", "Insulin", "BMI", "DiabetesPedegreeFunction", "Age"],
       "Heart Disease Prediction": ["Age", "Sex", "CP", "Trestbps", "Chol", "Fbs", "Restecg", "Thalach", "Exang", "Oldpeak", "Slope", "Ca", "Thal"],
       "Parkinsons Disease Prediction": ["Fo", "Fhi", "Flo", "Jitter", "Jitter_abs", "Rap", "Ppq", "Ddp", "Shimmer", "Shimmer_db", "Shimmer_apq3", "Shimmer_apq5", "Apq", "Dda", "Nhr", "Hnr", "RPDE", "DFA","Spread1", "Spread2", "D2",  "PPE"],
       "Medical Insurance Cost Prediction": ["Age", "Sex", "BMI", "Children", "Smoker", "Region"],
}

export const DiseaseInput = () => {
    const location = useLocation();
    const {data} = location.state;
    console.log(data);

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const formData = new FormData(event.target);
        const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));
        console.log(jsonData);

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
                    <button type="submit" className="btn btn-info mx-auto">Submit</button>
                </form>
                </div>
            </div>
        </>
    )
}
