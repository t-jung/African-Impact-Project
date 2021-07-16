import './ProfileFrame.css'
import React, { Component } from 'react';
import SingleFeed from '../FeedComponents/SingleFeed.js';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { Avatar, ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';

import styles from '../styles'

let token = sessionStorage.getItem('token')
let type = sessionStorage.getItem('type')
let loadUser = sessionStorage.getItem('loadUser')
sessionStorage.removeItem('loadUser');
let userEmail = sessionStorage.getItem('email')

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
  }
}));

export default class ProfileFrame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name:'',
            phone_number:'',
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

    componentWillMount() {
        let email = loadUser;
        console.log(loadUser)
        console.log(userEmail)
        if(type === 'User') {
            axios.get('http://localhost:5000/api/users/getUserByEmail/' + email)
                .then(response=> {
                    console.log(response.data);
                    this.setState(response.data)
                })
                .catch((err) => console.log(err))
                
        } else if (type === 'Company') {
            console.log("Is company")
            axios.get('http://localhost:5000/api/company/show_company_info_email/' + email)
                .then(response=> {
                    console.log(response.data);
                    response.data.profile_type = "User"
                    this.setState(response.data)
                })
                .catch((err) => console.log(err))
        } else {
            axios.get('http://localhost:5000/api/partner/show_partner_info_email/' + email)
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
    let user = info.user
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
        description = user.description
    } else {
        name = user.name
        email = user.email
        phone = user.phone_number
    } 
    var show = loadUser === userEmail ? true : false;

    const classes = useStyles();

    return (
        <div class="bigContainer">                   
            <div class="d-flex align-item-center">
                <IconButton>
                    <a type="button" href="/feed">
                        <ArrowBackIcon/>
                    </a>
                </IconButton>
                <ThemeProvider theme={styles}>
                    <EditButton show={show}/>
                </ThemeProvider>
            </div>
            <div class="topContainer">
                <div class="nameCard"><NameCard
                    userName={name}
                    profilePic={profilePic}
                    userEmail={email}
                    userPhone={phone}
                    info={user}
                    show={show}/></div>
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
                <a href="/profile_edit" button class="btn profile-editBtn">Edit</a>
            </div>
        )
    } else {
        return(<div></div>)
    }
}

const CompanyInfo = (props) => {
    return(
        <div>
            { typeof props.info.location !== 'undefined' ? <h5>Location: {props.info.location}</h5> : null }
            { typeof props.info.industry !== 'undefined' ? <h5>Industry: {props.info.industry}</h5> : null }
            { typeof props.info.website !== 'undefined' ? <h5>Website: {props.info.website}</h5> : null }
        </div>
    )
}



const NameCard = ({userName, userPhone, profilePic, userEmail, info, show}) => {

    function followAction() {
        console.log("clicked")

        let config = {
            headers: {
                'authentication-token-user': token,
            }
        }

        axios.put('http://localhost:5000/api/users/follow', loadUser, config)
            .then(res => {
                console.log(res.data)
                alert("Followed!")
            })
            .catch(err => console.log(err))
    }

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
                { type === 'Company' ? <CompanyInfo info={info}/> : null}
                { show === false ? (
                    <div class="d-flex" >
                        <button class="btn btn_profile message text-uppercase ">message</button>
                        <button class="btn btn_profile follow text-uppercase " onClick={followAction} >follow</button>
                    </div>
                ) : null }
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
    console.log(props.feedList)
    let feeds = props.feedList.map(item => {
        return (
            {
                userName: props.userName,
                img: props.profilePic,
                content: item.text,
                likes: item.likes,
                comments: item.postComments,
                poster: item.posterEmail,
                postId: item._id
            }
        )
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
