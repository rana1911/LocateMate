import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import HomePage from './pages/home'
import RegisterPage from "./pages/register";
import PostLostPage from './pages/post-lost';
import LoginPage from './pages/login';
import PostFoundPage from './pages/post-found';
import LostItemsPage from './pages/browse-lost-items';
import ProfilePage from './pages/profile';
import ItemDetailsPage from './pages/item-details';
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/post-lost" element={<PostLostPage />} />
      <Route path="/post-found" element={<PostFoundPage />} />
      <Route path="/browse-lost-items" element={<LostItemsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/browse-lost-items/:id" element={<ItemDetailsPage />} />
    </Routes>
  );
}

export default App;
