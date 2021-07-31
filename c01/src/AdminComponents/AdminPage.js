import React from 'react';
import './AdminPage.css'

import AdminTopBar from './AdminTopBar';


import axios from 'axios';




import "@fontsource/roboto";

import AdminRouter from './AdminRouter';


export default class AdminPage extends React.Component {

    getUsers = () => {
    axios.get('http://localhost:5000/api/users/admin/getAllUsers')
    .then(response => console.log(response.data[0]))
    .catch(console.log("error yes"));
    }
    
    render(){
        return (
            <div class="admin-container">
            <AdminTopBar />
            <AdminRouter />
            </div>
        )
    }
}

