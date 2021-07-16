import './Feed.css';
import { useState, useEffect } from 'react';
import SingleFeed from '../FeedComponents/SingleFeed.js';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import React, { Component } from 'react';
import { Avatar } from '@material-ui/core';

import Nav from '../NavbarComponents/Nav.js'

let token = sessionStorage.getItem('token');
let email = sessionStorage.getItem('email');

class FeedPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            feedList: [],
            feedFormatted: [],
            user: {}
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/users/getFollowedPosts/' + email)
            .then(res => {
                console.log(email)
                console.log('getting names')
                console.log(res.data)
                this.setState({feedFormatted:                
                [{
                    postId: '60efabcfea59db3d684e25d6',
                    userName: 'Yuanyuan Li',
                    img: '',
                    content: 'hi testing',
                    likes: [],
                    comments: [],
                    poster: "Yuanyuan@mail.com",
                },
                {
                    postId: '60e6398bd713d01d53259b7f',
                    userName: 'Yuanyuan Li',
                    img: '',
                    content: 'Another post',
                    likes: [],
                    comments: [],
                    poster: "Yuanyuan@mail.com",
                }]})
            })
            .catch((err) => console.log(err))

        axios.get('http://localhost:5000/api/users/getUserByEmail/' + email)
        .then(response => {
            console.log(response.data)
            this.setState({user: response.data})
        })
        .catch((err) => console.log(err))
    }

    render() {
        console.log(this.state.feedFormatted)
        return(
            <Feed feedList={this.state.feedFormatted} user={this.state.user}/>
        )
    }
}

function Feed(props) {
    console.log(props.feedList);
    console.log(props.user);
    const [searchTerm, setSearchTerm] = useState('')
    const [postItem, setPostItem] = useState('')
    let data = sessionStorage.getItem('token');
    console.log(data);

    const submitPost = (e) => {
        console.log(email)
        if(postItem.length != 0) {
            console.log(postItem)
            let config = {
                headers: {
                    'authentication-token-user': token,
                }
            }

            let data = {
                email: email,
                text: postItem
            }

            axios.post('http://localhost:5000/api/users/createPost', data, config)
                .then(res => console.log(res))
                .catch(e => console.log(e));
        } else {
            alert("Cannot post empty blog!");
        }
        
    }

    const GetSchedule = () => {
        return(
            <div class="schedule" >
                <div className="schedule_text"> 
                <p className="makevisible">TODO:<br/><br/>0800: Attend lecture 1 <br/> 13:00 Attending Meeting 3</p>
                </div>
                
            </div>
        )
    }

    return (
        <div class="conatiner_feed">
            <div class="split left">
                <Nav user={props.user}/>
                <div class="feedSection">
                <div class="postBox">

                    <a href="/profile" onclick={ sessionStorage.setItem('loadUser', email)  }>
                        <Avatar>{typeof props.user.firstName !== 'undefined' ? props.user.firstName[0] : 'U'}</Avatar>
                    </a>

                    <textarea id="userPOst" rows="2" cols="100" placeholder="Post something!" onChange={e => setPostItem(e.target.value)}></textarea>
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
