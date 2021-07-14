
import './ProfileFrame.css'
import React, { Component } from 'react';
import SingleFeed from '../FeedComponents/SingleFeed.js';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

let token = sessionStorage.getItem('token')
let type = sessionStorage.getItem('type')

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: 280,
    height: 280,
  },
}));

export default class ProfileFrame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            gender: '',
            phoneNumber: '',
            address: '',
            email: '',
            password: '',
            status: '',
            profile_type: '',
            userPosts: [],
            following: '',
            follower: ''
        }
    }

    componentDidMount() {
        console.log(sessionStorage.getItem('type'))
        if(type === 'User') {
            axios.get('http://localhost:5000/api/users/getUserById/' + jwt_decode(token).user.id)
                .then(response=> {
                    console.log(response.data);
                    this.setState(response.data)
                })
                .catch((err) => console.log(err))
                
        } else if (type === 'Company') {
            console.log("Is company")
            axios.get('http://localhost:5000/api/company/show_company_id/' + jwt_decode(token).company.id)
                .then(response=> {
                    console.log(response.data);
                    this.setState(response.data)
                })
                .catch((err) => console.log(err))
        } else {
            axios.get('http://localhost:5000/api/partner/show_partner_id/' + jwt_decode(token).partner.id)
            .then(response=> {
                console.log(response.data);
                this.setState(response.data)
            })
            .catch((err) => console.log(err))

        }
    }

    render(){
        console.log(this.state)
        return (
            <ProfileUserFrame user={this.state}/>
        )
    }
}

const ProfileUserFrame = (info) => {
    // User userID to get the following details:
    console.log("Profile");
    console.log(info);
    let user = type === 'User' ? info.user : (type === 'Company' ? info.company : info.partner)
    let name = ''
    let profilePic = ''
    let email = ''
    let phone = ''
    let description = ''
    if(type === 'User') {
        name = user.firstName + ' ' + user.lastName
        profilePic = user.profilePic
        email = user.email
        phone = user.phoneNumber
    } else {
        name =user.name
        email = user.email
        phone = user.phone_number
    } 
    var show = true;

    return (
        <div class="bigContainer">                   
            <div><EditButton show={show}/></div>
            <div class="topContainer">
                <div class="nameCard"><NameCard
                    userName={name}
                    profilePic={profilePic}
                    userEmail={email}
                    userPhone={phone}/></div>
                <div class="align-self-center flex-grow-1">
                    <div><InfoCard info={description}/></div>
                </div>
            </div>
            <div class="bottomContainer">
                <div class="lessonMargin">

                </div>
                <div class="postBoard">
                    <h2>Posts:</h2>
                    <PostBoard feedList={user.userPosts}
                        userName={user.firstName  + ' ' + user.lastName}
                        profilePic={user.profilePic}/>
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
    const classes = useStyles();
    console.log(userName);
    return (
        <div class="nameCard">
            <div class="p-2 align-self-center">
                <Avatar className={classes.large} alt={userName} src={profilePic}>{userName[0]}</Avatar>
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


const PostBoard = (props) => {

    let feeds = props.feedList.map(item => {
        const feed = 
            {
                userName: props.userName,
                img: props.profilePic,
                content: item.text,
                likes: item.likes,
                comments: item.postComments,
            }
        
        return feed
    })

    console.log(feeds);

    console.log(props.feedList)
    return(
        <div>
            <SingleFeed feedList={feeds}/>
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
