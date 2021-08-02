import Header from './Header'
import Sidebar from './Sidebar'
import './ELearning.css'
import YouTube from 'react-youtube'
import React from 'react'
import axios from 'axios'

import SingleFeed from '../FeedComponents/SingleFeed'

let email = sessionStorage.getItem('email')

const currentUrl = window.location.href
const currentID = getID(currentUrl)


console.log(currentID)


class ELearning extends React.Component{

    state = {
        videos: [
            {
                title: "Loading Title...",
                link:"hFoqBbqfhXo",
                uploader:"Loading Uploader..."
            }
        ],
        feedFormatted: [],
    }

    

    componentDidMount() {
        axios.get(`http://localhost:5000/api/videos/getVideoById/`+currentID)
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

        axios.get('http://localhost:5000/api/videos/getAllComments/'+currentID)
        .then(res => {
            console.log(res.data)
            let postInfo = []
            for(const post of res.data) {
                axios.get('http://localhost:5000/api/users/getUserByEmail/' + post.commenter)
                .then( resource => {
                    console.log(resource)
                    postInfo.push(
                        {
                            userName: resource.data.firstName + ' ' + resource.data.lastName,
                            img: resource.data.profilePic,
                            content: post.text,
                            likes: [],
                            comments: [],
                            poster: post.commenter,
                            postId: post._id
                        })
                    }
                )
                .then(() => this.setState({feedFormatted: postInfo}))
            }
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
                        {this.state.videos.title}
                        <YouTube 
                            videoId={this.state.videos.link}
                            opts={opts} 
                            onReady={this._onReady} 
                        />
                        <p> Lesson by: {this.state.videos.uploader}</p>
                        <hr/>
                    </div>
                </div>
                {this.state.videos.isAssignment === true ? 
                    <Upload video={this.state.videos._id} uploader={this.state.videos.uploader}/>
                    : null
                }
                <div class="elearning-upload-container">
                    <div>
                        <PostBox/>
                        <div>
                            <SingleFeed feedList={this.state.feedFormatted}/>
                        </div>
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

function getID(str) {
    return str.split('?id=')[1];
}

function getVideoObect(str) {
    //TODO: use id to get title
}

const PostBox = (props) => {
    const [postItem, setPostItem] = React.useState('')

    const submitPost = (e) => {
        e.preventDefault()
        console.log(email)
        if(postItem.length != 0) {
            console.log(postItem)

            let data = {
                commenter: email,
                text: postItem
            }

            axios.post('http://localhost:5000/api/videos/createComment/' + currentID, data)
                .then(() => {
                    setPostItem('')
                    alert("Posted!")
                })
                .catch(err => console.log(err));
        } else {
            alert("Cannot post empty blog!");
        }
        
    }

    return (
        <div class="postBox">
           <textarea id="userPOst" class="postBoxStyling" rows="2" cols="150" placeholder="Post something!" onChange={e => setPostItem(e.target.value)}></textarea>
            <button class="btn btn_post_blog" onClick={submitPost}>  POST  </button> 
        </div>
    )
}

const Upload = (props) => {

    const[file, setFile] = React.useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('file', file)
        data.append('video', props.video);
        data.append('uploader', email);

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
                    class="elearning-button"
                    type="file"
                    onChange={selectFile}
                /> 
                <input
                    type='submit'
                    class="elearning-button"
                />
                
            </form>
            
        </div>
    )
}