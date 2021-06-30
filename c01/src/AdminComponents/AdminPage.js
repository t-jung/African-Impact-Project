import React, { useEffect, useState, useContext } from 'react';
import './AdminPage.css'
import styles from '../styles.js'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { ThemeProvider, withStyles, makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import { flexbox, sizing } from '@material-ui/system';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import "@fontsource/roboto";
import theme from '../styles.js';
import { Avatar } from '@material-ui/core';

const styletheme = styles;

const TabButton =  withStyles((theme) => ({
    root: {
        background: theme.palette.secondary.main,
        borderRadius: 10,
        border: 0,
        color: 'black',
        textAlign: 'center',
        fontFamily: theme.typography.fontFamily,
        fontWeight: 200,
        paddingRight: 15,
        paddingLeft: 15,
        marginBottom: 3,
        textTransform: 'none'
    },
}))(Button);

const AdminPage = () => {
    const [displayPendingBoard, setPendingBoard] = React.useState(true);
    const [displayPendingVerif, setPendingVerif] = React.useState(false);
    const [displayViewUserList, setViewUserList] = React.useState(false);
    const [displayBannedUsers , setBannedUsers ] = React.useState(false);

    const selectPendingBoard = () => {
        setPendingBoard(true);
        setPendingVerif(false);
        setViewUserList(false);
        setBannedUsers(false);
    };

    const selectPendingVerif = () => {
        setPendingBoard(false);
        setPendingVerif(true);
        setViewUserList(false);
        setBannedUsers(false);
    };

    const selectViewUserList = () => {
        setPendingBoard(false);
        setPendingVerif(false);
        setViewUserList(true);
        setBannedUsers(false);
    };

    const selectBannedUsers = () => {
        setPendingBoard(false);
        setPendingVerif(false);
        setViewUserList(false);
        setBannedUsers(true);
    };

    useEffect(() => {

    }, [displayPendingBoard, displayPendingVerif, displayBannedUsers, displayViewUserList])

    return (
        <div class="admin-container">
            <div class="admin-topbar">
            <ThemeProvider theme={styletheme}>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Grid item direction="row">
                        <div class="admin-sidebyside">
                            <IconButton>
                                <ArrowBackIcon/>
                            </IconButton>
                            <Typography style={{
                                color: theme.palette.primary.main,
                                fontWeight: 900,
                                fontSize: 30,
                            }}>
                                Adminstrator page
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item direction="row" alignItems="center">
                        <div class="admin-sidebyside">
                           <Avatar>C</Avatar>
                        <a href="/" button class="btn text-uppercase">Log Out</a> 
                        </div>
                    </Grid>
                </Grid>
            </ThemeProvider>
            </div>
            <div class="admin-tabbuttons">
                <Grid container direction="row" nowrap="false" justify="space-between" alignItems="center">
                    <ThemeProvider theme={styletheme}>
                        <TabButton onClick={selectPendingBoard}>Pending reports</TabButton>
                        <TabButton onClick={selectPendingVerif}>Pending verifications</TabButton>
                        <TabButton onClick={selectViewUserList}>View user list</TabButton>
                        <TabButton onClick={selectBannedUsers }>View banned users</TabButton>
                    </ThemeProvider>
                    
                </Grid>
            </div>
            <DisplayBoard   displayBannedUsers={displayBannedUsers}
                            displayPendingVerif={displayPendingVerif}
                            displayViewUserList={displayViewUserList}
                            displayPendingBoard={displayPendingBoard}/>
        </div>
    );
}

const DisplayBoard = (props) => {
    if(props.displayBannedUsers) {

    } else if (props.displayPendingVerif) {
        return (
           <VerifBoard {...props}/> 
        );
        
    } else if (props.displayViewUserList) {

    } else {
        return (
            <PendingBoard {...props}/>
        );
    }
}

const PendingBoard = (props) => {
    return (
        <Grid container>
            <Grid item container direction="row" justify="flex-start" alignItems="center">
                <ReportCard reporter="REPORTER" reported="REPORTED" reason="REASON 1"/>
                <ReportCard reporter="REPORTER" reported="REPORTED" reason="REASON 1"/>
                <ReportCard reporter="REPORTER" reported="REPORTED" reason="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum accumsan purus vel sollicitudin. Ut eu nibh massa. In consequat sagittis enim, sed gravida lectus aliquet non. Nulla in eros sed quam tempor euismod. Curabitur libero dolor, hendrerit vel pharetra at, venenatis sed elit. Fusce venenatis dolor et lacinia..."/>
                <ReportCard reporter="REPORTER" reported="REPORTED" reason="REASON 1"/>
                <ReportCard reporter="REPORTER" reported="REPORTED" reason="REASON 1"/>
                <ReportCard reporter="REPORTER" reported="REPORTED" reason="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum accumsan purus vel sollicitudin. Ut eu nibh massa. In consequat sagittis enim, sed gravida lectus aliquet non. Nulla in eros sed quam tempor euismod. Curabitur libero dolor, hendrerit vel pharetra at, venenatis sed elit. Fusce venenatis dolor et lacinia..."/>
            </Grid>
        </Grid>
    )
}

const VerifBoard = (props) => {
    return (
        <Grid container>
            <Grid item container direction="row" justify="flex-start" alignItems="center">
                <VerifCard companyName="Some Company" link={<a href="https://www.w3schools.com">Visit W3Schools</a>}/>
                <VerifCard companyName="Another Company" link={<a href="https://www.w3schools.com">Visit W3Schools</a>}/>
            </Grid>
        </Grid>
    )
}

const ReportCardStyled =  withStyles((theme) => ({
    root: {
        width: '30%',
        height: 180,
        minWidth: 200,
        background: theme.palette.secondaryBackground.main,
        borderRadius: 20,
        border: 0,
        color: 'black',
        fontFamily: theme.typography.fontFamily,
        margin: 10
    },
}))(Card);

const VerfCardStyled =  withStyles((theme) => ({
    root: {
        width: '30%',
        height: 180,
        minWidth: 200,
        background: theme.palette.verificationBackground.main,
        borderRadius: 20,
        border: 0,
        color: 'black',
        fontFamily: theme.typography.fontFamily
    },
}))(Card);

const VerifCard = (props) => {
    return(
<ThemeProvider theme={styles}>
            <ReportCardStyled variant="outlined">
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch">
                    <Grid item xs zeroMinWidth wrap="nowrap">
                        <div>
                            <CardContent>
                                <Typography style={{fontWeight: 700}}>
                                    {props.companyName}
                                </Typography>
                                <Typography noWrap>
                                    {props.link}
                                </Typography>
                            </CardContent>
                        </div>
                    </Grid>
                    <Grid item
                        container
                        direction="row"
                        justify="center"
                        alignItems="center">
                        <CardActions alignSelf="flex-end">
                            <div class="admin-cardBtn admin-stickBottom">
                                <Button size="small">Approve</Button>
                                <Button size="small">Disapprove</Button>
                                <Button size="small">Details</Button>
                            </div>
                        </CardActions>
                    </Grid>
                </Grid>
            </ReportCardStyled>
        </ThemeProvider>
    );
}

const ReportCard = (props) => {
    return(
        <ThemeProvider theme={styles}>
            <ReportCardStyled variant="outlined">
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch">
                    <Grid item xs zeroMinWidth wrap="nowrap">
                        <div>
                            <CardContent>
                                <Typography style={{fontWeight: 700}}>
                                    {props.reporter} to {props.reported}
                                </Typography>
                                <Typography noWrap>
                                    {props.reason}
                                </Typography>
                            </CardContent>
                        </div>
                    </Grid>
                    <Grid item
                        container
                        direction="row"
                        justify="center"
                        alignItems="center">
                        <CardActions alignSelf="flex-end">
                            <div class="admin-cardBtn admin-stickBottom">
                                <Button size="small">Ban</Button>
                                <Button size="small">Ignore</Button>
                                <Button size="small">Details</Button>
                            </div>
                        </CardActions>
                    </Grid>
                </Grid>
            </ReportCardStyled>
        </ThemeProvider>
        
    );
}

export default AdminPage