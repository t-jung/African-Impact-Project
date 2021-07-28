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
            this.setState({videos:res.data});
            return res.data.map(item =>{ 
                return {
                    title: item.title,
                    link: item.link,
                    uploader: item.uploader
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
        return (
            <div className="ElearningApp">
            <Header />
                <div className="ElearningAppPage">
                    <Sidebar />
                    <div>
                        {this.state.videos[4].title}
                        <YouTube 
                            videoId={this.state.videos[4].link}
                            opts={opts} 
                            onReady={this._onReady} 
                        />
                        <p> Lesson by: {this.state.videos[4].uploader}</p>
                        <hr/>
                    </div>
                </div>
                <Upload video={this.state.videos[4]._id} uplaoder={this.state.videos[4].uploader}/>
            </div>
            
        )
    }
    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }
}
export default ELearning

const Upload = (props) => {

    const[file, setFile] = React.useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('file', file)
        data.append('video', props.video)
        data.append('uploader', props.upload)

        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        axios.post('http://localhost:5000/api/videos/uploadDeliverable', data, config)
            .then(() => alert("Uploaded!"))
            .catch(err => alert(err.response.data))
        

    }

    const selectFile = (e) => {
        setFile(e.target.files[0])
    }

    return(
        <div class="elearning-upload-container">
            <form onSubmit={onSubmit}>
                <input
                    id="upload-btn"
                    type="file"
                    onChange={selectFile}
                />
                <input
                    type='submit'
                />
            </form>
            
        </div>
    )
}