import './Feed.css'
import JSONDATA from './MOCKDATA.json'
import { useState } from 'react'

function Feed() {

    const [searchTerm, setSearchTerm] = useState('')

    const GetFeed = () => {
        return (
            <div class="card">
                <div class="card-body">
                    <div class="d-flex">
                        <img src="https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-1100x628.jpg" className="profile_framing" />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                </div>
            </div>
        )
    }

    const NewsFeed = () => {
        return(
        <div>
            <GetFeed />
            <GetFeed/>
            <GetFeed/><GetFeed/><GetFeed/><GetFeed/><GetFeed/><GetFeed/><GetFeed/>
        </div>)
    }

    const GetSchedule = () => {
        return(
            <div class="schedule" >
                "filler schedule text"
            </div>
        )
    }
    return (
        
        <div class="conatiner_feed">
            <div class="split left">
            <table class="feed_top"><tr><td>
                <a href="/profile"><img src="https://i1.sndcdn.com/artworks-Z8AyljiXPrMSNaPb-ecOERw-t500x500.jpg" className="profile_framing" /></a></td><td width="9999">
                    <input type="text" placeholder="Search" 
                    onChange={event =>{
                        setSearchTerm(event.target.value)
                        }}
                    />
                    {JSONDATA.filter((val) => {
                        if (searchTerm == "") {
                            return val
                        } else if (val.first_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return val
                        } else if (val.last_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return val
                        }
                    }).map((val,key) => {
                        return (
                            <div class="user" key="key"> 
                            </div>
                        );
                    })}</td>
                </tr>
             </table>
             <div class="feed_top">
                <NewsFeed />
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
