import './App.css';
import Login from './Components/login';
import Role from './Components/Role';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  
import SignUp from './Components/SignUp';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Role />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
