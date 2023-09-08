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
       
    p1 = heart['Age']
    p2 = heart['Sex']
    p3 = heart['CP']
    p4 = heart['Trestbps']
    p5 =heart['Chol']
    p6 = heart['Fbs']      
    p7 = heart['Restecg']
    p8 = heart['Thalach']
    p9 = heart['Exang']
    p10 = heart['Oldpeak']
    p11 = heart['Slope']
    p12 = heart['Ca']
    p13 = heart['Thal']

    if p2 == "male": 
        p2 = 1
    else : 
        p2 = 0

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
       
    p1 = park['Fo']
    p2 = park['Fhi']
    p3 = park['Flo']
    p4 = park['Jitter']
    p5 =park['Jitter_abs']
    p6 = park['Rap']      
    p7 = park['Ppq']
    p8 =park['Ddp']
    p9 = park['Shimmer']
    p10 = park['Shimmer_db']
    p11 = park['Shimmer_apq3']
    p12 = park['Shimmer_apq5']
    p13 = park['Apq']
    p14 = park['Shimmer_dda']
    p15 = park['Nhr']
    p16 = park['Hnr']
    p17 = park['RPDE']
    p18 = park['DFA']
    p19 = park['Spread1']
    p20 = park['Spread2']
    p21 = park['D2']
    p22 = park['PPE']
    
    
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
       
    p1 = insurance['Age']
    
    gender = insurance['Sex']
    if(gender == "male"):
        p2 = 0
    else:
        p2 = 1
        
    p3 = insurance['BMI']
    p4 = insurance['Children']
    
    smoke = insurance['Smoker']
    if(smoke == "yes"):
        p5 = 0
    else:
        p5 = 1
        
    reg = insurance['Region']
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

    return jsonify({'prediction':"You have burnt "+str(calories_prediction[0])+" calories", "tips": "Manage your calories by eating a balanced diet, exercising regularly, and drinking plenty of water."})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
    

