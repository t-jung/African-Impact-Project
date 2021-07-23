import React, { Component } from 'react'
import styles from '../../styles'

import { ThemeProvider, withStyles, makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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
    constructor(props){
        super(props);
        this.state = {
            submitted: []
        }
    }

    render() {
        return(
            <ViewAssignments/>
        )
    }
    
}

export default ViewUploadedAssignments