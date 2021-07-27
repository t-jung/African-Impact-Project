import React from 'react';
import './AdminPage.css'
import styles from '../styles.js'
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { ThemeProvider, withStyles, makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';


import ArrowBackIcon from '@material-ui/icons/ArrowBack';


import "@fontsource/roboto";
import { Avatar } from '@material-ui/core';
import theme from '../styles.js';

let email = sessionStorage.getItem('email');

const TabButton =  withStyles(() => ({
    root: {
        borderRadius: 10,
        border: 0,
        color: 'black',
        textAlign: 'center',
        fontFamily: theme.typography.fontFamily,
        fontWeight: 200,
        paddingRight: 15,
        paddingLeft: 15,
        padding: 10,
        marginBottom: 3,
        background: 'white',
        textTransform: 'none'
    }
}))(Button);

let tabs = [
    {
        tabName: "Pending reports",
        link: "/adminpage",
    },
    {
        tabName: "Pending verifications",
        link: "/adminpage/verifications",
    },
    {
        tabName: "View user list",
        link: "/adminpage/users",
    },
    {
        tabName: "View banned users",
        link: "/adminpage/banned",
    },
    {
        tabName: "Upload new video",
        link: "/adminpage/video",
    },
]

const useStyles = makeStyles(() => ({
    root:{
        margin: 5
    },
    selected: {
        background: theme.palette.secondary.main,
    },
    notSelected: {
        background: 'white'
    }
}))


export const AdminTopBar = () => {

    const [btnState, setBtnState] = React.useState({
        "Pending reports": true,
        "Pending verifications": false,
        "View user list": false,
        "View banned users": false,
        "Upload new video": false,
    });

    const handleFocus = (selected) => {
        console.log(selected)
        let state = btnState
        for(const tab of tabs) {
            state[tab.tabName] = false
        }
        state[selected] = true
        console.log(state)
        setBtnState(state)
    }

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
                <div class="admin-tabbuttons admin-cardBtns">
                    {tabs.map(item => (
                        <TabButton component={Link} to={item.link} onClick={() => handleFocus(item.tabName)}
                        className={btnState[item.tabName] === true ? classes.selected : classes.notSelected}>
                            {item.tabName}
                        </TabButton>
                    ))}
                </div>
            </div>
        </div>
    );

};

export default AdminTopBar;