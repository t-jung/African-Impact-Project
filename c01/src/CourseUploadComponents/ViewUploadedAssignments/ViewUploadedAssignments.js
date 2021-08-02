import React, { Component } from 'react'
import styles from '../../styles'
import './ViewUploadedAssignments.css'

import { Avatar, List, ListItem, ListItemText, IconButton,
     Grid, Typography} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import GetAppIcon from '@material-ui/icons/GetApp';

import axios from 'axios';

import download from 'downloadjs';

import { ThemeProvider, makeStyles } from '@material-ui/styles';

const videoId = sessionStorage.getItem('videoId')

let classNameHolder = ['greenAvatar', 'yellowAvatar', 'pinkAvatar', 'blueAvatar']

const useStyles = makeStyles((theme) => ({
    avatarStyle:{
        fontSize: 18,
        color: styles.palette.primary.main,
        fontWeight: 100,
        border: '4px solid orange',
        marginRight: 8,
    },
    greenAvatar:{
        backgroundColor: styles.palette.green.main,
    },
    yellowAvatar:{
        backgroundColor: styles.palette.yellowLemon.main,
    },
    pinkAvatar:{
        backgroundColor: styles.palette.pink.main,
    },
    blueAvatar:{
        backgroundColor: styles.palette.blue.main,
    },
  }));

const UserList = (props) => {
    const list = props.list
    const classes = useStyles()
    console.log(list)

    function onDownload(email, fileName) {
        console.log("CLICKED" + email)
        console.log(email)
        return axios.get('http://localhost:5000/api/videos/downloadDeliverable/' + email + '/' + videoId, {
            responseType: 'blob'
          })
            .then(res => {
                console.log("clicked")
                console.log(res.data)
                return download(res.data, fileName, 'multipart/form-data')
            })
            .then(() => console.log("Finished"))
            .catch(err => console.log)
    }

    return(
        <List>
            {Object.entries(list).map(item => {
                return(
                <ListItem key={item[1].uploader}>
                    <Avatar className={[classes.avatarStyle, classes[classNameHolder[Math.floor(Math.random() * classNameHolder.length)]]]}>
                        {typeof item[1].uploader !== 'undefined' ? item[1].uploader[0].toUpperCase() : 'U'}
                    </Avatar>
                    <ListItemText primary={item[1].fileName} secondary={item[1].uploader}/>
                    <IconButton onClick={() => onDownload(item[1].uploader, item[1].fileName)} >
                        <GetAppIcon/>
                    </IconButton>
                </ListItem>)
            })}
        </List>
    )
}

let videoTitle = sessionStorage.getItem('videoTitle')

const ViewAssignments = () => {
    let header = 'View uploaded assignments for ' + videoTitle
    return(
        <div class="admin-topbar">
            <ThemeProvider theme={styles}>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Grid item direction="row">
                        <div class="admin-sidebyside">
                            <IconButton>
                                <a href="/adminpage"><ArrowBackIcon/></a>
                            </IconButton>
                            <Typography style={{
                                color: styles.palette.primary.main,
                                fontWeight: 900,
                                fontSize: 30,
                            }}>
                                {header} 
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </div>
    )
}

class ViewUploadedAssignments extends Component {
    constructor(props) {
        super(props)
        this.state = [
            {uploader: "cheryl", fileName: "asd.png"},
            {uploader: "dawwen", fileName: "dsa.pdf"}
        ]
    }

    componentDidMount() {
        console.log(videoId)
        axios.get('http://localhost:5000/api/videos/getDeliverables/' + videoId)
            .then(res => {
                console.log(res.data)
                this.setState(res.data)
            })
            .catch(err => console.log(err))
    }

    render() {
        return(
            <div>   
                <ViewAssignments/>
                <div class="view-assignments-container">
                    <UserList list={this.state}/>
                </div>
            </div>
        )
    }
    
}

export default ViewUploadedAssignments