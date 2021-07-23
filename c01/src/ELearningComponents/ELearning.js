import Header from './Header'
import Sidebar from './Sidebar'
import './ELearning.css'
import YouTube from 'react-youtube'
import React from 'react'
import axios from 'axios'

class ELearning extends React.Component {

    state = {
        videos: []
    }
    /*
    componentDidMount() {
        axios.get(`http://localhost:5000/api/videos/admin/getAllVideos`)
        .then(res => {
            this.setState({videos:res.data});
        })
    }
        {this.state.videos.map(video => {video.id})}
        {this.state.videos.map(video => {video.title})}
        {this.state.videos.map(video => {video.uploader})}
    */


    dummyVideo = {
        title: "How To Setup a Business Legally",
        id: "hPTqHt3IV08",
        uploader: "Hawthorn Law"
    };


    videoOnReady (event) {
        event.target.pauseVideo()
        console.log(event.target)
    }

    render() {

        const { title, id, uploader } = this.dummyVideo;
        console.log(this.dummyVideo)

        const opts ={
            height: '600',
            width: '900',
            playerVars:{
                autoplay: 1,
            },
        };
        const {videoID} = this.props
        return (
            <div className="ElearningApp">
            <Header />
                <div className="ElearningAppPage">
                    <Sidebar />
                    <div>
                        {this.dummyVideo.title}
                        <YouTube 
                            videoId={this.dummyVideo.id} 
                            opts={opts} 
                            onReady={this._onReady} 
                        />
                        <p> Lesson by: {this.dummyVideo.uploader}</p>
                        <hr/>
                    </div>
                </div>
            </div>
        )
    }

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }

}
export default ELearning

/*
class ELearning extends Component {
    constructor(props){
        super(props)

        this.state={
            resultYT: []
        }
        this.clicked = this.clicked.bind(this);
    }

    clicked(){
        fetch(finalURL)
            .then((response) => response.json()) // promise handling
            .then((responseJson) => {
                //console.log(responseJson)
                const resultYT = responseJson.items.map(obj => "https://www.youtube.com/embed/"+obj.id.videoId)
                this.setState({resultYT})
                //console.log(this.state.resultYT)
            })
            .catch((error) => {
                console.error(error)
            })
    }


    render() {
        //console.log(this.state.resultYT)
        return (
            <div className="ElearningApp">
                <Header />
               
                <div className="ElearningAppPage">
                    <Sidebar />
                    <VideoFeed />
                    <div className = "feedVideos">
                    {
                        this.state.resultYT.map((link, i) => {
                            var frame = 
                            <div><iframe 
                                key={ i }
                                width="560" 
                                height="315" 
                                src={ link } 
                                title="YouTube video player" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen>
                            </iframe></div>
                            return frame
                        })
                    }
                    </div>
                    {this.frame}
                    
                    
                </div>
                <button onClick={this.clicked}> Load more Videos </button>
            </div>
        )
    }
}
export default ELearning
*/