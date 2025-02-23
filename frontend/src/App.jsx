import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import { AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import { ToastContainer } from 'react-toastify';
import NotFound from './pages/NotFound';
import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

const App = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(null);

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
          {/* <Navbar /> */}
          <div className='h-[100dvh]'>
            <Sidebar>
              <Routes>
                <Route element={<Home />} path="/" />
                {/* Protected routes */}
                {/* <Route element={<ProtectedRoute element={<VoteTask />} />} path="/worker/vote" /> */}
                <Route element={<Signin />} path="/signin" />
                <Route element={<Signup />} path="/Signup" />

                <Route element={<NotFound />} path="*" />
              </Routes>

              <ToastContainer />
            </Sidebar>
          </div>
        </AuthContext.Provider>
      </Router>
    </>
  );
};

export default App;
