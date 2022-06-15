import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Products from './pages/Products/Products';
import ProductPage from './pages/Product/ProductPage';
import ProfilePage from './pages/Profile/ProfilePage';
import Category from './pages/Category/Category';

function App() {
  return (
    <Router>
        <Routes >
        <Route path='/' index element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<ProductPage />} />
        <Route path='/profile/:id' element={<ProfilePage />}/>
        <Route path='/category/:category' element={<Category />} />
        </Routes>
    </Router>
  );
}

export default App;
