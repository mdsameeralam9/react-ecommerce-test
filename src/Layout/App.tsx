import React from 'react';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Header from '../components/Header';

function App() {

  return (
    <BrowserRouter>
     <Header />
      <Routes>
        <Route path="" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
