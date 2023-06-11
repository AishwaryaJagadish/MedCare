import { useSelector } from "react-redux";
import { DiseaseInput } from "./components/DiseaseInput";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import {Navigate, Route, Routes} from 'react-router-dom';
import UserDashboard from "./components/UserDashboard";


function App() {
  const user = useSelector(state => state.medCareReducer.user);
  console.log(user);
  return (
    <>
    <Routes>
      <Route path="/" element={user? <HomePage/>: <Navigate to ="/login"/>} />
      <Route path="/login" element={user? <Navigate to ="/"/>:<Login />} />
      <Route path="/diseasePrediction" element={user? <DiseaseInput/>: <Navigate to ="/login"/>} />
      <Route path="/dashboard" element={user? <UserDashboard/>: <Navigate to ="/login"/>} />
    </Routes>
    </>
  );
}

export default App;
