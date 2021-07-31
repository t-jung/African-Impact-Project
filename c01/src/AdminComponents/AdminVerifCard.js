import React, { useEffect } from 'react';
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



import "@fontsource/roboto";
import { Avatar, ListItemAvatar } from '@material-ui/core';
import theme from '../styles.js';

const VerifCardStyled =  withStyles((theme) => ({
    root: {
        background: theme.palette.secondaryBackground.main,
        width: '30%',
        height: 180,
        minWidth: 200,
        borderRadius: 20,
        border: 0,
        color: 'black',
        fontFamily: theme.typography.fontFamily,
        margin: 10
    },
}))(Card);


export const VerifCard = (props) => {
    return(
        <ThemeProvider theme={styles}>
            <VerifCardStyled variant="outlined">
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch">
                    <Grid item xs zeroMinWidth wrap="nowrap">
                    <div>
                    <CardContent>
                            <Typography style={{fontWeight: 700}}>
                                {props.name} ({props.userType})
                            </Typography>
                            <Typography noWrap>
                                {props.link}
                            </Typography>
                        </CardContent>
                    </div>
                    </Grid>
                    <Grid item
                        container
                        direction="row"
                        justify="center"
                        alignItems="center">
                        <CardActions alignself="flex-end">
                            <div class="admin-cardBtn admin-stickBottom">
                                <Button size="small" onClick={() => props.axiosSetVerification(props.userType, props.id, props._id)}>Approve</Button>
                                <Button size="small" onClick={() => props.axiosDeleteVerification(props._id)}>Disapprove</Button>
                            </div>
                        </CardActions>
                    </Grid>
                </Grid>
            </VerifCardStyled>
        </ThemeProvider>
    );
}

export default VerifCard;