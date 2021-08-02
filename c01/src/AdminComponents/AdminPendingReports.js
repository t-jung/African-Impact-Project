import React from 'react';
import './AdminPage.css'
import ReportCard from './AdminReportCard';

import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import "@fontsource/roboto";

export default class PendingBoard extends React.Component{
    state = {
        pendingReports: []
    }

    axiosGetReports = () => {
        axios.get('http://localhost:5000/api/reports/')
    .then(response => this.setState({pendingReports: response.data}))
    .catch(console.log("error yes"));

    }

    axiosSetReport = (reported, reportedType, id) => {
        const request = {
            reported: reported,
            reportedType: reportedType
        }
        axios.post('http://localhost:5000/api/reports/ban', request)
        .then(this.axiosDeleteReport(id))
        .then(this.axiosGetReports)
        .catch(err => console.log(err));
    }

    axiosDeleteReport = (id) => {
        axios.delete('http://localhost:5000/api/reports/delete/' + id)
        .then(console.log('deleted'))
        .then(this.axiosGetReports)
        .catch(err => console.log(err));

        console.log("help1");
    }



    componentDidMount() {

        try {
            axios.get('http://localhost:5000/api/reports/')
        .then(response => this.setState({pendingReports: response.data}))
        .catch(console.log("error yes"));
        } catch (e){
            
        }
    }
    
    render () {
     return (
            <Grid container>
                <Grid item container direction="row" justify="flex-start" alignItems="center">
                    {this.state.pendingReports.map(item => (
                        <ReportCard reporter={item.reporter} 
                        reported={item.reported}
                        reportedType={item.reportedType}
                        reason={item.reason}
                        id={item._id}
                        axiosSetReport={this.axiosSetReport}
                        axiosDeleteReport={this.axiosDeleteReport}
                        />
                      ))}

                </Grid>
            </Grid>
         );
   }
}

