import React ,  { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom' ; 
import Signup from './pages/Signup'
import Home from './pages/Home';
import Login from './pages/Login';
import About from "./pages/About"
import Help from './pages/Help';
import ProductDetails from './pages/ProductDetails';


function App() {


  return (
    <Router>
      <Navbar />
      <div className="pt-16 pb-16"> {/* Add top & bottom padding to avoid overlap */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/product-details" element={<ProductDetails />} />

       </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App
