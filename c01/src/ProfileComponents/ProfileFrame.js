import './ProfileFrame.css'
import React, { Component, useState } from 'react';
import SingleFeed from '../FeedComponents/SingleFeed.js';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { Avatar, ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

import styles from '../styles'

let token = sessionStorage.getItem('token')
let type = sessionStorage.getItem('type')
let loadUser = sessionStorage.getItem('loadUser')
let loadType = sessionStorage.getItem('loadType')
let userEmail = sessionStorage.getItem('email')

let classNameHolder = ['greenAvatar', 'yellowAvatar', 'pinkAvatar', 'blueAvatar']

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
  middle: {
    width: 70,
    height: 70,
    margin: 5
  },
  greenAvatar:{
    backgroundColor: styles.palette.green.main,
    },
    yellowAvatar:{
        backgroundColor: styles.palette.yellowLemon.main,
    },
    pinkAvatar:{
        backgroundColor: styles.palette.pink.main,
    },
    blueAvatar:{
        backgroundColor: styles.palette.blue.main,
    },
}));

export default class ProfileFrame extends Component {

    state = {
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
        follower: '',
        followed: false,
    }

    constructor(props) {
        super(props);
        this.state = this.handleStateChange.bind(this)
    }

    componentWillMount() {
        console.log(loadUser)
        console.log(loadType)
        console.log(userEmail)
        if(loadType.toLowerCase() === 'user') {
            axios.get('http://localhost:5000/api/users/getUserByEmail/' + loadUser)
                .then(response=> {
                    console.log(response.data);
                    this.setState(response.data)
                }).then(res => {
                    for(let indiv of this.state.follower) {
                        console.log(indiv)
                        console.log(indiv.email)
                        console.log(userEmail)
                        if(indiv.email === userEmail) {
                            console.log(indiv.email)
                            this.setState({followed: true})
                            break;
                        }
                    }
                })
                .catch((err) => console.log(err))
                
        } else if (loadType.toLowerCase() === 'company') {
            console.log("Is company")
            axios.get('http://localhost:5000/api/company/show_company_info_email/' + loadUser)
                .then(response=> {
                    console.log(response.data);
                    this.setState(response.data)
                })
                .catch((err) => console.log(err))
            if(type.toLowerCase() === 'partner') {
                let config = {
                    headers: {
                        'authentication-token-partner': token,
                    }
                }
                console.log("Is partner viewing company");
                axios.get('http://localhost:5000/api/company/partner_view_email/' + loadUser, config)
                    .then(response=> {
                        console.log(response.data);
                        this.setState({ moreDetails: response.data })
                    })
                    .then(() => console.log(this.state))
                    .catch((err) => console.log(err))
            }
        } else {
            axios.get('http://localhost:5000/api/partner/show_partner_info_email/' + loadUser)
            .then(response=> {
                console.log(response.data);
                this.setState(response.data)
            })
            .catch((err) => console.log(err))

        }
    }

    handleStateChange = (value) => {
        console.log("CLICKEDDDD")
        let followed = this.state.followed
        console.log(this.state.followed)
        this.setState({followed: value})
        console.log(this.state.followed)
    }

