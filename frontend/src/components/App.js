import './App.css';
import Login from './Login/Login.js';
import Home from './Home/Home.js';
import { Routes, Route } from "react-router";
import Setting from './Settings/Setting.js';
import LandingPage from "./LandingPage/LandingPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App">
          <header className="App-header">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/settings" element={<Setting />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<LandingPage />} />
            </Routes>
          </header>
        </div>
      </header>
    </div>
  );
}

export default App;
