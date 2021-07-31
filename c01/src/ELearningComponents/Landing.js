import Header from './Header'
import Sidebar from './Sidebar'
import VideoFeed from './VideoFeed'

import './Landing.css'

const Landing = () => {


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

const begin = (props)=> {
    console.log(props.subject)
 }
 
 const mapStateToProps=()=>{};

export default Landing;