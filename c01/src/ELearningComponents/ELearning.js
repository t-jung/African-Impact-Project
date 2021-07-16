import Header from './Header'
import Sidebar from './Sidebar'
import VideoFeed from './VideoFeed'
import './ELearning.css'

const ELearning = () => {
    return (
        <div className="ElearningApp">
            <Header />
            <div className="ElearningAppPage">
                <Sidebar />
                <VideoFeed />
            </div>
        </div>
    )
}

export default ELearning
