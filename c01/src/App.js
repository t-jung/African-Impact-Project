import './App.css';
import LoginForm from './LoginComponents/LoginForm'
import ProfileEditForm from './ProfileComponents/ProfileEditForm'
import RegisterForm from './RegisterComponents/RegisterForm'
import AdminPage from './AdminComponents/AdminPage';
import ProfileFrame from './ProfileComponents/ProfileFrame';
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <LoginForm /><br/><br/><br/><br/>
      <RegisterForm /><br/><br/><br/><br/>
      <ProfileFrame /> <br/><br/><br/><br/>
      <ProfileEditForm /> <br/><br/><br/><br/>
      <AdminPage /> <br/><br/><br/><br/>
    </div>
  );
}

export default App;
