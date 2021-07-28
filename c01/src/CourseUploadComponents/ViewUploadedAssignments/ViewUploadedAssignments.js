import React, { Component } from 'react'
import styles from '../../styles'

import { Avatar, ListItemAvatar, List, ListItem, ListItemText, IconButton,
     Grid, Typography} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import GetAppIcon from '@material-ui/icons/GetApp';

import axios from 'axios';

import download from 'downloadjs';

import { ThemeProvider, makeStyles } from '@material-ui/styles';

const videoId = sessionStorage.getItem('videoId')

const useStyles = makeStyles((theme) => ({
    avatarStyle: {
        marginRight: 10,
    }, 
}));

const UserList = (props) => {
    const list = props.list
    const classes = useStyles()
    return(
        <List>
            {list.map(item => (
                <ListItem key={item.uploader}>
                    <Avatar className={classes.avatarStyle}>{item.uploader[0].toUpperCase()}</Avatar>
                    <ListItemText primary={item.filename} secondary={item.uploader}/>
                    <IconButton>
                        <GetAppIcon/>
                    </IconButton>
                </ListItem>
            ))}
        </List>
    )
}

let videoTitle = sessionStorage.getItem('videoTitle')

const ViewAssignments = () => {
    let header = 'Uploaded assignments for ' + videoTitle
    return(
        <div class="admin-topbar">
            <ThemeProvider theme={styles}>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Grid item direction="row">
                        <div class="admin-sidebyside">
                            <IconButton>
                            <a href="/adminpage" className="backArrowButton"><ArrowBackIcon/></a>
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
            {uploader: "cheryl", filename: "asd.png"},
            {uploader: "dawwen", filename: "dsa.pdf"}
        ]
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/video/getDeliverables' + videoId)
            .then(res => {
                //this.setState(res.data)
            })
            .catch(err => console.log(err))
    }

    render() {
        return(
            <div>   
                <ViewAssignments/>
                <h3>View assignments</h3>
                <UserList list={this.state}/>
            </div>
        )
    }
    
}

export default ViewUploadedAssignments