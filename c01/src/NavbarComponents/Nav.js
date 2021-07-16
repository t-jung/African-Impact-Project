import './Nav.css';
import { Link }from 'react-router-dom'
import JSONDATA from './MOCKDATA.json'
import { useState } from 'react'
import { Avatar } from '@material-ui/core';


let email = sessionStorage.getItem('email')

function Nav(props) {

  const [searchTerm, setSearchTerm] = useState('')

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
                    <input type="text" placeholder="  Search" 
                      onChange={event =>{
                        setSearchTerm(event.target.value)
                      }}
                    />
                    {JSONDATA.filter((val) => {
                      if (searchTerm == "") {
                        return val
                          } else if (val.first_name.toLowerCase().includes(searchTerm.toLowerCase())
                                      || val.last_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return val
                          } 
                    }).map((val,key) => {
                      return (
                        <div class="user" key="key"></div>
                      );
                    })}
                  </td>
                  <td>
                    <a href="/profile">
                      <Avatar>
                        {typeof props.user.firstName !== 'undefined' ? props.user.firstName[0] : 'U'}
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
