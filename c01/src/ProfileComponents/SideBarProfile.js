import './SideBar.css'

import React from 'react';
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditForm from './ProfileEditForm';

import theme from '../styles';
import styles from '../styles.js';

import CompanyEditForm from './CompanyEditForm.js';
import Setting from './Setting.js'

// from database
const user = {
    firstName: "User",
    middleName: "Here",
    lastName: "Name",
    profilePic: "https://cdn.discordapp.com/attachments/829661320923447326/860355801931579422/unknown.png",
    userMeail: "userName.cscc01@email.com",
    userPhone: 123456789,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    type: "User"
}

const drawerWidth = 320;

const useStyles = makeStyles((thene) => ({
    root: {
        display: "flex",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        background: theme.palette.secondaryBackground.main,
      },
      paper: {
        width: drawerWidth,
        background: theme.palette.secondaryBackground.main,
      },
      drawerContainer: {
        overflow: 'auto',
      },
      content: {
        flexGrow: 1,
        padding: 3,
      }
}))

const tabUseStyles = makeStyles(() => ({
    root: {
        margin: 5,
        padding: 15,
        paddingLeft: 30,
        borderRadius: 10,
        border: 0,
        color: 'black',
        width: 200,
        textTransform: 'none'
    },
    notSelected: {
        background: theme.palette.secondaryBackground.main,
    },
    Selected: {
        background: '#FFB987',
    },
    homeBtn: {
        backgruond: theme.palette.verificationBackground.main,
    },
    typography: {
        textAlign: 'left',
        fontFamily: theme.typography.fontFamily,
        fontWeight: 200,
        fontSize: 24,
        paddingLeft: 10
    }
}));

const SideBarProfile = (props) => {

    const classes = useStyles();
    const btnClasses = tabUseStyles();
    const [profile, setProfile] = React.useState(true);
    const [setting, setSetting] = React.useState(false);
    const [employee, setEmployee] = React.useState(false);
    const [workshop, setWorkshop] = React.useState(false);
    const [schedule, setSchedule] = React.useState(false);
    
    const selectProfile = () => {
        setProfile(true);
        setSetting(false);
        setEmployee(false);
        setWorkshop(false);
        setSchedule(false);
    }

    const selectSetting = () => {
        setProfile(false);
        setSetting(true);
        setEmployee(false);
        setWorkshop(false);
        setSchedule(false);
    }

    const selectEmployee = () => {
        setProfile(false);
        setSetting(false);
        setEmployee(true);
        setWorkshop(false);

    }

    const selectWorkshop = () => {
        setProfile(false);
        setSetting(false);
        setEmployee(false);
        setWorkshop(true);
        setSchedule(false);
    }

    const selectSchedule = () => {
        setProfile(false);
        setSetting(false);
        setEmployee(false);
        setWorkshop(false);
        setSchedule(true);
    }

    const UserSideBarElements = (type) => {
        return(
            <div class="barContainer">
                <Button
                    className={btnClasses.root + ' ' + (profile ? btnClasses.Selected : btnClasses.notSelected)}
                    onClick={selectProfile}
                    style={{justifyContent: "flex-start"}}
                    paddingX={2}>
                        <Typography className={btnClasses.typography}>
                            Profile
                        </Typography>
                </Button>
                <Button
                    className={btnClasses.root + ' ' + (setting ? btnClasses.Selected : btnClasses.notSelected)}
                    onClick={selectSetting}
                    style={{justifyContent: "flex-start"}}
                    paddingX={2}>
                        <Typography className={btnClasses.typography}>
                            Setting
                        </Typography>
                </Button>
                {(user.type !== "User") ? <CompanySideBarElements/> : <RegisterAccountElements/>}
            </div>
        )
    };

    const RegisterAccountElements = () => {
        return(
            <div class="barContainer">
                <Button
                    component={Link}
                    to={'/partner_register'}
                    className={btnClasses.root}
                    style={{justifyContent: "flex-start"}}
                    paddingX={2}>
                        <Typography className={btnClasses.typography}>
                            Register as Parnter
                        </Typography>
                </Button>
                <Button
                    component={Link}
                    to={'/company_register'}
                    className={btnClasses.root}
                    style={{justifyContent: "flex-start"}}
                    paddingX={2}>
                        <Typography className={btnClasses.typography}>
                            Register as Company
                        </Typography>
                </Button>
            </div>
        );
    }
    
    const CompanySideBarElements = () => {
        return(
            <div class="barContainer">
                <Button
                    className={btnClasses.root + ' ' + (employee ? btnClasses.Selected : btnClasses.notSelected)}
                    onClick={selectEmployee}
                    style={{justifyContent: "flex-start"}}
                    paddingX={2}>
                        <Typography className={btnClasses.typography}>
                            Employee
                        </Typography>
                </Button>
                <Button
                    className={btnClasses.root + ' ' + (workshop ? btnClasses.Selected : btnClasses.notSelected)}
                    onClick={selectWorkshop}
                    style={{justifyContent: "flex-start"}}
                    paddingX={2}>
                        <Typography className={btnClasses.typography}>
                            Workshop
                        </Typography>
                </Button>
                <Button
                    className={btnClasses.root + ' ' + (schedule ? btnClasses.Selected : btnClasses.notSelected)}
                    onClick={selectSchedule}
                    style={{justifyContent: "flex-start"}}
                    paddingX={2}>
                        <Typography className={btnClasses.typography}>
                            Schedule
                        </Typography>
                </Button>
            </div>
        );
    }

    

    return (
        <div class="profileEdit_container">
        <div class="profileEdit_split profileEdit_left">
        <ThemeProvider theme={theme}>
            <div className={classes.drawerContainer}>
                <Drawer
                    className={classes.drawer  + ' ' + classes.paper}
                    classes={{ paper: classes.paper }}
                    variant="permanent">
                        <div class="barContainer sidebarContainer">
                            <img class="barProfilePic"
                                src={props.imageSrc}
                            />
                            <Button
                                component={Link}
                                to={'/feed'}
                                className={btnClasses.root + ' ' + btnClasses.homeBtn}
                                style={{justifyContent: "flex-start"}}
                                paddingX={2}>
                                    <Typography className={btnClasses.typography}>
                                        Home
                                    </Typography>
                            </Button>
                        <UserSideBarElements type={props.type}/>
                        </div>
                  </Drawer>
            </div>
      </ThemeProvider>
        </div>
        <div class="profileEdit_formContainer">
            {profile === true ? 
                (user.type === "User" ? <EditForm user={user}/> : (user.type === "User" ? <EditForm user={user}/> : null))
                : null}
            {setting === true ? <Setting/> : null}
        </div>
    </div>
    );
};

export default SideBarProfile;