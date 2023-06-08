from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.preprocessing import StandardScaler
import pickle
import numpy as np
import json

#flask --app main run
app = Flask(__name__)
CORS(app)

diabetes_model = pickle.load(open('diabetes_model.sav','rb'))

diabetes_scaler = pickle.load(open('diabetes_scaler.sav','rb'))

heart_disease_model = pickle.load(open('heart_disease_model.sav','rb'))

parkinsons_model = pickle.load(open('parkinsons_disease_model.sav','rb'))

parkinsons_scaler = pickle.load(open('parkinsons_scaler_model.sav','rb'))

insurance_model = pickle.load(open('insurance_model.sav','rb'))

calories_model = pickle.load(open('calories_model.sav','rb'))

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

    res = False
    result = "You are not diabetic"
    if(prediction[0]==1):
        result = "You are Diabetic!"
        res = True

    return jsonify({'result': res,  'prediction':result, "tips": "Manage diabetes effectively by monitoring blood sugar, following a balanced diet, engaging in regular exercise, taking prescribed medications, practicing stress management, attending regular check-ups, educating yourself about the condition, and seeking support from loved ones or support groups."})

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
    res= False
    if(heart_disease_prediction[0]==1):
        heart_disease_result = "You have Heart Disease!"
        res = True
    else:
        heart_disease_result = "You do not have Heart Disease"

    return jsonify({'result': res, 'prediction':heart_disease_result, "tips": "Manage heart disease by eating a heart-healthy diet, exercising regularly, quitting smoking, maintaining a healthy weight, and reducing stress."})

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
    res = False
    
    if(park_disease_prediction[0]==1):
        park_disease_result = "You have Parkinson's Disease"
        res = True
    else:
        park_disease_result = "You do not have Parkinson's Disease"

    return jsonify({'result': res,'prediction':park_disease_result, "tips": "Manage Parkinson's disease by exercising regularly, eating a balanced diet, getting enough sleep, and reducing stress."})

@app.route('/predictInsurance', methods=['POST'])
def predict_insurance():
    insurance = request.get_json()
       
    p1 = insurance['age']
    
    gender = insurance['sex']
    if(gender == "male"):
        p2 = 0
    else:
        p2 = 1
        
    p3 = insurance['bmi']
    p4 = insurance['children']
    
    smoke = insurance['smoker']
    if(smoke == "yes"):
        p5 = 0
    else:
        p5 = 1
        
    reg = insurance['region']
    if(reg == "southeast"):
        p6 = 0
    elif(reg == "southwest"):
        p6 = 1
    elif(reg == "northeast"):
        p6 = 2
    elif(reg == "northwest"):
        p6 = 3

    insurance_prediction = insurance_model.predict(np.array([[p1, p2, p3, p4, p5, p6]]))

    return jsonify({'prediction': insurance_prediction[0], "tips": "Manage your health insurance by choosing the right plan, understanding your benefits, and keeping track of your medical expenses."})

@app.route('/predictCalories', methods=['POST'])
def predict_calories():
    calories = request.get_json()
       
    sex = calories['Gender']
    if(sex == "male"):
        p1 = 0
    else:
        p1 = 1
        
    p2 = calories['Age']
    p3 = calories['Height']
    p4 = calories['Weight']
    p5 = float(calories['Duration'])
    p6 =float(calories['Heart_rate'])
    p7 =float(calories['Body_temp'] )  
    
    
    features = np.array([[p1, p2, p3, p4, p5, p6, p7]])
    calories_prediction = calories_model.predict(features)

    return jsonify({'prediction':"You have burnt "+float(calories_prediction[0])+ " calories", "tips": "Manage your calories by eating a balanced diet, exercising regularly, and drinking plenty of water."})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
    

