import './App.css';
import LoginForm from './LoginComponents/LoginForm'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <LoginForm /> 
    </div>
  );
}

export default App;
