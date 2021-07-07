import './ProfileFrame.css'
import React, { useState } from 'react';
import styles from '../styles.js';
import { Typography } from '@material-ui/core';

const EditForm = (props) => {
    const user = props.user;

    const [firstName, setFirstName] = useState(user.firstName);
    const [middleName, setMiddleName] = useState(user.middleName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.serEmail);
    const [confirmEmail, setConfirmEmail] = useState(user.serEmail);
    const [phone, setPhone] = useState(user.userPhone);
    const [description, setDescription] = useState(user.description);

    const onSubmit = (e) => {
        e.preventDefault()
        
        if(!firstName) {
            alert('A first name is required.')
            setFirstName('')
            return
        }

        if(!lastName) {
            alert('A last name is required.')
            setLastName('')
            return
        }
        
        
        if(!email) {
            alert('An email is required.')
            setEmail('')
            return
        }

        if(!phone) {
            alert('A company phone number is required for registration.')
            setPhone('')
            return
        }

        if(email !== confirmEmail) {
            alert('Confirmation email and email don\'t match')
            setConfirmEmail('');
            return
        }

        console.log('Successful.')        
        console.log(`Name: ${firstName}`)
        console.log(`Email: ${email}`)
    }

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
                    defaultValue={user.firstName}
                    onChange={(e) => setFirstName(e.target.value)}/>
            </div>
            <div class="d-flex inputContainer">
                <label class="title  align-self-center" for="fName">Middle name: </label>
                <input type="text"
                    id="mNameID"
                    class="form-control"
                    placeholder="Edit middle name"
                    defaultValue={user.middleName}
                    onChange={(e) => setMiddleName(e.target.value)}/>
            </div>
            <div class="d-flex inputContainer">
                <label class="title  align-self-center" for="lName">Last name: </label>
                <input type="text"
                    id="lNameID"
                    class="form-control"
                    placeholder="Edit last name"
                    defaultValue={user.lastName}
                    onChange={(e) => setLastName(e.target.value)}/>
            </div>
            <div class="d-flex inputContainer">
                <label class="title  align-self-center" for="email">Email: </label>
                <input type="text"
                    id="emailID"
                    class="form-control"
                    placeholder="Edit email"
                    defaultValue={user.serEmail}
                    onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div class="d-flex inputContainer">
                <label class="title  align-self-center" for="email">Confirm email: </label>
                <input type="text"
                    id="emailID"
                    class="form-control"
                    placeholder="Confirm email"
                    onChange={(e) => setConfirmEmail(e.target.value)}/>
            </div>
            <div class="d-flex inputContainer">
                <label class="title  align-self-center" for="phone">Phone number: </label>
                <input type="number"
                    id="phoneID"
                    class="form-control"
                    placeholder="Phone number"
                    defaultValue={user.userPhone}
                    onChange={(e) => setPhone(e.target.value)}/>
            </div>
            <div class="d-flex inputContainer">
                <label class="title  align-self-center" for="email">Description: </label>
                <textarea
                    rows={4}
                    class="form-control multiText"
                    name="body"
                    defaultValue={user.description}
                    onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <div class="d-flex justify-content-center">
                <a href="/profile" button class="btn" type="submit" value="Save!" onClick={onSubmit}>Edit</a>
            </div>        
        </form>
    </div>
    );
    
}

export default EditForm

