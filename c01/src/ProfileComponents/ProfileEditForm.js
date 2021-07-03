import './ProfileFrame.css'
import React from 'react';
import styles from '../styles.js';
import { Typography } from '@material-ui/core';

const EditForm = (props) => {
    const user = props.user;
    return(
    <div class="formContainer card">
        <Typography style={{
                    color: styles.palette.primary.main,
                    fontWeight: 900,
                    fontSize: 30,
                }}>
            Editing {user.type} Profile Information:
         </Typography><br/>
        <form>
            <div class="d-flex inputContainer">
                <label class="title  align-self-center" for="fName">First name: </label>
                <input type="text"
                    id="fNameID"
                    class="form-control"
                    placeholder="Edit first name"
                    defaultValue={user.firstName}/>
            </div>
            <div class="d-flex inputContainer">
                <label class="title  align-self-center" for="fName">Middle name: </label>
                <input type="text"
                    id="mNameID"
                    class="form-control"
                    placeholder="Edit middle name"
                    defaultValue={user.middleName}/>
            </div>
            <div class="d-flex inputContainer">
                <label class="title  align-self-center" for="lName">Last name: </label>
                <input type="text"
                    id="lNameID"
                    class="form-control"
                    placeholder="Edit last name"
                    defaultValue={user.lastName}/>
            </div>
            <div class="d-flex inputContainer">
                <label class="title  align-self-center" for="email">Email: </label>
                <input type="text"
                    id="emailID"
                    class="form-control"
                    placeholder="Edit email"
                    defaultValue={user.serEmail}/>
            </div>
            <div class="d-flex inputContainer">
                <label class="title  align-self-center" for="email">Confirm email: </label>
                <input type="text"
                    id="emailID"
                    class="form-control"
                    placeholder="Confirm email"/>
            </div>
            <div class="d-flex inputContainer">
                <label class="title  align-self-center" for="phone">Phone number: </label>
                <input type="number"
                    id="phoneID"
                    class="form-control"
                    placeholder="Phone number"
                    defaultValue={user.userPhone}/>
            </div>
            <div class="d-flex inputContainer">
                <label class="title  align-self-center" for="email">Description: </label>
                <textarea
                    rows={4}
                    class="form-control multiText"
                    name="body"
                    defaultValue={user.description}/>
            </div>
            <div class="d-flex justify-content-center">
                <a href="/profile" button class="btn" type="submit" value="Save!">Edit</a>
            </div>        
        </form>
    </div>
    );
    
}

export default EditForm

