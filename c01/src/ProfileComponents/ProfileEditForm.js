import'../NavigationComponents/Sidebar';
import './ProfileFrame.css'
import React from 'react';
import SideBarProfile from './SideBarProfile';
import styles from '../styles.js';
import { ThemeProvider, withStyles, makeStyles } from '@material-ui/styles';

// from database
const user = {
    firstName: "User",
    middleName: "Here",
    lastName: "Name",
    profilePic: "https://i1.sndcdn.com/artworks-Z8AyljiXPrMSNaPb-ecOERw-t500x500.jpg",
    userMeail: "userName.cscc01@email.com",
    userPhone: 123456789,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    type: "Partner"
}

const ProfileEditForm = () => {
    return(
        <div class="profileEdit_container">
            <div class="profileEdit_split profileEdit_left"><SideBarProfile theme={styles}/></div>
            <div class="profileEdit_formContainer">
                <div class="formContainer card">
                <h3>Editing {user.type} Profile Information:</h3>
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
                            class="form-control multiText"
                            name="body"
                            defaultValue={user.description}/>
                    </div>
                    <div class="d-flex justify-content-center">
                        <a href="/profile" button class="btn" type="submit" value="Save!">Edit</a>
                    </div>
                    
                    
                </form>

                </div>
            </div>
        </div>
        
    )
}

export default ProfileEditForm

