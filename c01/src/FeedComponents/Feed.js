import './Feed.css';
import { useState, useEffect } from 'react';
import SingleFeed from '../FeedComponents/SingleFeed.js';
import UserPost from '../FeedComponents/UserPostComponents/UserPost'
import jwt_decode from "jwt-decode";
import axios from 'axios';
import React, { Component } from 'react';
import { Avatar } from '@material-ui/core';

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
                console.log('getting names')
                let feeds = []
                for(const item of res.data){
                    axios.get('http://localhost:5000/api/users/getUserByEmail/' + item.posterEmail)
                        .then(response => {
                            console.log(response.data)
                            console.log(item)
                            feeds.push({
                                userName: response.data.firstName + ' ' + response.data.lastName,
                                img: item.profilePic,
                                content: item.text,
                                likes: item.likes,
                                comments: item.postComments,
                                poster: item.posterEmail,
                            })
                        })
                        .catch(err => console.log(err))
                }
                console.log(feeds)
                this.setState({feedFormatted: feeds})
                console.log(this.state.feedFormatted)
            }

            )
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
                <div class="feedSection">
                <div class="postBox">

                    <a href="/profile" onclick={ sessionStorage.setItem('loadUserEmail', email) }>
                        <Avatar>C</Avatar>
                    </a>

                    <textarea id="userPOst" rows="2" cols="100" placeholder="Post something!" onChange={e => setPostItem(e.target.value)}></textarea>
                    <button class="btn btn_post_blog" onClick={submitPost}>  POST  </button>
                </div>
                <div class="feed_top">
                    {props.feedList.map(item => (
                        <UserPost feed={item}/>
                    ))}
                    {useEffect (() => {
                        console.log("Re-rendering")
                        return(
                        <SingleFeed feedList={props.feedList}/>)
                    }, [props.feedList])}
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
