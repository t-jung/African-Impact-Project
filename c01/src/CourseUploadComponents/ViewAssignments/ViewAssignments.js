import React from 'react'
import axios from 'axios';
import { Avatar, ListItemAvatar, List, ListItem, ListItemText } from '@material-ui/core';
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
                    <ListItemText primary={item.filename}/>
                </ListItem>
            ))}
        </List>
    )
}

class ViewAssignments extends React.Component {

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
                <h3>View assignments</h3>
                <UserList list={this.state}/>
            </div>
        )
    }

}

export default ViewAssignments