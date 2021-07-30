import React, { useEffect } from 'react';
import './AdminPage.css'
import styles from '../styles.js'
import ReportCard from './AdminPendingReports';

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
import VerifCard from './AdminPendingVerifications';

import UploadNewVideo from '../CourseUploadComponents/NewUpload/NewUploadComponent.js'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import "@fontsource/roboto";
import { Avatar, ListItemAvatar } from '@material-ui/core';
import theme from '../styles.js';


export default class VerifBoard extends React.Component {
    state = {
        pendingVerifications: []
    }
    
    render(){
        return (
            <div>
            <Grid container>
            <Grid item container direction="row" justify="flex-start" alignItems="center">
                {this.state.pendingVerifications.map(item => (
                    <VerifCard companyName={item.name} link={item.site}/>
                ))}
            </Grid>
            </Grid>
            <p>placeholder</p>
            </div>
        )
    }
}