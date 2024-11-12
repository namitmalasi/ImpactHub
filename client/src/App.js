import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";

function App() {
  return (
    <div>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
