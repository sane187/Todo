import React from 'react';
import  { Routes, Route, Link }from "react-router-dom";
import './App.css';
import Landing from './Components/Landing';
import Signup from './Components/Signup';

function App() {
  return (
    <React.Fragment>
      <Routes>
      <Route path="/" element={<Signup />} />   
      <Route path="/home" element={<Landing />} />   
      </Routes>
    </React.Fragment>
  );
}

export default App;
