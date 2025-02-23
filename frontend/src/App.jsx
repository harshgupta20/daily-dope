import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import { AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import { ToastContainer } from 'react-toastify';
import NotFound from './pages/NotFound';
import { useEffect, useState } from 'react';

const App = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsUserAuthenticated(token);
    }
  }, []);

  return (
    <>
      <Router>
        <AuthContext.Provider value={{ isUserAuthenticated, setIsUserAuthenticated }}>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            {/* Protected routes */}
            {/* <Route element={<ProtectedRoute element={<VoteTask />} />} path="/worker/vote" /> */}


            <Route element={<NotFound />} path="*" />
          </Routes>


          <ToastContainer />
        </AuthContext.Provider>
      </Router>
    </>
  );
};

export default App;
