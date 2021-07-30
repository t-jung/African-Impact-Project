import './CompanyEditForm.css'
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider, withStyles } from '@material-ui/core/styles';

import axios from 'axios';

import styles from '../styles'
import { Typography, Button, Chip } from '@material-ui/core';

import jwt_decode from "jwt-decode";
import tagCategories from '../tagCategories'

let token = sessionStorage.getItem('token')

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

const SingleTag = (props) => {
    const[clicked, setClicked] = React.useState(props.status)

    const handleClick = () => {
        let prev = clicked
        setClicked(!prev)
        props.handle(props.label)
    }

    return(
        <Chip
            style={{
                margin: '10px',
            }}
            label={props.label}
            onClick={handleClick}
            color={clicked === true ? "primary" : "grey" }/>
    )
}

const Tags = (props) => {
    const tagList = props.tagList;
    console.log(props.status)
    return(
        tagList.map(item => (
            <SingleTag 
            label={item} status={ typeof props.status !== 'undefined' ? props.status.includes(item) : false} handle={props.handle}/>
        ))
    )
}

class CompanyEditForm extends Component {
    
    state ={ 
        name: '', 
        email: '', 
        location: '',
        industry: '',
        website: '',
        description: '',
        MCs: '',
        financials: '',
        pitch_decks: '',
        founding_team: '',
        tags: [],
        startUpDate: '1997-01-01',
        status: 'unverified'
    }

    constructor(props) {
        super(props);
        this.state = this.handleStateChange.bind(this)
    }  

    handleStateChange = (event) => {
        console.log("Clicked")
        let authentication = sessionStorage.getItem('token');
        const {name: fieldName, value} = event.target

        let config = {
            headers: {
                'authentication-token-company': authentication,
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
        console.log(jwt_decode(token));
        axios.get('http://localhost:5000/api/company/show_company_info_id/' + jwt_decode(token).company.id)
            .then(response => {
                console.log(response.data)
                this.setState(response.data);
            })
            .catch(error => console.log("error", error))
    }

    render () {
        const tagClicked = (tag) => {
            if(this.state.tags.includes(tag)) {
                this.state.tags.splice(this.state.tags.indexOf(tag))
            } else {
                this.state.tags.push(tag)
            }
        }
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
                        onChange={(e) => {this.setState({phone_number: (e.target.value).toString()})}}
                        value={this.state.phone_number}/>
                    <StyledTypography>Company website</StyledTypography>
                    <StyledTextField variant="outlined" size="small" type="url"
                        onChange={(e) => {this.setState({website: e.target.value})}}
                        value={this.state.website}/>
                    <StyledTypography>Start up date</StyledTypography>
                    <StyledTextField variant="outlined" size="small" type="date"
                        onChange={(e) => {this.setState({startUpDate: (e.target.value).toString().replace("/", "-")})}} 
                        value={ this.state.startUpDate }/>
                    <StyledTypography>Description</StyledTypography>
                    <StyledTextField variant="outlined" size="small" multiline rows={4} 
                        onChange={(e) => {this.setState({description: e.target.value})}}
                        defaultValue={this.state.description}/> 
                    <Typography style={{
                        color: styles.palette.primary.main,
                        fontWeight: 900,
                        fontSize: 30,
                    }}>More information</Typography><br/>
                    <StyledTypography>MCs</StyledTypography>
                    <StyledTextField variant="outlined" size="small" required
                        onChange={(e) => {this.setState({MCs: e.target.value})}}
                        value={this.state.MCs}/>
                    <StyledTypography>Pitch decks</StyledTypography>
                    <StyledTextField variant="outlined" size="small" required
                        onChange={(e) => {this.setState({pitch_decks: e.target.value})}}
                        value={this.state.pitch_decks}/>
                    <StyledTypography>Financials</StyledTypography>
                    <StyledTextField variant="outlined" size="small" required
                        onChange={(e) => {this.setState({financials: e.target.value})}}
                        value={this.state.financials}/>
                    <StyledTypography>Founding team</StyledTypography>
                    <StyledTextField variant="outlined" size="small" required
                        onChange={(e) => {this.setState({founding_team: e.target.value})}}
                        value={this.state.founding_team}/>
                    <StyledTypography>Categories</StyledTypography>
                    <div>
                        { typeof this.state.tags !== 'undefined' ? 
                            <Tags tagList={tagCategories} status={this.state.tags} handle={tagClicked}/>
                            : null
                        }
                    </div>
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