import React, { Component } from 'react'
import styles from '../styles.js'

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';

import { ThemeProvider, makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { Icon, IconButton } from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const cardStyles = makeStyles((theme) => ({
    root: {
        width: '30vh',
        margin: '2vw',
    },
    expand: {
        marginLeft: 'auto'
    }
}))

const Courses = () => {
    return (
        <div class="formContainer">
            <ThemeProvider theme={styles}>
            <Typography style={{
                        color: styles.palette.primary.main,
                        fontWeight: 900,
                        fontSize: 30,
                    }}>Courses</Typography><br/>
            </ThemeProvider>
        </div>
    )
}

const CourseCard = () => {
    const classes = cardStyles();
    return(
        <Card className={classes.root}>
            <CardMedia
                title="video"
                component='img'
                image="http://img.youtube.com/vi/D8IjiKj-U5c/0.jpg"
            />
            <CardHeader
                title="Video"/>
            <CardActions disableSpacing>
                <IconButton
                    className={classes.expand}
                >
                    <EditIcon/>
                </IconButton>
            </CardActions>
        </Card>
    );  
}

const CourseAdd = () => {
    const classes = cardStyles();
    return (
        <Card className={classes.root}>
            <CardActions>
                <IconButton
                href="/new_upload_video">
                    <AddCircleIcon/>
                </IconButton>
            </CardActions>
        </Card>
    );
}

class CourseUpload extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <Grid container>
                    <Grid item container direction="row" justify="flex-start" alignItems="center">
                        <CourseCard></CourseCard>
                        <CourseAdd/>
                    </Grid>
                </Grid>
            </div>
            
        )
    }
}

export default CourseUpload