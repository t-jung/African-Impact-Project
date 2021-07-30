import './Nav.css';
import { Link }from 'react-router-dom'
import { Avatar } from '@material-ui/core';
import SearchBar from './SearchComponent/SearchBar';


let email = sessionStorage.getItem('email')

function Nav(props) {

  const navStyle={
    color:'black'
  }

  return (
    <nav>
        <ul className="nav-links">   
            <li>
              <div class="nav-topbar">
                <table>
                <tr>
                  <td width="500">
                    <SearchBar/>
                  </td>
                  <td>
                    <a href="/profile" onClick={() => {sessionStorage.setItem('loadUser', email); sessionStorage.setItem('loadType', sessionStorage.getItem('type')) }}>
                      <Avatar className={props.avatarClass}>
                        {typeof props.user.name !== 'undefined' ? props.user.name[0] : 'U'}
                      </Avatar>
                    </a>
                  </td>
                </tr>
              </table>
              </div>
            
            </li>

            <Link class="nav_padding" style={navStyle} to='/'>
            <li> Log out   </li>
            </Link>
            <Link class="nav_padding" style={navStyle} to='/AdminPage'>
            <li> Adminpage</li>
            </Link>
        </ul>
    </nav>
  );
}

export default Nav;
