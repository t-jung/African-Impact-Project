import './CompanyEditForm.css'
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider, withStyles } from '@material-ui/core/styles';

import axios from 'axios';

import styles from '../styles'
import { Typography, Button } from '@material-ui/core';

const StyledTextField = withStyles((theme) => ({
    root: {
        width: '90%',
        margin: 20,
        marginTop: 5,
        fontFamily: theme.typography.fontFamily

    }
}))(TextField);

const StyledTypography = (withStyles({
    root: {
        color: styles.palette.primary.main,
        fontWeight: 100,
        fontSize: 18,
        marginLeft: 20
    },
}))(Typography);

class CompanyEditForm extends Component {

    state ={ 
        name: '', 
        email: '', 
        password: '',
        location: '',
        industry: '',
        website: '',
        description: '',
        status: 'unverified'
    }

    constructor(props) {
        super(props);
        this.state = this.handleStateChange.bind(this)
    }  

    handleStateChange = (event) => {
        console.log("Clicked")

        const {name: fieldName, value} = event.target

        let config = {
            headers: {
                'authentication-token-company': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55Ijp7ImlkIjoiNjBlNjNkYTllYWQxYTEyODQwN2Q0YjBhIn0sImlhdCI6MTYyNTgwMzk3MiwiZXhwIjoxNjI1ODA3NTcyfQ.UnZffSWltg3Fb2EftFKihIAwCBrx8GqLJ-TP0jMWpP8',
            }
        }

        this.setState({
            [fieldName]: value
        })
        console.log(this.state)

        axios.put('http://localhost:5000/api/company/change_company_info/', this.state, config)
        .then(res => console.log(res))
        .catch(e => console.log(e));
    }



    componentDidMount() {
        axios.get('http://localhost:5000/api/company/show_company_info_id/60df9e288951562fc884b3aa')
            .then(response => {
                this.setState({
                    name:response.data.name,
                    email: response.data.email,
                    password: response.data.password,
                    location: response.data.location,
                    industry: response.data.industry,
                    website: response.data.website,
                    description: response.data.description,
                    status: response.data.status
                });
            })
            .catch(error => console.log("error", error))
    }

    render () {
        return (
            <div class="formContainer">
                <ThemeProvider theme={styles}>
                    <Typography style={{
                        color: styles.palette.primary.main,
                        fontWeight: 900,
                        fontSize: 30,
                    }}>Company profile edit</Typography><br/>
                    <StyledTypography>Company name</StyledTypography>
                    <StyledTextField variant="outlined" size="small" required
                        onChange={(e) => {this.setState({name: e.target.value})}}
                        value={this.state.name}/>
                    <StyledTypography>Company email</StyledTypography>
                    <StyledTextField variant="outlined" size="small"required type="email"
                        onChange={(e) => {this.setState({email: e.target.value})}}
                        value={this.state.email}/>
                    <StyledTypography>Company phone number</StyledTypography>
                    <StyledTextField variant="outlined" size="small"  required type="tel"

                        defaultValue={123456789}/>
                    <StyledTypography>Company website</StyledTypography>
                    <StyledTextField variant="outlined" size="small" type="url"
                        onChange={(e) => {this.setState({website: e.target.value})}}
                        value={this.state.website}/>
                    <StyledTypography>Start up date</StyledTypography>
                    <StyledTextField variant="outlined" size="small" type="date" />
                    <StyledTypography>Description</StyledTypography>
                    <StyledTextField variant="outlined" size="small" multiline rows={4} 
                        onChange={(e) => {this.setState({description: e.target.value})}}
                        defaultValue={this.state.description}/> 
                </ThemeProvider>
                <div class="d-flex justify-content-center">
                    <Button style={{
                        background: styles.palette.secondary.main,
                        borderRadius: 10,
                        fontSize: 15,
                    }}
                    onClick={this.handleStateChange}>Submit</Button>
                </div>
            </div>
        )
    }
}

export default CompanyEditForm