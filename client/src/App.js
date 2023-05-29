import { DiseaseInput } from "./components/DiseaseInput";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import {Route, Routes} from 'react-router-dom';


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/diseasePrediction" element={<DiseaseInput />} />
    </Routes>
    </>
  );
}

export default App;
