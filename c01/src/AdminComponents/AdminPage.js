import React, { useEffect } from 'react';
import './AdminPage.css'
import styles from '../styles.js'
import ReportCard from './AdminPendingReports';
import VerifCard from './AdminPendingVerifications';
import AdminTopBar from './AdminTopBar';
import { NavLink} from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { ThemeProvider, withStyles, makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';

import UploadNewVideo from '../CourseUploadComponents/NewUpload/NewUploadComponent.js'
import ViewVideo from '../CourseUploadComponents/CourseUploadComponent.js'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import "@fontsource/roboto";
import { Avatar, ListItemAvatar } from '@material-ui/core';
import theme from '../styles.js';
import {BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import AdminRouter from './AdminRouter';

let email = sessionStorage.getItem('email');


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

