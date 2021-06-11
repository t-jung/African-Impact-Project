import './App.css';
import LoginForm from './LoginComponents/LoginForm'
import ProfileEditForm from './ProfileComponents/ProfileEditForm'
import RegisterForm from './RegisterComponents/RegisterForm'
import PartnerRegistrationForm from './PartnerRegistrationFormComponents/PartnerRegistrationForm'
import AdminPage from './AdminComponents/AdminPage'
import ProfileFrame from './ProfileComponents/ProfileFrame'
import CompanyForm from './LoginComponents/CompanyRegistrationForm'
import Messenger from './MessengerComponents/Messenger'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <LoginForm /><br/><br/><br/><br/>
      <CompanyForm /><br/><br/><br/><br/>
      <RegisterForm /><br/><br/><br/><br/>
      <ProfileFrame /> <br/><br/><br/><br/>
      <ProfileEditForm /> <br/><br/><br/><br/>
      <AdminPage /> <br/><br/><br/><br/>
      <PartnerRegistrationForm/> <br/><br/><br/><br/>
      <Messenger/> <br/><br/><br/><br/>
    </div>
  );
}

export default App;
