import './CompanyEditForm.css'
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider, withStyles } from '@material-ui/core/styles';

import styles from '../styles'
import { Typography, Button } from '@material-ui/core';

const company = {
    companyName: "Some Company",
    companyPic: "https://cdn.discordapp.com/attachments/829661320923447326/860355801931579422/unknown.png",
    companyEmail: "userName.cscc01@email.com",
    companyPhone: 123456789,
    companyWebsite: "https://www.figma.com/file/npjb3FIZ4RZfx7MHQXhUf2/Untitled?node-id=2%3A126",
    companyDescription:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    type: "Company"
}

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

const CompanyEditForm = () => {
    return (
        <div class="formContainer">
            <ThemeProvider theme={styles}>
                <Typography style={{
                    color: styles.palette.primary.main,
                    fontWeight: 900,
                    fontSize: 30,
                }}>Company profile edit</Typography><br/>
                <StyledTypography>Company name</StyledTypography>
                <StyledTextField variant="outlined" size="small" required type="text" defaultValue={company.companyName}/>
                <StyledTypography>Company email</StyledTypography>
                <StyledTextField variant="outlined" size="small" autoComplete required type="email" defaultValue={company.companyEmail}/>
                <StyledTypography>Company phone number</StyledTypography>
                <StyledTextField variant="outlined" size="small" autoComplete required type="tel" defaultValue={company.companyPhone}/>
                <StyledTypography>Company website</StyledTypography>
                <StyledTextField variant="outlined" size="small" type="url" defaultValue={company.companyWebsite}/>
                <StyledTypography>Start up date</StyledTypography>
                <StyledTextField variant="outlined" size="small" type="date"/>
                <StyledTypography>Description</StyledTypography>
                <StyledTextField variant="outlined" size="small" multiline rows={4} defaultValue={company.companyDescription}/> 
            </ThemeProvider>
            <div class="d-flex justify-content-center">
                <Button style={{
                    background: styles.palette.secondary.main,
                    borderRadius: 10,
                    fontSize: 15,
                }}>Submit</Button>
            </div>
            
        </div>
    );
}

export default CompanyEditForm