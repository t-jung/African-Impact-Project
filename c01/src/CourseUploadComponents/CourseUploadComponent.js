import React, { Component } from 'react'
import styles from '../styles.js'
import axios from 'axios';

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
import AssessmentIcon from '@material-ui/icons/Assessment';

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
            />
            <CardHeader
                title={videoInfo.title}/>
            <CardActions disableSpacing>
                <IconButton
                    className={classes.expand}
                    href="/view_uploaded_assignments"
                    onClick={ sessionStorage.setItem('videoTitle', videoInfo.title) }
                >
                    <AssessmentIcon/>
                </IconButton>
                <IconButton>
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
                let imgId = ''
                let take = false
                console.log(item.link)
                for(let char of item.link){
                    console.log(char)
                    if(char === '=') {
                        take = true
                    } else if (char === '&') {
                        break;
                    } else if (take) {
                        imgId = imgId + char
                    }
                }
                return {
                    title: item.title,
                    image: imgId,
                    link: item.link,
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