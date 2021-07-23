import Header from './Header'
import Sidebar from './Sidebar'
import './ELearning.css'
import YouTube from 'react-youtube'
import React from 'react'
import axios from 'axios'

class ELearning extends React.Component {

    state = {
        videos: [
            {
                title: "Loading Title...",
                link:"hFoqBbqfhXo",
                uploader:"Loading Uploader..."
            },
            {
                title: "Loading Title...",
                link:"hFoqBbqfhXo",
                uploader:"Loading Uploader..."
            },
            {
                title: "Loading Title...",
                link:"hFoqBbqfhXo",
                uploader:"Loading Uploader..."
            },
            {
                title: "Loading Title...",
                link:"hFoqBbqfhXo",
                uploader:"Loading Uploader..."
            },
            {
                title: "Loading Title...",
                link:"hFoqBbqfhXo",
                uploader:"Loading Uploader..."
            }
        ]
    }


    componentDidMount() {
        axios.get(`http://localhost:5000/api/videos/admin/getAllVideos`)
        .then(res => {
            
            // Cheryl's magic mushroom
            this.setState({videos:res.data});
            return res.data.map(item =>{ 
                let linkYT = ''
                let take = false
                for(let char of item.link){
                    if(char === '=') {
                        take = true
                    } else if (char === '&') {
                        break;
                    } else if (take) {
                        linkYT = linkYT + char
                    }
                }
                console.log(item.linkYT)
                return {
                    title: item.title,
                    link: linkYT,
                    uploader: item.uploader
                }
                
            })
        })
        .then(res => (
            this.setState({state: res})
        )).then(res => console.log(this.state))
        .catch(err => {
            console.log(err);
            this.setState([]);
        })
    }
    
    videoOnReady (event) {
        // pauses video on load
        event.target.pauseVideo()
        console.log(event.target)
    }

    render() {
        // video parameters
        const opts ={
            height: '600',
            width: '900',
            playerVars:{
                autoplay: 0,
            },
        };

    

        return (
            <div className="ElearningApp">
            <Header />
                <div className="ElearningAppPage">
                    <Sidebar />
                    <div>
                        {this.state.videos[4].title}
                        <script>
                            console.log("HELLO WORLD")
                        </script>
                        <YouTube 
                            videoId={this.state.videos[4].link}
                            opts={opts} 
                            onReady={this._onReady} 
                        />
                        <p> Lesson by: {this.state.videos[4].uploader}</p>
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