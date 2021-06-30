
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
        fontWeight: 300,
        paddingRight: 15,
        paddingLeft: 15,
        marginBottom: 3
    },
}))(Button);

const AdminPage = () => {
    return (
        <div class="admin-container">
            <div class="admin-topbar">
            <ThemeProvider theme={styletheme}>
                <Grid container direction="row" spacing={24} justify="space-between" alignItems="center">
                    <Grid item container direction="row" justify="flex-start" alignItems="center">
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
                    </Grid>
                    <Grid item>
                        <Avatar>C</Avatar>
                    </Grid>
                </Grid>
            </ThemeProvider>
            </div>
            <div class="admin-tabbuttons">
                <Grid container direction="row" nowrap="false" justify="space-between" alignItems="center">
                    <ThemeProvider theme={styletheme}>
                        <TabButton>Pending board</TabButton>
                        <TabButton>Pending verifications</TabButton>
                        <TabButton>View user list</TabButton>
                        <TabButton>View banned users</TabButton>
                    </ThemeProvider>
                    
                </Grid>
            </div>
            <PendingBoard/>
        </div>
    );
}

const PendingBoard = () => {
    return (
        <Grid container>
            <Grid item container direction="row" justify="space-between" alignItems="center">
                <ReportCard reporter="REPORTER" reported="REPORTED" reason="REASON 1"/>
                <ReportCard reporter="REPORTER" reported="REPORTED" reason="REASON 1"/>
                <ReportCard reporter="REPORTER" reported="REPORTED" reason="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum accumsan purus vel sollicitudin. Ut eu nibh massa. In consequat sagittis enim, sed gravida lectus aliquet non. Nulla in eros sed quam tempor euismod. Curabitur libero dolor, hendrerit vel pharetra at, venenatis sed elit. Fusce venenatis dolor et lacinia..."/>
            </Grid>
        </Grid>

    )
}

const CustomizedCard =  withStyles((theme) => ({
    root: {
        width: '30%',
        minWidth: 200,
        minHeight: 300,
        height: '100%',
        background: theme.palette.secondaryBackground.main,
        borderRadius: 20,
        border: 0,
        color: 'black',
        fontFamily: theme.typography.fontFamily
    },
}))(Card);

const CustomizedTypography = withStyles((theme) => ({
    root: {
        fontFamily: theme.typography.fontFamily,
        fontSize: 50,
    }
}))

const ReportCard = (props) => {
    return(
        <ThemeProvider theme={styles}>
            <CustomizedCard variant="outlined">
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
            </CustomizedCard>
        </ThemeProvider>
        
    );
}

const ReportBoard = () => {
    return (
        <div>
            <div class = "ReportBoard card">
                <h3>Pending Reports by User:</h3>
                <dt>Report from Paul Logan#1 to Paul Jake#1</dt>
                <dd>This guy is pretending to be my brother! Ban him!</dd>
                <dt>Report from Manav Patel#1 to Manav Patel#125</dt>
                <dd>I am the true manav. Please ban this person thank you sir.</dd>
                <dt>Report from Lorem#22 to ipsum#33</dt>
                <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum accumsan purus vel sollicitudin. Ut eu nibh massa. In consequat sagittis enim, sed gravida lectus aliquet non. Nulla in eros sed quam tempor euismod. Curabitur libero dolor, hendrerit vel pharetra at, venenatis sed elit. Fusce venenatis dolor et lacinia volutpat. Integer id nulla eget est ultrices porta. Ut fermentum ipsum efficitur tincidunt fringilla. Proin sollicitudin tristique nulla sit amet hendrerit. Nulla vel sem vitae enim placerat eleifend. Ut ac metus eu justo finibus posuere vel sed massa. Pellentesque ante magna, convallis vel dictum sed, dictum eget ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut lacinia ut dui et ullamcorper. Donec a eros nibh. Integer vulputate tortor pellentesque, posuere nisl sit amet, eleifend ligula.</dd>
                
            </div>
        </div>
    )

}
export default AdminPage