import './VideoFeed.css'
import Video from './Video'
import axios from 'axios';
import { Component } from 'react'

class VideoFeed extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        videos: [
            {
                title: "Loading Title...",
                link:"hFoqBbqfhXo",
                uploader:"Loading Uploader...",
                likes:0,
                uploadDate:"Loading Upload date...",
                tags:"Loading tags...",
                imgsrc:"Loading thumbnails... ",
                _id:"_0"
            },
            {
                title: "Loading Title...",
                link:"hFoqBbqfhXo",
                uploader:"Loading Uploader...",
                likes:0,
                uploadDate:"Loading Upload date...",
                tags:"Loading tags...",
                imgsrc:"Loading thumbnails... ",
                _id:"_0"
            },
            {
                title: "Loading Title...",
                link:"hFoqBbqfhXo",
                uploader:"Loading Uploader...",
                likes:0,
                uploadDate:"Loading Upload date...",
                tags:"Loading tags...",
                imgsrc:"Loading thumbnails... ",
                _id:"_0"
            },
            {
                title: "Loading Title...",
                link:"hFoqBbqfhXo",
                uploader:"Loading Uploader...",
                likes:0,
                uploadDate:"Loading Upload date...",
                tags:"Loading tags...",
                imgsrc:"Loading thumbnails... ",
                _id:"_0"
            },
            {
                title: "Loading Title...",
                link:"hFoqBbqfhXo",
                uploader:"Loading Uploader...",
                likes:0,
                uploadDate:"Loading Upload date...",
                tags:"Loading tags...",
                imgsrc:"Loading thumbnails... ",
                _id:"_0"
            },
            {
                title: "Loading Title...",
                link:"hFoqBbqfhXo",
                uploader:"Loading Uploader...",
                likes:0,
                uploadDate:"Loading Upload date...",
                tags:"Loading tags...",
                imgsrc:"Loading thumbnails... ",
                _id:"_0"
            },
            {
                title: "Loading Title...",
                link:"hFoqBbqfhXo",
                uploader:"Loading Uploader...",
                likes:0,
                uploadDate:"Loading Upload date...",
                tags:"Loading tags...",
                imgsrc:"Loading thumbnails... ",
                _id:"_0"
            },
            {
                title: "Loading Title...",
                link:"hFoqBbqfhXo",
                uploader:"Loading Uploader...",
                likes:0,
                uploadDate:"Loading Upload date...",
                tags:"Loading tags...",
                imgsrc:"Loading thumbnails... ",
                _id:"_0"
            },
            {
                title: "Loading Title...",
                link:"hFoqBbqfhXo",
                uploader:"Loading Uploader...",
                likes:0,
                uploadDate:"Loading Upload date...",
                tags:"Loading tags...",
                imgsrc:"Loading thumbnails... ",
                _id:"_0"
            },
            {
                title: "Loading Title...",
                link:"hFoqBbqfhXo",
                uploader:"Loading Uploader...",
                likes:0,
                uploadDate:"Loading Upload date...",
                tags:"Loading tags...",
                imgsrc:"Loading thumbnails... ",
                _id:"_0"
            },
            {
                title: "Loading Title...",
                link:"hFoqBbqfhXo",
                uploader:"Loading Uploader...",
                likes:0,
                uploadDate:"Loading Upload date...",
                tags:"Loading tags...",
                imgsrc:"Loading thumbnails... ",
                _id:"_0"
            },
            {
                title: "Loading Title...",
                link:"hFoqBbqfhXo",
                uploader:"Loading Uploader...",
                likes:0,
                uploadDate:"Loading Upload date...",
                tags:"Loading tags...",
                imgsrc:"Loading thumbnails... ",
                _id:"_0"
            },
            {
                title: "Loading Title...",
                link:"hFoqBbqfhXo",
                uploader:"Loading Uploader...",
                likes:0,
                uploadDate:"Loading Upload date...",
                tags:"Loading tags...",
                imgsrc:"Loading thumbnails... ",
                _id:"_0"
            },
            {
                title: "Loading Title...",
                link:"hFoqBbqfhXo",
                uploader:"Loading Uploader...",
                likes:0,
                uploadDate:"Loading Upload date...",
                tags:"Loading tags...",
                imgsrc:"Loading thumbnails... ",
                _id:"_0"
            },
            {
                title: "Loading Title...",
                link:"hFoqBbqfhXo",
                uploader:"Loading Uploader...",
                likes:0,
                uploadDate:"Loading Upload date...",
                tags:"Loading tags...",
                imgsrc:"Loading thumbnails... ",
                _id:"_0"
            },
            {
                title: "Loading Title...",
                link:"hFoqBbqfhXo",
                uploader:"Loading Uploader...",
                likes:0,
                uploadDate:"Loading Upload date...",
                tags:"Loading tags...",
                imgsrc:"Loading thumbnails... ",
                _id:"_0"
            },
            {
                title: "Loading Title...",
                link:"hFoqBbqfhXo",
                uploader:"Loading Uploader...",
                likes:0,
                uploadDate:"Loading Upload date...",
                tags:"Loading tags...",
                imgsrc:"Loading thumbnails... ",
                _id:"_0"
            },
            {
                title: "Loading Title...",
                link:"hFoqBbqfhXo",
                uploader:"Loading Uploader...",
                likes:0,
                uploadDate:"Loading Upload date...",
                tags:"Loading tags...",
                imgsrc:"Loading thumbnails... ",
                _id:"_0"
            },
            {
                title: "Loading Title...",
                link:"hFoqBbqfhXo",
                uploader:"Loading Uploader...",
                likes:0,
                uploadDate:"Loading Upload date...",
                tags:"Loading tags...",
                imgsrc:"Loading thumbnails... ",
                _id:"_0"
            },
            {
                title: "Loading Title...",
                link:"hFoqBbqfhXo",
                uploader:"Loading Uploader...",
                likes:0,
                uploadDate:"Loading Upload date...",
                tags:"Loading tags...",
                imgsrc:"Loading thumbnails... ",
                _id:"_0"
            },
            {
                title: "Loading Title...",
                link:"hFoqBbqfhXo",
                uploader:"Loading Uploader...",
                likes:0,
                uploadDate:"Loading Upload date...",
                tags:"Loading tags...",
                imgsrc:"Loading thumbnails... ",
                _id:"_0"
            }
           
        ]
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/api/videos/admin/getAllVideos`)
        .then(res => {
            this.setState({videos:res.data});
            return res.data.map(item =>{ 
                return {
                    title: item.title,
                    link: item.link,
                    uploader: item.uploader,
                    likes: item.likes,
                    uploadDate: item.uploadDate,
                    tags: item.tags,
                    _id: item._id

                }    
   
            })
        })
        .then(res => (
            this.setState({state: res})
        ))
        .catch(err => {
            console.log(err);
            this.setState([]);
        })

    }
    videoOnReady (event) {
        event.target.pauseVideo()
    }

    

    render() {
        const opts ={
            height: '600',
            width: '900',
            playerVars:{
                autoplay: 0,
            },
        };

        if (this.state.videos[0].title === "Loading Title...") {
            console.log("WAITING")
            return null
          }
        return(
            <div className="videoFeed">
            <h2>Videos</h2>
        
            <div className="videoFeedVideos">
            
            <Video 
                title={this.state.videos[0].title}
                likes={this.state.videos[0].likes}
                uploadDate={this.state.videos[0].uploadDate}
                uploader={this.state.videos[0].uploader}
                link={this.state.videos[0].link}
                imgsrc={this.state.videos[0].link}
                tags={this.state.videos[0].tags}
                id={this.state.videos[0]._id}
            />
                        <Video 
                title={this.state.videos[1].title}
                likes={this.state.videos[1].likes}
                uploadDate={this.state.videos[1].uploadDate}
                uploader={this.state.videos[1].uploader}
                link={this.state.videos[1].link}
                tags={this.state.videos[1].tags}
                id={this.state.videos[1]._id}
            />
                        <Video 
                title={this.state.videos[2].title}
                likes={this.state.videos[2].likes}
                uploadDate={this.state.videos[2].uploadDate}
                uploader={this.state.videos[2].uploader}
                link={this.state.videos[2].link}
                tags={this.state.videos[2].tags}
                id={this.state.videos[2]._id}
            />
                        <Video 
                title={this.state.videos[3].title}
                likes={this.state.videos[3].likes}
                uploadDate={this.state.videos[3].uploadDate}
                uploader={this.state.videos[3].uploader}
                link={this.state.videos[3].link}
                tags={this.state.videos[3].tags}
                id={this.state.videos[3]._id}

            />
                        <Video 
                title={this.state.videos[4].title}
                likes={this.state.videos[4].likes}
                uploadDate={this.state.videos[4].uploadDate}
                uploader={this.state.videos[4].uploader}
                link={this.state.videos[4].link}
                tags={this.state.videos[4].tags}
                id={this.state.videos[4]._id}
            />
                        <Video 
                title={this.state.videos[5].title}
                likes={this.state.videos[5].likes}
                uploadDate={this.state.videos[5].uploadDate}
                uploader={this.state.videos[5].uploader}
                link={this.state.videos[5].link}
                tags={this.state.videos[5].tags}
                id={this.state.videos[5]._id}
            />
                        <Video 
                title={this.state.videos[6].title}
                likes={this.state.videos[6].likes}
                uploadDate={this.state.videos[6].uploadDate}
                uploader={this.state.videos[6].uploader}
                link={this.state.videos[6].link}
                tags={this.state.videos[6].tags}
                id={this.state.videos[6]._id}
            />
                        <Video 
                title={this.state.videos[7].title}
                likes={this.state.videos[7].likes}
                uploadDate={this.state.videos[7].uploadDate}
                uploader={this.state.videos[7].uploader}
                link={this.state.videos[7].link}
                tags={this.state.videos[7].tags}
                id={this.state.videos[7]._id}
            />
                        <Video 
                title={this.state.videos[8].title}
                likes={this.state.videos[8].likes}
                uploadDate={this.state.videos[8].uploadDate}
                uploader={this.state.videos[8].uploader}
                link={this.state.videos[8].link}
                tags={this.state.videos[8].tags}
                id={this.state.videos[8]._id}
            />
                        <Video 
                title={this.state.videos[9].title}
                likes={this.state.videos[9].likes}
                uploadDate={this.state.videos[9].uploadDate}
                uploader={this.state.videos[9].uploader}
                link={this.state.videos[9].link}
                tags={this.state.videos[9].tags}
                id={this.state.videos[9]._id}
            />
                                    <Video 
                title={this.state.videos[10].title}
                likes={this.state.videos[10].likes}
                uploadDate={this.state.videos[10].uploadDate}
                uploader={this.state.videos[10].uploader}
                link={this.state.videos[10].link}
                tags={this.state.videos[10].tags}
                id={this.state.videos[10]._id}
            />
            </div>



            </div>
        )
    }
}

export default VideoFeed

/*
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

*/
