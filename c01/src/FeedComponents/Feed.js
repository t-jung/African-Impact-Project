import './Feed.css';
import { useState } from 'react';
import SingleFeed from '../FeedComponents/SingleFeed.js';
import jwt_decode from "jwt-decode";

let userToken = sessionStorage.getItem('token');

const feedList = [
    {
        userName: "Tims",
        img: "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-1100x628.jpg",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        userName: "Hopes",
        img: "https://media.discordapp.net/attachments/696740477533421618/860358985038299136/1624125391049.png",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        userName: "Gura",
        img: "https://cdn.discordapp.com/attachments/829661320923447326/860355801931579422/unknown.png",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        userName: "Hopes",
        img: "https://media.discordapp.net/attachments/696740477533421618/860358985038299136/1624125391049.png",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
]

function Feed() {
    let authentication = sessionStorage.getItem('token');
    console.log(authentication);
    const [searchTerm, setSearchTerm] = useState('')
    let data = sessionStorage.getItem('token');
    console.log(data);

    const GetFeed = (props) => {
        let feed = props.feed;
        return (
            <div class="card">
                <div class="card-body">
                    <div class="d-flex">
                    <img src={feed.img} className="barProfilePic" />
                        <div>
                            <h5>{feed.userName}</h5>
                            {feed.content}
                        </div>
                        
                    </div>
                </div>
            </div>
        )
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
                        <a href="/profile"><img class="barProfilePic"
                            src="https://cdn.discordapp.com/attachments/829661320923447326/860355801931579422/unknown.png"
                        /></a>
                    <textarea rows="2" cols="100" placeholder="Post something!"></textarea>
                    <button class="btn btn_post_blog" >  POST  </button>
                </div>
                <div class="feed_top">
                    <SingleFeed feedList={feedList}/>
                </div>
                </div>
                
            </div>
            <div class="split right">
                <GetSchedule />
            </div>
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        </div>
    )

    

    
}

export default Feed
