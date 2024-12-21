import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 import { AuthProvider } from './contexts/AuthContext';
 import Login from './components/Auth/Login';
 import Signup from './components/Auth/Signup';
 import HomePage from './pages/HomePage';
import AuctionPage from './pages/AuctionPage';
import AddProductPage from './pages/AddProductPage';
 import ProtectedRoute from './components/Auth/ProtectedRoute';
import './assets/styles.css'


function App() {
 return (
   <AuthProvider>
      <Router>
         <Routes>
             <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
             <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
             <Route path="/auction/:id" element={<ProtectedRoute><AuctionPage/></ProtectedRoute>} />
             <Route path="/add-product" element={<ProtectedRoute><AddProductPage /></ProtectedRoute>}/>
          </Routes>
     </Router>
  </AuthProvider>
);
}

export default App;