# MedCare

MedCare is a disease prediction system that utilizes machine learning algorithms to provide accurate predictions for various health conditions. It offers disease prediction options for conditions such as diabetes, heart disease, Parkinson's disease, and more. This project aims to empower individuals to take control of their health by offering reliable and real-time disease predictions.  

## Features
- Accurate disease predictions using machine learning algorithms.
- Prediction options for diabetes, heart disease, Parkinson's disease, and more.
- User-friendly web-based interface.
- Tech stack: React.js for the frontend, Node.js for the backend, and Flask for running the machine learning models.

## Installation
1. Clone the repository  
```
git clone https://github.com/adirn26/MedCare
```

2. Install the dependencies for the frontend  
```
cd client
npm install
```

3. Install the dependencies for the backend
```
cd Backend
npm install
```

4. Start the frontend server
```
cd client
npm start
```

5. Start the backend server
```
cd Backend
npm start
```

6. Run the Flask application for the machine learning models
```
cd ML
# Activate the virtual environment if needed
pip install -r requirements.txt
python main.py
```

6. Access the application in your web browser
```
http://localhost:3000
```
## Usage
1. Create an account or log in using your existing credentials.
2. Select the disease prediction option you are interested in (e.g., diabetes, heart disease, Parkinson's disease).
3. Enter the required information and submit the form.
4. MedCare will send the input data to the Flask application running the machine learning models.
5. The Flask application will process the data using the appropriate machine learning model and return the prediction result to the backend server.
6. The backend server will then send the prediction result back to the frontend.
7. View the prediction result and take necessary actions for your health.
