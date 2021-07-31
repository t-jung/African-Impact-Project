import React, { useEffect } from 'react';
import './AdminPage.css'
import styles from '../styles.js'
import ReportCard from './AdminPendingReports';
import VerifCard from './AdminPendingVerifications';

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
import "@fontsource/roboto";
import { Avatar, ListItemAvatar } from '@material-ui/core';
import theme from '../styles.js';

export default class ViewUserList extends React.Component {
    state = {
        users: [],
        companies: [],
        partners: []

    }

    axiosGetAll = () => {
        axios.get('http://localhost:5000/api/users/getAllUsers')
    .then(response => this.setState({users: response.data}))
    .catch(console.log("error yes"));
    
    axios.get('http://localhost:5000/api/company/get_all_company')
    .then(response => this.setState({companies: response.data}))
    .catch(console.log("error yes"));

    axios.get('http://localhost:5000/api/partner/get_all_partner')
    .then(response => this.setState({companies: response.data}))
    .catch(console.log("error yes"));
    }

 
    componentDidMount() {
        try {

        axios.get('http://localhost:5000/api/users/admin/getAllUsers')
        .then(response => this.setState({users: response.data}))
        .catch(console.log("error yes"));
    
        axios.get('http://localhost:5000/api/company/get_all_company')
        .then(response => this.setState({companies: response.data}))
        .catch(console.log("error yes"));

        axios.get('http://localhost:5000/api/partner/get_all_partner')
        .then(response => this.setState({partners: response.data}))
        .catch(console.log("error yes"));

        } catch (e){
            
        }
    }
    
    
    render() {
        return(
            <div>
            <List>
            {this.state.users.map(item => (
                <ListItem key={item._id}>
                    <ListItemText primary={item.email} secondary="User"/>
                </ListItem>
            ))}
            {this.state.companies.map(item => (
                <ListItem key={item._id}>
                    <ListItemText primary={item.email} secondary="Company"/>
                </ListItem>
            ))}
            {this.state.partners.map(item => (
                <ListItem key={item._id}>
                    <ListItemText primary={item.email} secondary="Partner"/>
                </ListItem>
            ))}
        </List>
            </div>
        );
    }
    
}
