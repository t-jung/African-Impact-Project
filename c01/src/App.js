import './App.css';
import LoginForm from './LoginComponents/LoginForm'
import ProfileForm from './ProfileComponents/ProfileForm'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <ProfileForm /> 
    </div>
  );
}

export default App;
