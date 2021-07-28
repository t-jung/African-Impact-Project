import React, { Component } from 'react'
import styles from '../styles.js'
import axios from 'axios';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';

import { ThemeProvider, makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { Icon, IconButton } from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AssessmentIcon from '@material-ui/icons/Assessment';

const cardStyles = makeStyles((theme) => ({
    root: {
        width: '30vh',
        height: 'auto',
        margin: '2vh',
    },
    expand: {
        marginLeft: 'auto'
    },
    media: {
        width: '30vh',
        height: '17vh',
    },
    content: {
        padding: 3,
        paddingLeft: 15,
        fontSize: 18,
        width: 'fit-content',
    },
    actions: {
        width: 'fit-content',
        padding: 0,
    },
    action: {
        padding: 1,
        paddingRight: 8,
    }
}))

const CourseCard = (props) => {
    let videoInfo = props.videoInfo
    console.log(props)
    if(typeof videoInfo === 'undefined') {
        return(
            <div></div>
        )
    }
    const classes = cardStyles();
    let imgLink = 'http://img.youtube.com/vi/' + videoInfo.image + '/0.jpg'
    return(
        <Card className={classes.root}>
            <CardMedia
                title= {videoInfo.title}
                component='img'
                image={imgLink}
                className={classes.media}
            />
            <CardContent className={classes.content}>
                {videoInfo.title}
            </CardContent>
            <CardActions
                disableSpacing>
                <IconButton
                    className={[classes.expand, classes.action]}
                    href="/view_uploaded_assignments"
                    onClick={ sessionStorage.setItem('videoTitle', videoInfo.title) }
                >
                    <AssessmentIcon/>
                </IconButton>
                <IconButton className={classes.action}>
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
        this.state = {
            videoList: [
                {
                    title: '',
                    image: ''
                },
            ]
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/videos/admin/getAllVideos')
        .then(res => {
            console.log(res)
            this.setState({videoRaw: res.data})
            return res.data.map(item =>{ 
                return {
                    title: item.title,
                    image: item.link,
                    id: item._id
                }
            })
        })
        .then(res => (
            this.setState({videoList: res})
        )).then(res => console.log(this.state))
        .catch(err => {
            console.log(err);
            this.setState([]);
        })
    }

    render() {
        console.log(this.state.videoList)
        return(
            <div>
                <Grid container>
                    <Grid item container direction="row" justify="flex-start" alignItems="center">
                        {this.state.videoList.map(item => (
                            <CourseCard videoInfo={item}/>
                        ))}
                        <CourseCard></CourseCard>
                        <CourseAdd/>
                    </Grid>
                </Grid>
            </div>
            
        )
    }
}

export default CourseUpload