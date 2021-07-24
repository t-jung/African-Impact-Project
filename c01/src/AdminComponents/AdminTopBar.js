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

import UploadNewVideo from '../CourseUploadComponents/NewUpload/NewUploadComponent.js'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import "@fontsource/roboto";
import { Avatar, ListItemAvatar } from '@material-ui/core';
import theme from '../styles.js';

let email = sessionStorage.getItem('email')

const useStyles = makeStyles(() => ({
    root:{
        margin: 5
    }
}))


export const AdminTopBar = () => {
    const classes = useStyles();
    return (
        <div class="admin-container">
        <div class="admin-topbar">
        <ThemeProvider theme={styles}>
            <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid item direction="row">
                    <div class="admin-sidebyside">
                        <IconButton>
                        <a href="/feed" className="backArrowButton"><ArrowBackIcon/></a>
                        </IconButton>
                        <Typography style={{
                            color: styles.palette.primary.main,
                            fontWeight: 900,
                            fontSize: 30,
                        }}>
                            Adminstrator page
                        </Typography>
                    </div>
                </Grid>
                <Grid item direction="row" alignItems="center">
                    <div class="admin-sidebyside">
                        <a href="/profile" type="button" onClick={() => {sessionStorage.setItem('loadUser', email) ; console.log(email) }}>
                            <Avatar className={classes.root}>C</Avatar>
                        </a>
                    <br/>
                    <a href="/" button class="btn btn_admin_logout text-uppercase">Log Out</a> 
                    </div>
                </Grid>
            </Grid>
        </ThemeProvider>

        </div>
        </div>
    );

};

export default AdminTopBar;