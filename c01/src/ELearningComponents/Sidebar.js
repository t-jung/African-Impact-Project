import "./Sidebar.css"
import SidebarRow from './SidebarRow.js'



const Sidebar = () => {
    return (
        <div className="sidebar">
            <a href="/feed" class="nav-link">
                <SidebarRow title="Home" />
            </a>
            <a href="/profile" class="nav-link">
                <SidebarRow title="Profile" />
            </a>

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