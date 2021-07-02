import './SideBar.css'

import React,{ useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Typography from '@material-ui/core/Typography';
import { spacing } from '@material-ui/system';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CheckIcon from '@material-ui/icons/Check';
import theme from '../styles';

const userSideBarElements = [
    'Profile',
    'Setting',
]

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

    const selectProfile = () => {
        setProfile(true);
        setSetting(false);
    }

    const selectSetting = () => {
        setProfile(false);
        setSetting(true);
    }

    useEffect(() => {

    }, [profile, setting]);

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.drawerContainer}>
                <Drawer
                    className={classes.drawer  + ' ' + classes.paper}
                    classes={{ paper: classes.paper }}
                    variant="permanent">
                        <div class="barContainer">
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
                        </div>
                        
                  </Drawer>
            </div>
      </ThemeProvider>
    );
};

export default SideBarProfile;