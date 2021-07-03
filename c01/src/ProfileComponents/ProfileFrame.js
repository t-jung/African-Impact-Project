
import './ProfileFrame.css'
import React from 'react';
import SingleFeed from '../FeedComponents/SingleFeed.js';

const user = {
    firstName: "User",
    middleName: "Here",
    lastName: "Name",
    profilePic: "https://cdn.discordapp.com/attachments/829661320923447326/860355801931579422/unknown.png",
    userEmail: "userName.cscc01@email.com",
    userPhone: 123456789,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    type: "Partner"
}

const feedList = [
    {
        userName: "Gura",
        img: "https://cdn.discordapp.com/attachments/829661320923447326/860355801931579422/unknown.png",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        comment: [
            {
                userName: "Tim",
                img: "",
                content: "This is great to hear!"
            },
            {
                userName: "Hortons",
                img: "https://scontent-nrt1-1.xx.fbcdn.net/v/t1.6435-0/p526x296/205338742_520342779417948_4620301495797869681_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=730e14&_nc_ohc=kisa0E-JHmYAX-pf-oR&_nc_ht=scontent-nrt1-1.xx&tp=6&oh=817cceaebf4c157b71faea6c711f092b&oe=60E59340",
                content: "Congratulations!!"
            },
        ]
    },
    {
        userName: "Gura",
        img: "https://cdn.discordapp.com/attachments/829661320923447326/860355801931579422/unknown.png",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        comment: [
            {
                userName: "Tim",
                img: "",
                content: "This is great to hear!"
            },
            {
                userName: "Hortons",
                img: "https://scontent-nrt1-1.xx.fbcdn.net/v/t1.6435-0/p526x296/205338742_520342779417948_4620301495797869681_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=730e14&_nc_ohc=kisa0E-JHmYAX-pf-oR&_nc_ht=scontent-nrt1-1.xx&tp=6&oh=817cceaebf4c157b71faea6c711f092b&oe=60E59340",
                content: "Congratulations!!"
            },
        ]
    },
    {
        userName: "Gura",
        img: "https://cdn.discordapp.com/attachments/829661320923447326/860355801931579422/unknown.png",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        comment: [
            {
                userName: "Tim",
                img: "",
                content: "This is great to hear!"
            },
            {
                userName: "Hortons",
                img: "https://scontent-nrt1-1.xx.fbcdn.net/v/t1.6435-0/p526x296/205338742_520342779417948_4620301495797869681_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=730e14&_nc_ohc=kisa0E-JHmYAX-pf-oR&_nc_ht=scontent-nrt1-1.xx&tp=6&oh=817cceaebf4c157b71faea6c711f092b&oe=60E59340",
                content: "Congratulations!!"
            },
        ]
    },
    {
        userName: "Gura",
        img: "https://cdn.discordapp.com/attachments/829661320923447326/860355801931579422/unknown.png",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        comment: [
            {
                userName: "Tim",
                img: "",
                content: "This is great to hear!"
            },
            {
                userName: "Hortons",
                img: "https://scontent-nrt1-1.xx.fbcdn.net/v/t1.6435-0/p526x296/205338742_520342779417948_4620301495797869681_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=730e14&_nc_ohc=kisa0E-JHmYAX-pf-oR&_nc_ht=scontent-nrt1-1.xx&tp=6&oh=817cceaebf4c157b71faea6c711f092b&oe=60E59340",
                content: "Congratulations!!"
            },
        ]
    },
]

const ProfileFrame = ({userID}) => {
    // User userID to get the following details:
    var show = true;
    return (
        <div class="bigContainer">                   
            <div><EditButton show={show}/></div>
            <div class="topContainer">
                <div class="nameCard"><NameCard
                    userName={user.firstName + ' ' + user.middleName + ' ' + user.lastName}
                    profilePic={user.profilePic}
                    userEmail={user.userEmail}
                    userPhone={user.userPhone}/></div>
                <div class="align-self-center flex-grow-1">
                    <div><InfoCard info={user.description}/></div>
                </div>
            </div>
            <div class="bottomContainer">
                <div class="lessonMargin">
                    <LessonBoard/>
                </div>
                <div class="postBoard">
                    <h2>Posts:</h2>
                    <PostBoard/>
                </div>
                
            </div>
        </div>

    );
}

const EditButton = ({show}) => {
    if(show === true) {
        return (
            <div >
                <a href="/profile_edit" button class="btn">Edit</a>
            </div>
        )
    } else {
        return(<div></div>)
    }
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
                <div class="d-flex" >
                    <button class="btn btn_profile message text-uppercase ">message</button>
                    <button class="btn btn_profile follow text-uppercase ">follow</button>
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
    console.log(feedList)
    return(
        <div>
            <SingleFeed feedList={feedList}/>
        </div>

    )
}

const LessonBoard = () => {
    var courses = ["Course 1", "Course 2"];
    return (
        <div>
            <div class="card">
                <h4>Currently learning:</h4>
                <div class="lessonBoard">
                    {courses.map(course => <pre>{course}, </pre>)}
                </div> 
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

export default ProfileFrame