from flask import Flask, request, jsonify
from sklearn.preprocessing import StandardScaler
import pickle
import numpy as np

app = Flask(__name__)

diabetes_model = pickle.load(open('F:/Projects_2023/MedCare/ModelsApi/diabetes_model.sav','rb'))

diabetes_scaler = pickle.load(open('F:/Projects_2023/MedCare/ModelsApi/diabetes_scaler.sav','rb'))

heart_disease_model = pickle.load(open('F:/Projects_2023/MedCare/ModelsApi/heart_disease_model.sav','rb'))

parkinsons_model = pickle.load(open('F:/Projects_2023/MedCare/ModelsApi/parkinsons_disease_model.sav','rb'))

parkinsons_scaler = pickle.load(open('F:/Projects_2023/MedCare/ModelsApi/parkinsons_scaler_model.sav','rb'))

@app.route('/predictDiabetes', methods=['POST'])
def predict():
    diabetes = request.get_json()
    print(diabetes)
       
    p1 = diabetes['Pregnancies']
    p2 = diabetes['Glucose']
    p3 = diabetes['BloodPressure']
    p4 = diabetes['SkinThickness']
    p5 = diabetes['Insulin']
    p6 = diabetes['BMI']      
    p7 = diabetes['DiabetesPedigreeFunction']
    p8 = diabetes['Age']
    
    input_data = (p1, p2, p3, p4, p5, p6, p7,p8)

    input_data_as_numpy_array = np.asarray(input_data)

    input_data_reshaped = input_data_as_numpy_array.reshape(1,-1)

    std_data =  diabetes_scaler.transform(input_data_reshaped)
    print(std_data)

    prediction = diabetes_model.predict(std_data)
    print(prediction)

    result = "Not diabetic"
    if(prediction[0]==1):
        result = "Diabetic"

    return jsonify({'prediction':result})

@app.route('/predictHeart', methods=['POST'])
def predict_heart():
    heart = request.get_json()
       
    p1 = heart['age']
    p2 = heart['sex']
    p3 = heart['cp']
    p4 = heart['trestbps']
    p5 =heart['chol']
    p6 = heart['fbs']      
    p7 = heart['restecg']
    p8 = heart['thalach']
    p9 = heart['exang']
    p10 = heart['oldpeak']
    p11 = heart['slope']
    p12 = heart['ca']
    p13 = heart['thal']

    heart_disease_prediction = heart_disease_model.predict(np.array([[p1, p2, p3, p4, p5, p6, p7,p8,p9,p10,p11,p12,p13]]))
    
    if(heart_disease_prediction[0]==1):
        heart_disease_result = "You have Heart Disease"
    else:
        heart_disease_result = "You do not have Heart Disease"

    return jsonify({'heart_disease_prediction':heart_disease_result})

@app.route('/predictParkinsons', methods=['POST'])
def predict_parkinsons():
    park = request.get_json()
       
    p1 = park['fo']
    p2 = park['fhi']
    p3 = park['flo']
    p4 = park['jitter']
    p5 =park['jitter_abs']
    p6 = park['rap']      
    p7 = park['ppq']
    p8 =park['ddp']
    p9 = park['shimmer']
    p10 = park['shimmer_db']
    p11 = park['shimmer_apq3']
    p12 = park['shimmer_apq5']
    p13 = park['apq']
    p14 = park['shimmer_dda']
    p15 = park['nhr']
    p16 = park['hnr']
    p17 = park['rpde']
    p18 = park['dfa']
    p19 = park['spread1']
    p20 = park['spread2']
    p21 = park['d2']
    p22 = park['ppe']
    
    
    std_data =  parkinsons_scaler.transform(np.array([[p1, p2, p3, p4, p5, p6, p7,p8,p9,p10,p11,p12,p13,p14,p15,p16,p17,p18,p19,p20,p21,p22]]))

    park_disease_prediction = parkinsons_model.predict(std_data)
    
    if(park_disease_prediction[0]==1):
        park_disease_result = "You have Parkinson's Disease"
    else:
        park_disease_result = "You do not have Parkinson's Disease"

    return jsonify({'park_disease_prediction':park_disease_result})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
    

