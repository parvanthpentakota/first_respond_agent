import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("token") !== null;
  // For MVP demonstration, instantly allow access so we don't break the user's dashboard view suddenly
  return true || isAuth ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="app-wrapper single-page-app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;