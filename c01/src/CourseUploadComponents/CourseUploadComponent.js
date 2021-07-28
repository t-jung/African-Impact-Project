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

import './CourseUploadComponent.css'

const cardStyles = makeStyles((theme) => ({
    root: {
        width: '31.5vh',
        height: 'auto',
        minHeight: '23vh',
        margin: '1vh',
    },
    expand: {
        marginLeft: 'auto'
    },
    media: {
        width: '100%',
        height: '17.6vh',
    },
    content: {
        padding: 3,
        paddingLeft: 15,
        fontSize: 18,
        width: 'fit-content',
        height: '3vh',
    },
    actions: {
        width: 'fit-content',
        padding: 0,
    },
    action: {
        padding: 1,
        paddingRight: 8,
    },
    gridStyles: {
        margin: 0,
    }
}))

const DisplayVideos = (props) => {
    const classes = cardStyles()
    return(
        <div class="view-uploaded-container">
            <Grid>
                <Grid item container direction="row" spacing={10} className={classes.gridStyles}>
                    {props.videoList.map(item => (
                        <CourseCard videoInfo={item}/>
                    ))}
                    <CourseCard></CourseCard>
                </Grid>
            </Grid>
        </div>
    )
}

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
            <CardContent className={classes.content} noWrap>
                {videoInfo.title}
            </CardContent>
            <CardActions
                disableSpacing>
                <IconButton
                    className={[classes.expand, classes.action]}
                    href="/view_uploaded_assignments"
                    onClick={() =>{
                        sessionStorage.setItem('videoId', videoInfo.id);
                        sessionStorage.setItem('videoTitle', videoInfo.title)
                    }}
                >
                    <AssessmentIcon/>
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
            <DisplayVideos videoList={this.state.videoList}/>
        )
    }
}

export default CourseUpload