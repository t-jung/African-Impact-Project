import Avatar from "@material-ui/core/Avatar"
import './Video.css'

const Video = ({ title, uploader, likes, uploadDate, id, tags, link, imgsrc}) => { 

    var concatLink = "http://img.youtube.com/vi/"+link+"/hqdefault.jpg"

    console.log(link)
    console.log(concatLink)
    return (

        
        <div className="videoVideo">
            <a href="/elearning">
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
