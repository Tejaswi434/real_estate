import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import './App.css';
import HeaderPage from './Pages/HeaderPage';
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage';
import FooterPage from './Pages/FooterPage';
import PropertyCard from './Pages/Buyers/PropertyCard';
import Wishlist from './Pages/Buyers/Wishlist';
import Profile from './Pages/Buyers/Profile';
import BookAppointment from './Pages/Buyers/BookAppointment';
import FinancialAssistant from './Pages/Buyers/FinancialAssistant';
import MainComp from './Pages/Buyers/Main';
import PropertyDetail from './Pages/Buyers/PropertyDetails';
import Header from './Pages/Buyers/Header';





function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleWishlistToggle = (property) => {
    if (wishlist.some(item => item.id === property.id)) {
      setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== property.id));
    } else {
      setWishlist(prevWishlist => [...prevWishlist, property]);
    }
  };

  const handleRemoveFromWishlist = (propertyId) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== propertyId));
  };

  const properties = [
    {
      "image_url": "https://plus.unsplash.com/premium_photo-1680100256112-2e1231d9d0df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZsYXR8ZW58MHx8MHx8fDA%3D",
      id: 1,
      title: "Bhogapuram Villa",
      address: '123 Main St',
      budget: '$100,000',
      property_type: 'House',
      village_name: 'Green Village',
      seller: 'John Doe',
      pin_code: '123456'
    },
    {
      "image_url": "https://media.istockphoto.com/id/1027811130/photo/new-block-of-modern-apartments-stock-image.webp?b=1&s=612x612&w=0&k=20&c=t07R-M87qzo0-SFXM5P1lGLnVUrt1qQ62ywJI7RBBt0=",
      id: 2,
      title: "Srikakulam Flat",
      address: '123 Main St',
      budget: '$100,000',
      property_type: 'House',
      village_name: 'Green Village',
      seller: 'John Doe',
      pin_code: '123459'
    },
    {
      "image_url": "https://plus.unsplash.com/premium_photo-1684175656320-5c3f701c082c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmxhdHxlbnwwfHwwfHx8MA%3D%3D",
      id: 3,
      title: "Vizianagaram Land",
      address: '123 Main St',
      budget: '$100,000',
      property_type: 'House',
      village_name: 'Green Village',
      seller: 'John Doe',
      pin_code: '123459'
    },
  ];

  return (
    <Router>
      <div className="App">

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/buyer" element={<><Header /><Outlet /></>} >
            <Route path="" element={<PropertyCard wishlist={Wishlist} handleWishlistToggle={handleWishlistToggle} />} />
            <Route path="profile" element={<Profile />} />
            <Route path="Wishlist" element={<Wishlist />} />
            <Route path="main" element={<MainComp />} />
            <Route path="properties/:id" element={<PropertyDetail properties={properties} />} />
            <Route path="book-appointment/:id" element={<BookAppointment />} />
            <Route path="financial-assistant" element={<FinancialAssistant />} /> {/* Add this route */}
          </Route>
        </Routes>
        <FooterPage />
      </div>
    </Router>
  );
}

export default App;
