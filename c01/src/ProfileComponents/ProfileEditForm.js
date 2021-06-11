import'../NavigationComponents/Sidebar';
import './ProfileFrame.css'
import React from 'react';
import Sidebar from '../NavigationComponents/Sidebar';



const ProfileEditForm = ({userID}) => {
    var firstName = "User"
    var midName = "Here"
    var lastName = "Name"
    var profilePic = "https://i1.sndcdn.com/artworks-Z8AyljiXPrMSNaPb-ecOERw-t500x500.jpg";
    var userEmail = "userName.cscc01@email.com";
    var userPhone = 1234567890;
    var description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    var type = "Partner";
    return(
        <div class="formContainer card">
            <h3>Editing {type} Profile Information:</h3>
            <form>
                <div class="d-flex inputContainer">
                    <label class="title  align-self-center" for="fName">First name: </label>
                    <input type="text"
                        id="fNameID"
                        class="form-control"
                        placeholder="Edit first name"
                        defaultValue={firstName}/>
                </div>
                <div class="d-flex inputContainer">
                    <label class="title  align-self-center" for="fName">Middle name: </label>
                    <input type="text"
                        id="mNameID"
                        class="form-control"
                        placeholder="Edit middle name"
                        defaultValue={midName}/>
                </div>
                <div class="d-flex inputContainer">
                    <label class="title  align-self-center" for="lName">Last name: </label>
                    <input type="text"
                        id="lNameID"
                        class="form-control"
                        placeholder="Edit last name"
                        defaultValue={lastName}/>
                </div>
                <div class="d-flex inputContainer">
                    <label class="title  align-self-center" for="email">Email: </label>
                    <input type="text"
                        id="emailID"
                        class="form-control"
                        placeholder="Edit email"
                        defaultValue={userEmail}/>
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
                        defaultValue={userPhone}/>
                </div>
                <div class="d-flex inputContainer">
                    <label class="title  align-self-center" for="email">Description: </label>
                    <textarea
                        class="form-control multiText"
                        name="body"
                        defaultValue={description}/>
                </div>
                <div class="d-flex justify-content-center"><input class="btn" type="submit" value="Save!"/></div>
                
                
            </form>
            
        </div>
    )
}

export default ProfileEditForm