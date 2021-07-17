import './Feed.css';
import UserPost from './UserPostComponents/UserPost.js'

export default function SingleFeed (props) {
    let feedList = props.feedList
    console.log("hiiii")
    return(
        <div>
            {feedList.map(item => (
                <UserPost feed={item}/>
            ))}
        </div>
    );
}