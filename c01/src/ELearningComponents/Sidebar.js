import "./Sidebar.css"
import SidebarRow from './SidebarRow.js'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <SidebarRow title="Home" />
            <SidebarRow title="Reccomended" />

            <hr/>
            

            
        </div>
    )
}

export default Sidebar

/*
            <SidebarRow title="Followed Videos" />
<SidebarRow title="Watch Again" />
<SidebarRow title="Liked Videos" />
<SidebarRow title="Watch Later" />
<SidebarRow title="Your Playlist" />
<hr/>
*/