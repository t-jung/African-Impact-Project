import './Feed.css';
import { useState } from 'react';
import SingleFeed from '../FeedComponents/SingleFeed.js';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import React, { Component } from 'react';
import { Avatar } from '@material-ui/core';

let token = sessionStorage.getItem('token');
let email = sessionStorage.getItem('email');

class FeedPage extends Component {

    state = {
        feedList: [],
        user: {}
    }

    constructor(props) {
        super(props)

    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/users/getFollowedPosts/' + email)
            .then(response => {
                console.log(email)
                console.log(response.data)
                this.setState({feedList: response.data})
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
        return(
            <Feed feedList={this.state.feedList} user={this.state.user}/>
        )
    }
}

function Feed(props) {
    console.log(props.feedList);
    let authentication = sessionStorage.getItem('token');
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

    let feeds = props.feedList.map(item => {
        return (
            {
                userName: props.userName,
                img: props.profilePic,
                content: item.text,
                likes: item.likes,
                comments: item.postComments,
                poster: item.posterEmail
            })
    })

    console.log(feeds)

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
                    {feeds.length != 0 ? <SingleFeed feedList={feeds}/> : null}
                    
                </div>
                </div>
                
            </div>
            <div class="split right">
                <GetSchedule />
            </div>
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossOrigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossOrigin="anonymous"></script>
        </div>
    )

    

    
}

export default FeedPage
