import './App.css';
import LoginForm from './LoginComponents/LoginForm'
import ProfileEditForm from './ProfileComponents/ProfileEditForm'
import RegisterForm from './RegisterComponents/RegisterForm'
import PartnerRegistrationForm from './PartnerRegistrationFormComponents/PartnerRegistrationForm'
import AdminPage from './AdminComponents/AdminPage'
import ProfileFrame from './ProfileComponents/ProfileFrame'
import CompanyForm from './LoginComponents/CompanyRegistrationForm'
import Nav from './NavbarComponents/Nav'
// import Messenger from './MessengerComponents/Messenger'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


function App() {
  return (
    <Router>
    <div className="App">
    <Nav/>
      <Switch>
  
        <Route path="/" exact component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/profile" component={ProfileFrame} />
        <Route path="/profile_edit" component={ProfileEditForm} />
        <Route path="/adminpage" component={AdminPage} />
        <Route path="/partner_register" component={PartnerRegistrationForm} />
      </Switch>
    </div>

    </Router>
  );
}

export default App;

/*
      <LoginForm /><br/><br/><br/><br/>
      <CompanyForm /><br/><br/><br/><br/>
      <RegisterForm /><br/><br/><br/><br/>
      <ProfileFrame /> <br/><br/><br/><br/>
      <ProfileEditForm /> <br/><br/><br/><br/>
      <AdminPage /> <br/><br/><br/><br/>
      <PartnerRegistrationForm/> <br/><br/><br/><br/>

*/