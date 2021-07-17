import './VideoFeed.css'
import Video from './Video'
import axios from 'axios';
import { Component } from 'react'

class VideoFeed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            videos: [],
        }
    }

    componentDidMount(){
        axios.get()
        .then(res => {
            console.log(res.data)
            this.setState(res.data)
        })
    }

    render() {
        return(
            <Videos videos={this.state.videos}/>
        )
    }
}

const Videos = ({videos}) => {
    return (
        <div className="videoFeed">
            <h2>Videos</h2>
            <div className="videoFeedVideos">
                <Video 
                    title="Better Jungler Wins"
                    views="1.8M Views"
                    timestamp="25 Apr 2019"
                    channelImage="https://yt3.ggpht.com/ytc/AKedOLT4JR4XDBa2K6gSGUCo28kqWkTWMEchrcd1ypj7=s88-c-k-c0x00ffffff-no-rj"
                    channel="Shieda"
                    image="https://i.ytimg.com/vi/wXMD6wmcwvE/maxresdefault.jpg"
                />
                <Video 
                    title="Better Jungler Wins"
                    views="1.8M Views"
                    timestamp="25 Apr 2019"
                    channelImage="https://yt3.ggpht.com/ytc/AKedOLT4JR4XDBa2K6gSGUCo28kqWkTWMEchrcd1ypj7=s88-c-k-c0x00ffffff-no-rj"
                    channel="Shieda"
                    image="https://i.ytimg.com/vi/wXMD6wmcwvE/maxresdefault.jpg"
                />
                <Video 
                    title="Better Jungler Wins"
                    views="1.8M Views"
                    timestamp="25 Apr 2019"
                    channelImage="https://yt3.ggpht.com/ytc/AKedOLT4JR4XDBa2K6gSGUCo28kqWkTWMEchrcd1ypj7=s88-c-k-c0x00ffffff-no-rj"
                    channel="Shieda"
                    image="https://i.ytimg.com/vi/wXMD6wmcwvE/maxresdefault.jpg"
                />
                <Video 
                    title="Better Jungler Wins"
                    views="1.8M Views"
                    timestamp="25 Apr 2019"
                    channelImage="https://yt3.ggpht.com/ytc/AKedOLT4JR4XDBa2K6gSGUCo28kqWkTWMEchrcd1ypj7=s88-c-k-c0x00ffffff-no-rj"
                    channel="Shieda"
                    image="https://i.ytimg.com/vi/wXMD6wmcwvE/maxresdefault.jpg"
                />
                <Video 
                    title="Better Jungler Wins"
                    views="1.8M Views"
                    timestamp="25 Apr 2019"
                    channelImage="https://yt3.ggpht.com/ytc/AKedOLT4JR4XDBa2K6gSGUCo28kqWkTWMEchrcd1ypj7=s88-c-k-c0x00ffffff-no-rj"
                    channel="Shieda"
                    image="https://i.ytimg.com/vi/wXMD6wmcwvE/maxresdefault.jpg"
                />
                <Video 
                    title="Better Jungler Wins"
                    views="1.8M Views"
                    timestamp="25 Apr 2019"
                    channelImage="https://yt3.ggpht.com/ytc/AKedOLT4JR4XDBa2K6gSGUCo28kqWkTWMEchrcd1ypj7=s88-c-k-c0x00ffffff-no-rj"
                    channel="Shieda"
                    image="https://i.ytimg.com/vi/wXMD6wmcwvE/maxresdefault.jpg"
                />
                <Video 
                    title="Better Jungler Wins"
                    views="1.8M Views"
                    timestamp="25 Apr 2019"
                    channelImage="https://yt3.ggpht.com/ytc/AKedOLT4JR4XDBa2K6gSGUCo28kqWkTWMEchrcd1ypj7=s88-c-k-c0x00ffffff-no-rj"
                    channel="Shieda"
                    image="https://i.ytimg.com/vi/wXMD6wmcwvE/maxresdefault.jpg"
                />
                <Video 
                    title="Better Jungler Wins"
                    views="1.8M Views"
                    timestamp="25 Apr 2019"
                    channelImage="https://yt3.ggpht.com/ytc/AKedOLT4JR4XDBa2K6gSGUCo28kqWkTWMEchrcd1ypj7=s88-c-k-c0x00ffffff-no-rj"
                    channel="Shieda"
                    image="https://i.ytimg.com/vi/wXMD6wmcwvE/maxresdefault.jpg"
                />
                <Video 
                    title="Better Jungler Wins"
                    views="1.8M Views"
                    timestamp="25 Apr 2019"
                    channelImage="https://yt3.ggpht.com/ytc/AKedOLT4JR4XDBa2K6gSGUCo28kqWkTWMEchrcd1ypj7=s88-c-k-c0x00ffffff-no-rj"
                    channel="Shieda"
                    image="https://i.ytimg.com/vi/wXMD6wmcwvE/maxresdefault.jpg"
                />
                <Video 
                    title="Better Jungler Wins"
                    views="1.8M Views"
                    timestamp="25 Apr 2019"
                    channelImage="https://yt3.ggpht.com/ytc/AKedOLT4JR4XDBa2K6gSGUCo28kqWkTWMEchrcd1ypj7=s88-c-k-c0x00ffffff-no-rj"
                    channel="Shieda"
                    image="https://i.ytimg.com/vi/wXMD6wmcwvE/maxresdefault.jpg"
                />
                <Video 
                    title="Better Jungler Wins"
                    views="1.8M Views"
                    timestamp="25 Apr 2019"
                    channelImage="https://yt3.ggpht.com/ytc/AKedOLT4JR4XDBa2K6gSGUCo28kqWkTWMEchrcd1ypj7=s88-c-k-c0x00ffffff-no-rj"
                    channel="Shieda"
                    image="https://i.ytimg.com/vi/wXMD6wmcwvE/maxresdefault.jpg"
                />
                <Video 
                    title="Better Jungler Wins"
                    views="1.8M Views"
                    timestamp="25 Apr 2019"
                    channelImage="https://yt3.ggpht.com/ytc/AKedOLT4JR4XDBa2K6gSGUCo28kqWkTWMEchrcd1ypj7=s88-c-k-c0x00ffffff-no-rj"
                    channel="Shieda"
                    image="https://i.ytimg.com/vi/wXMD6wmcwvE/maxresdefault.jpg"
                />
                <Video 
                    title="Better Jungler Wins"
                    views="1.8M Views"
                    timestamp="25 Apr 2019"
                    channelImage="https://yt3.ggpht.com/ytc/AKedOLT4JR4XDBa2K6gSGUCo28kqWkTWMEchrcd1ypj7=s88-c-k-c0x00ffffff-no-rj"
                    channel="Shieda"
                    image="https://i.ytimg.com/vi/wXMD6wmcwvE/maxresdefault.jpg"
                />
                <Video 
                    title="Better Jungler Wins"
                    views="1.8M Views"
                    timestamp="25 Apr 2019"
                    channelImage="https://yt3.ggpht.com/ytc/AKedOLT4JR4XDBa2K6gSGUCo28kqWkTWMEchrcd1ypj7=s88-c-k-c0x00ffffff-no-rj"
                    channel="Shieda"
                    image="https://i.ytimg.com/vi/wXMD6wmcwvE/maxresdefault.jpg"
                />
                

            </div>
        </div>
    )
}

export default VideoFeed
