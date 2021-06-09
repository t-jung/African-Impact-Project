import './App.css';
import LoginForm from './LoginComponents/LoginForm'
import ProfileForm from './ProfileComponents/ProfileForm'
import RegisterForm from './RegisterComponents/RegisterForm'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <LoginForm /><br/><br/><br/><br/>
      <RegisterForm /><br/><br/><br/><br/>
      <ProfileForm /> <br/><br/><br/><br/>
    </div>
  );
}

export default App;
