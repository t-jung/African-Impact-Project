import React, { useEffect } from 'react';
import './AdminPage.css'

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';
import VerifCard from './AdminVerifCard';

import UploadNewVideo from '../CourseUploadComponents/NewUpload/NewUploadComponent.js'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import "@fontsource/roboto";
import { Avatar, ListItemAvatar } from '@material-ui/core';
import theme from '../styles.js';


export default class VerifBoard extends React.Component {
    state = {
        pendingVerifications: [
        ]
    }

    axiosGetVerifications = () => {
        axios.get('http://localhost:5000/api/verification/')
    .then(response => this.setState({pendingVerifications: response.data}))
    .catch(console.log("error yes"));
    }

    axiosSetVerification = (type, id, _id) => {
    
            const request = {
            type: type,
            id: id
        }
        axios.post('http://localhost:5000/api/verification/verifyUser', request)
        .then(this.axiosDeleteVerification(_id))
        .then(this.axiosGetVerifications)
        .catch(err => console.log(err));
    }

    axiosDeleteVerification = (id) => {
        axios.delete('http://localhost:5000/api/verification/delete/' + id)
        .then(console.log('deleted'))
        .then(this.axiosGetVerifications)
        .catch(err => console.log(err));

    }

    componentDidMount() {
        console.log(this.state.pendingVerifications);
        try {
            axios.get('http://localhost:5000/api/verification/')
        .then(response => this.setState({pendingVerifications: response.data}))
        .catch(console.log("error yes"));
        } catch (e){
            
        }
    }
    
    render(){
        return (
            <Grid container>
                <Grid item container direction="row" justify="flex-start" alignItems="center">
                    {this.state.pendingVerifications.map(item => (
                        <VerifCard 
                        name={item.name}
                        link={item.link}
                        id={item.id}
                        userType={item.userType}
                        _id={item._id}
                        axiosSetVerification={this.axiosSetVerification}
                        axiosDeleteVerification={this.axiosDeleteVerification}
                        />
                      ))}
                </Grid>
            </Grid>
         );
    }


}