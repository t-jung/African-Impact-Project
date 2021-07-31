import React, { useEffect } from 'react';
import './AdminPage.css'
import styles from '../styles.js'
import ReportCard from './AdminReportCard';

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

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import "@fontsource/roboto";
import { Avatar, ListItemAvatar } from '@material-ui/core';
import theme from '../styles.js';


export default class PendingBoard extends React.Component{
    state = {
        pendingReports: []
    }

    axiosGetReports = () => {
        axios.get('http://localhost:5000/api/reports/')
    .then(response => this.setState({pendingReports: response.data}))
    .catch(console.log("error yes"));

    }

    axiosSetReport = (reported, reportedType, id) => {
        const request = {
            reported: reported,
            reportedType: reportedType
        }
        axios.post('http://localhost:5000/api/reports/ban', request)
        .then(this.axiosDeleteReport(id))
        .then(this.axiosGetReports)
        .catch(err => console.log(err));
    }

    axiosDeleteReport = (id) => {
        axios.delete('http://localhost:5000/api/reports/delete/' + id)
        .then(console.log('deleted'))
        .then(this.axiosGetReports)
        .catch(err => console.log(err));

        console.log("help1");
    }



    componentDidMount() {

        try {
            axios.get('http://localhost:5000/api/reports/')
        .then(response => this.setState({pendingReports: response.data}))
        .catch(console.log("error yes"));
        } catch (e){
            
        }
    }
    
    render () {
     return (
            <Grid container>
                <Grid item container direction="row" justify="flex-start" alignItems="center">
                    {this.state.pendingReports.map(item => (
                        <ReportCard reporter={item.reporter} 
                        reported={item.reported}
                        reportedType={item.reportedType}
                        reason={item.reason}
                        id={item._id}
                        axiosSetReport={this.axiosSetReport}
                        axiosDeleteReport={this.axiosDeleteReport}
                        />
                      ))}

                </Grid>
            </Grid>
         );
   }
}

