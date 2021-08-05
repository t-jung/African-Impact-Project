import React from 'react';
import './AdminPage.css'
import styles from '../styles.js'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider, withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';

import "@fontsource/roboto";

const ReportCardStyled =  withStyles((theme) => ({
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


export const ReportCard = (props) => {
    return(
        <ThemeProvider theme={styles}>
            <ReportCardStyled variant="outlined">
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
                        <CardActions alignself="flex-end">
                            <div class="admin-cardBtn admin-stickBottom">
                                <Button size="small" onClick={() => {props.axiosSetReport(props.reported, props.reportedType, props.id)}}>Ban</Button>
                                <Button size="small" onClick={() => {props.axiosDeleteReport(props.id)}}>Ignore</Button>

                            </div>
                        </CardActions>
                    </Grid>
                </Grid>
            </ReportCardStyled>
        </ThemeProvider>
        
    );
}

export default ReportCard;