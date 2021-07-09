import React, { useEffect } from 'react';
import './AdminPage.css'
import styles from '../styles.js'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { ThemeProvider, withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import "@fontsource/roboto";
import { Avatar, ListItemAvatar } from '@material-ui/core';

const styletheme = styles;
const userList = [
    {
        name: 'John Doe',
        icon: <Avatar>J</Avatar>
    },
    {
        name: 'John1 Doe1',
        icon: <Avatar>J1</Avatar>
    },
    {
        name: 'John2 Doe2',
        icon: <Avatar>J2</Avatar>
    },
];
const bannedList = [
    {
        name: 'Tim Hortons',
        icon: <Avatar>T</Avatar>
    },
    {
        name: 'Tim1 Hortons1',
        icon: <Avatar>T1</Avatar>
    },
    {
        name: 'Tim2 Hortons2',
        icon: <Avatar>T2</Avatar>
    },
    {
        name: 'Cheyrl Cheyrl ',
        icon: <Avatar>CC</Avatar>
    },
];
const reportsList = [
    {
        reporter: 'Tim Hortons',
        reported: 'John Doe',
        reason: "I DON'T LIKE THIS DUDE OKAY"
    },
    {
        reporter: 'Tim2 Hortons2',
        reported: 'John2 Doe2',
        reason: "we are all just duplicates..."
    },
    {
        reporter: 'Tim3 Hortons3',
        reported: 'John3 Doe3',
        reason: "we are all just numbers..."
    },
];


const TabButton =  withStyles((theme) => ({
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

const TabButtonSelected =  withStyles((theme) => ({
    root: {
        borderRadius: 10,
        border: 0,
        color: 'black',
        textAlign: 'center',
        fontFamily: theme.typography.fontFamily,
        background: theme.palette.secondary.main,
        fontWeight: 200,
        paddingRight: 15,
        paddingLeft: 15,
        padding: 10,
        marginBottom: 3,
        textTransform: 'none'
    }
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
                        <a href="/profile"> <Avatar>C</Avatar></a>
                        <a href="/" button class="btn btn_admin_logout text-uppercase">Log Out</a> 
                        </div>
                    </Grid>
                </Grid>
            </ThemeProvider>

            </div>
            <div class="admin-tabbuttons">
                <Grid container direction="row" nowrap="false" justify="space-between" alignItems="center">
                    <ThemeProvider theme={styles}>
                        {displayPendingBoard ? <TabButtonSelected onClick={selectPendingBoard}>Pending reports</TabButtonSelected> :
                                                <TabButton onClick={selectPendingBoard}>Pending reports</TabButton>}
                        {displayPendingVerif ? <TabButtonSelected onClick={selectPendingVerif}>Pending verifications</TabButtonSelected> :
                                                <TabButton onClick={selectPendingVerif}>Pending verifications</TabButton>}
                        {displayViewUserList ? <TabButtonSelected onClick={selectViewUserList}>View user list</TabButtonSelected> :
                                                <TabButton onClick={selectViewUserList}>View user list</TabButton>}
                        {displayBannedUsers ? <TabButtonSelected onClick={selectBannedUsers}>View banned users</TabButtonSelected> :
                                                <TabButton onClick={selectBannedUsers}>View banned users</TabButton>}
                    </ThemeProvider>
                    
                </Grid>
            </div>
            <DisplayBoard
                displayBannedUsers={displayBannedUsers}
                displayPendingVerif={displayPendingVerif}
                displayViewUserList={displayViewUserList}
                displayPendingBoard={displayPendingBoard}/>
        </div>
    );
}

const DisplayBoard = (props) => {
    if(props.displayBannedUsers) {
        return(
            <ViewUserList bannedUsers={true}/>
        );
    } else if (props.displayPendingVerif) {
        return (
           <VerifBoard/> 
        );
    } else if (props.displayViewUserList) {
        return(
            <ViewUserList bannedUsers={false}/>
        );
    } else {
        return (
            <PendingBoard/>
        );
    }
}

const ViewUserList = (props) => {
    const list = (props.bannedUsers ? bannedList : userList);
    return(
        <List>
            {list.map(item => (
                <ListItem key={item.name}>
                    <ListItemAvatar>{item.icon}</ListItemAvatar>
                    <ListItemText primary={item.name}/>
                </ListItem>
            ))}
        </List>
    );
    
}

const PendingBoard = () => {
    return (
        <Grid container>
            <Grid item container direction="row" justify="flex-start" alignItems="center">
                {reportsList.map(item => (
                    <ReportCard reporter={item.reporter} reported={item.reported} reason={item.reason}/>
                ))}
            </Grid>
        </Grid>
    )
}

const verifList = [
    {
        name: 'Some Company',
        site: 'https://www.w3schools.com',
    },
    {
        name: 'Another Company',
        site: 'https://www.w3schools.com',
    },
];

const VerifBoard = () => {
    return (
        <Grid container>
            <Grid item container direction="row" justify="flex-start" alignItems="center">
                {verifList.map(item => {
                    <VerifCard companyName={item.name} link={item.site}/>
                })}
            </Grid>
        </Grid>
    )
}

const ReportCardStyled =  withStyles((theme) => ({
    root: {
        background: theme.palette.secondaryBackground.main,
        width: '30%',
        height: 180,
        minWidth: 200,
        borderRadius: 20,
        border: 0,
        color: 'black',
        fontFamily: theme.typography.fontFamily,
        margin: 10
    },
}))(Card);

const VerifCardStyled =  withStyles((theme) => ({
    root: {
        background: theme.palette.verificationBackground.main,
        width: '30%',
        height: 180,
        minWidth: 200,
        borderRadius: 20,
        border: 0,
        color: 'black',
        fontFamily: theme.typography.fontFamily,
        margin: 10
    },
}))(Card);

const VerifCard = (props) => {
    return(
        <ThemeProvider theme={styles}>
            <VerifCardStyled variant="outlined">
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
                                    <a href={props.link}/>
                                </Typography>
                            </CardContent>
                        </div>
                    </Grid>
                    <Grid item
                        container
                        direction="row"
                        justify="center"
                        alignItems="center">
                        <CardActions alignself="flex-end">
                            <div class="admin-cardBtn admin-stickBottom">
                                <Button size="small">Approve</Button>
                                <Button size="small">Disapprove</Button>
                                <Button size="small">Details</Button>
                            </div>
                        </CardActions>
                    </Grid>
                </Grid>
            </VerifCardStyled>
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
                        <CardActions alignself="flex-end">
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