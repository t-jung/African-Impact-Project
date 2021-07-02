import './Feed.css';

export default function SingleFeed (props) {
    let feedList = props.feedList

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

    return(
        <div>
            {feedList.map(item => (
                <GetFeed feed={item}/>
            ))}
        </div>
    );
}