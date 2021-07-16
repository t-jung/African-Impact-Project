import Avatar from "@material-ui/core/Avatar"
import './Video.css'

const Video = ({ image, title, channel, views, timestamp, channelImage }) => { 
    return (
        <div className="videoVideo">
            <img className="videoThumbnail" src={ image } alt="" />
            <div className="videoInfo">
                <Avatar 
                    className="videoAvatar" 
                    alt={ channel } 
                    src={ channelImage } 
                />
                <div className="videoText">
                    <h4>{ title }</h4>
                    <p>{ channel }</p>
                    <p>
                        { views } - { timestamp }
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Video