    render(){
        console.log(this.state)
        return (
            <ProfileUserFrame user={this.state} handle={this.handleStateChange}/>
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
    let email = user.email
    let phone = user.phoneNumber
    let description = user.description
    let follower = []
    if(loadType.toLowerCase() === 'user') {
        name = user.firstName + ' ' + user.lastName
        profilePic = user.profilePic
        description = user.description
        follower = user.follower
    } else {
        name = user.name
    } 
    var show = loadUser === userEmail ? true : false;

    return (
        <div class="bigContainer">                   
            <div class="d-flex align-item-center">
                <IconButton>
                    <a type="button" href="/feed">
                        <ArrowBackIcon/>
                    </a>
                </IconButton><br/>
                <ThemeProvider theme={styles}>
                    <EditButton show={show}/>
                </ThemeProvider>
            </div>
            <div class="topContainer">
                <div class="nameCard"><NameCard
                    userName={name}
                    profilePic={profilePic}
                    email={email}
                    userPhone={phone}
                    info={user}
                    show={show}
                    follower={follower}
                    followed={user.followed}
                    handle={info.handle}/>
                    </div>
                <div class="align-self-center flex-grow-1">
                    <div><InfoCard info={description}/></div>
                </div>
            </div>
            <div class="bottomContainer">
                <div class="lessonMargin">

                </div>
                <div class="postBoard">
                    {loadType.toLowerCase() === 'company' ? 
                        <CompanyBoard company={info.user}/> 
                        : <PostBoard feedList={user.userPosts}
                        userName={user.firstName  + ' ' + user.lastName}
                        profilePic={user.profilePic}/>
                    }
                    {loadType.toLowerCase() === 'company' && type.toLowerCase() === 'partner' ? 
                        <PartnerViewCompany company={info.user}/> 
                        : null
                    }
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

const NameCard = (props) => {

    function followAction() {
        console.log(props.handle)
        
        let config = {
            headers: {
                'authentication-token-user': token,
            }
        }
        let infoEmail = {
            email: loadUser
        }
        axios.put('http://localhost:5000/api/users/follow', infoEmail, config)
            .then(res => {
                console.log(res.data)
                alert("Followed!")
                props.handle(true)
            })
            .catch(err => {
                console.log(err.response.data);
                 console.log(err.response.headers);
                 alert(err.response.data)
            })
    }

    function unfollowAction() {
        let config = {
            headers: {
                'authentication-token-user': token,
            }
        }
        let infoEmail = {
            email: loadUser
        }

        axios.put('http://localhost:5000/api/users/unfollow', infoEmail, config)
            .then(res => {
                console.log(res.data)
                alert("Unfollowed!")
                props.handle(false)
            })
            .catch(err => console.log(err))
    }

    const messageUser = () => {
        window.location = "/chatroom"
    }

    const classes = useStyles();
    console.log(props.userName);

    return (
        <div class="nameCard">
            <div class="p-2 align-self-center">
                <Avatar 
                    style={{
                        fontSize: 100,
                    }}
                    className={[classes.large, classes[classNameHolder[Math.floor(Math.random() * classNameHolder.length)]]]} alt={props.userName} src={props.profilePic}>{typeof props.userName !== 'undefined' ? props.userName[0].toUpperCase() : "U"}</Avatar>
            </div>
            <div class="p-2 align-self-center">
                <h4 class="userName">{props.userName}</h4>
                <h5>{props.email} {typeof props.userPhone !== 'undefined' ? '|' : ''} {props.userPhone}</h5>
                { props.show === false ? (
                    <div class="d-flex" >
                        <button class="btn btn_profile message text-uppercase " onClick={messageUser}>message</button>
                        {loadType.toLowerCase() === 'user' ? 
                            props.followed === true ? <button class="btn btn_profile follow text-uppercase " onClick={unfollowAction} >unfollow</button> : 
                            <button class="btn btn_profile follow text-uppercase " onClick={followAction} >follow</button>
                            : null
                        }
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

const CompanyRecommendations = (props) => {
    const classes = useStyles();
    console.log(props.list)
    const list = props.list
    if(typeof list === 'undefined') {
        return(
            <div></div>
        )
    }
    console.log("not undefined")
    return(
        <Grid container>
            <Grid item container direction="row" justify="flex-start" alignItems="center">
                {list.map(item => (
                    <a href="/profile" onClick={() => {sessionStorage.setItem('loadUser', item); sessionStorage.setItem('loadType', 'company')}}>
                        <Avatar className={[classes.middle, classes[classNameHolder[Math.floor(Math.random() * classNameHolder.length)]]]}>
                            {item[0].toUpperCase()}
                        </Avatar>
                    </a>
                )) }
            </Grid>
        </Grid>
    )
}

const DisplayTag = (props) => {
    const list = props.list
    return(
        <div class="company-website company-display-space">
            {list.map(item => (
                <Chip 
                    style={{
                        marginRight: '1vw',
                        backgroundColor: styles.palette.yellowLemon.main,
                        fontSize: 18,
                    }}
                    label={item}/>
            ))}
        </div>
    )
}

const CompanyBoard = (props) => {
/*
            "name":company.name,
            "email":company.email,
            "phone_number":company.phone_number,
            "location":company.location,
            "industry":company.industry,
            "website":company.website,
            "startUpDate":company.startUpDate,
            "description":company.discription,
            "tags":company.tags,
            "recommendation":similar_company
*/
    const company = props.company
    console.log(company)
    return(
        <div>
            <div class="company-recommendations">
               <h4>Recommendations: </h4>
                <CompanyRecommendations list={company.recommendation}/> 
            </div>
            <div>
                <h3>More about the company:</h3>
                <div class="company-card company-card-one">
                    { typeof company.location !== 'undefined' ? <h5>Location: {company.location}</h5> : null }
                    { typeof company.industry !== 'undefined' ? <h5>Industry: {company.industry}</h5> : null }
                    { typeof company.website !== 'undefined' ? <div class="company-website"><h5>Website: </h5> <a class="company-display-space" href={company.website}><h5>{company.website}</h5></a></div> : null } 
                    { typeof company.startUpDate !== 'undefined' ? <h5>Industry: {company.startUpDate}</h5> : null }
                    { typeof company.tags !== 'undefined' ? <div class="company-website"><h5>Tags:</h5><DisplayTag list={company.tags}/></div> : null }
                </div>
            </div>
            
        </div>
    )
}

const PartnerViewCompany = (props) => {
    /*
    MCs: "This is MCs"
    financials: "This is financials"
    founding_team: "This is founding_team"
    pitch_decks: "This is pitch_decks"
    _id: "60df66799f61d542fc810705"
    */
   const details = props.company.moreDetails
   console.log(props)
   if(typeof props.company.moreDetails === 'undefined') {
       return(
           <div></div>
       )
   } else {
        return(
            <div>
                <h3>Additional information: </h3>
                <div class="company-card company-card-two">
                    <h5>MC: {details.MCs}</h5>
                    <h5>Financials: {details.financials}</h5>
                    <h5>Founding team: {details.founding_team}</h5>
                    <h5>Pitch desks: {details.pitch_desks}</h5>
                </div>
                
            </div>
        )
    }
}

const PostBoard = (props) => {
    console.log(props.feedList)
    let feeds = []
    if(typeof props.feedList !== 'undefined'){
        feeds = props.feedList.map(item => {
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
    }

    console.log(feeds);

    console.log(props.feedList)
    return(
        <div>
            <h2>Posts:</h2>
            <div>
                <SingleFeed feedList={feeds}/>
            </div>
        </div>
        

    )
}
