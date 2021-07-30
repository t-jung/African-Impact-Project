import Avatar from "@material-ui/core/Avatar"
import './Video.css'
import Elearning from './ELearning'
import { render } from "@testing-library/react"

const Video = ({ title, uploader, likes, uploadDate, id, tags, link, imgsrc}) => { 

    var concatLink = "http://img.youtube.com/vi/"+link+"/hqdefault.jpg"

    var concatHref = "/elearning?id="+id+""
    console.log(concatHref)
    return (
        
        <div className="videoVideo">
            <a href={concatHref}>
                <img className="videoThumbnail" src={ concatLink } alt="" />
            </a>
            <div className="videoInfo">
                <Avatar 
                    className="videoAvatar" 
                    alt={ uploader } 
                />
                <div className="videoText">
                    <h4>{ title }</h4>
                    <p>{ uploader }</p>
                    <p>
                        Likes: { likes } <br/> Upload Date: { uploadDate } <br/> Tags: { tags } <br/>
                    </p>
                </div>
            </div>
        </div>
        
    )
}

export default Video
