import './Feed.css';
import { useState } from 'react';
import SingleFeed from '../FeedComponents/SingleFeed.js';
import axios from 'axios';
import React, { Component } from 'react';
import { Avatar } from '@material-ui/core';
import Notepad from './Notepad'
import styles from '../styles'
import { makeStyles } from '@material-ui/core/styles';

import Nav from '../NavbarComponents/Nav.js'

let token = sessionStorage.getItem('token');
let email = sessionStorage.getItem('email');
let type = sessionStorage.getItem('type')

let classNameHolder = ['greenAvatar', 'yellowAvatar', 'pinkAvatar', 'blueAvatar']

const useStyles = makeStyles((theme) => ({
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

class FeedPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            feedList: [],
            feedFormatted: [],
            user: {},
            chooseClass: classNameHolder[Math.floor(Math.random() * classNameHolder.length)],
        }
    }

    componentDidMount() {
        
        axios.get('http://localhost:5000/api/users/getFollowedPosts/' + email)
            .then(res => {
                console.log(email)
                console.log('getting names')
                console.log(res.data)
                let postInfo = [];
                for(const post of res.data) {
                    axios.get('http://localhost:5000/api/users/getUserByEmail/' + post.posterEmail)
                    .then( resource => {
                        console.log(resource)
                        postInfo.push(
                            {
                                userName: resource.data.firstName + ' ' + resource.data.lastName,
                                img: resource.data.profilePic,
                                content: post.text,
                                likes: post.likes,
                                comments: post.postComments,
                                poster: post.posterEmail,
                                postId: post._id
                            })
                        }
                    )
                    .then(() => this.setState({feedFormatted: postInfo}))
                }
                console.log(this.state.feedFormatted)
            })
            .catch((err) => console.log(err)) 
        
        if(type === 'User') {
            axios.get('http://localhost:5000/api/users/getUserByEmail/' + email)
            .then(response => {
                console.log(response.data)
                this.setState({user: {
                    name: response.data.firstName + ' ' + response.data.lastName
                }})
            })
            .then(sessionStorage.setItem('name', this.state.name))
            .catch((err) => console.log(err))
        } else if (type === "Company") {
            axios.get('http://localhost:5000/api/company/show_company_info_email/' + email)
            .then(response => {
                console.log(response.data)
                this.setState({user: {
                    name: response.data.name
                }})
            }).then(sessionStorage.setItem('name', this.state.name))
            .catch((err) => console.log(err))
        } else {
            axios.get('http://localhost:5000/api/partner/show_partner_info_email/' + email)
            .then(response => {
                console.log(response.data)
                this.setState({user: {
                    name: response.data.name
                }})
            }).then(sessionStorage.setItem('name', this.state.name))
            .catch((err) => console.log(err))
        }
    }

    render() {
        console.log(this.state.feedFormatted)
        return(
            <Feed feedList={this.state.feedFormatted} user={this.state.user} avatarClass={this.state.chooseClass}/>
        )
    }
}

function Feed(props) {
    const [postItem, setPostItem] = useState('')
    let data = sessionStorage.getItem('token');
    console.log(data);

    const submitPost = (e) => {
        e.preventDefault()
        console.log(email)
        if(postItem.length != 0) {
            console.log(postItem)
            let config = {
                headers: {
                    'authentication-token-user': token,
                }
            }

            let dataSubmit = {
                email: email,
                text: postItem
            }

            axios.post('http://localhost:5000/api/users/createPost', dataSubmit, config)
                .then(() => {
                    setPostItem('')
                    alert("Posted!")
                })
                .catch(e => console.log(e));
        } else {
            alert("Cannot post empty blog!");
        }
        
    }

    const GetSchedule = () => {
        return(
            <div class="schedule" >
                <div className="schedule_text"> 
                <p className="makevisible"><Notepad/></p>
                
                </div>
                
            </div>
        )
    }

    const classes=useStyles()

    return (
        <div class="conatiner_feed">
            <div class="split left">
                <Nav user={props.user} avatarClass={classes[props.avatarClass]}/>
                <div class="feedSection">
                <div class="postBox">
                    <div class="feed-avatar">
                        <a href="/profile" type="button" onClick={() => {sessionStorage.setItem('loadUser', email) ; console.log(email) }}>
                            <Avatar className={classes[props.avatarClass]}>{typeof props.user.name !== 'undefined' ? props.user.name[0] : 'U'}</Avatar>
                        </a>
                    </div>
                <textarea id="userPOst" class="postBoxStyling" rows="1" cols="100" placeholder="Post something!" onChange={e => setPostItem(e.target.value)}></textarea>
                <button class="btn btn_post_blog" onClick={submitPost}>  POST  </button>
            </div>
                <div class="feed_top">
                    {typeof props.feedList !== 'undefined' ? <SingleFeed feedList={props.feedList}/> : <h5>No posts!</h5>}
                </div>
                </div>
                
            </div>
            <div class="split right">
                <GetSchedule />
            </div>

        </div>
    )    
}

export default FeedPage
