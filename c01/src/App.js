import './App.css';
import LoginForm from './LoginComponents/LoginForm'
import ProfileForm from './ProfileComponents/ProfileForm'
import RegisterForm from './RegisterComponents/RegisterForm'
import PartnerRegistrationForm from './PartnerRegistrationFormComponents/PartnerRegistrationForm'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <LoginForm/><br/><br/>
      <RegisterForm/><br/><br/>
      <ProfileForm/><br/><br/>
      <PartnerRegistrationForm/>  
    </div>
  );
}

export default App;
