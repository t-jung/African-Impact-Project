
import './ProfileForm.css'

import React from 'react';
// import { VisualViewport, image, StyleSheet } from 'react-native';

const ProfileForm = ({userID}) => {
    // User userID to get the following details:
    var userName = "User Name Here";
    var profilePic = "https://cdn.discordapp.com/attachments/486906466951888896/851098437960335400/stick33er.webp";
    var userEmail = "userName.cscc01@email.com";
    var userPhone = "+1 000-0000-0000";
    var description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    return (
        <div>
            <div class="topContainer">
                <div class="d-flex flex-row">
                    <div><NameCard
                        userName={userName}
                        profilePic={profilePic}
                        userEmail={userEmail}
                        userPhone={userPhone}/></div>
                    <div class="align-self-center flex-grow-1">
                        <div class=""><InfoCard info={description}/></div>
                    </div>
                    
                </div>
            </div>
            <div class="bottomContainer">

                <div class="d-flex flex-row">
                    <div class="postBoard">
                        <h2>Posts:</h2>
                        <PostBoard/>
                    </div>
                    <div class="lessonMargin">
                        <LessonBoard/>
                    </div>
                </div>
            </div>
        </div>

    );
}

const NameCard = ({userName, userPhone, profilePic, userEmail}) => {

    return (
        <div class="nameCard">
            <div class="p-2 align-self-center">
                <img class="profilePicture"
                    src={profilePic}
            />
            </div>
            <div class="p-2 align-self-center">
                <h4 class="userName">{userName}</h4>
                <h5>{userEmail} | {userPhone}</h5>
                <div class="d-flex">
                    <button class="btn message text-uppercase btn-block">message</button>
                    <button class="btn follow text-uppercase btn-block">follow</button>
                </div>
                
            </div>
        </div>
    )

}

const InfoCard = ({info}) => {
    return (
        <div class="infoCard">
            <div class="d-flex flex-column align-self-md-center">
                <h5>{info}</h5>
            </div>
        </div>

    )
}


const PostBoard = () => {
    return(
        <div>
            <BlogPost/>
            <BlogPost/>
            <BlogPost/>
        </div>

    )
}

const BlogPost = () => {
    return (
       <div class="card">
           <h5>Personal blogs. "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</h5>
       </div> 
    )
}


const LessonBoard = () => {
    return (
        <div>
            <div class="lessonBoard card">
                <h4>Currently learning:</h4>
                <li>Course 1</li>
                <li>Course 2</li>
            </div> 
        </div>

    )
}

const CompanyMembers = () => {
    return(
        <div class="d-flex flex-row">
            

        </div>
    )
}

export default ProfileForm