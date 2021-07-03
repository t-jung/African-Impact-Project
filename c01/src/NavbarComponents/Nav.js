import './Nav.css';
import { Link }from 'react-router-dom'
import JSONDATA from './MOCKDATA.json'
import { useState } from 'react'

function Nav() {

  const [searchTerm, setSearchTerm] = useState('')

  const navStyle={
    color:'white'
  }

  return (
    <nav>
        <Link style={navStyle} to= "/feed">
        <h3>Home</h3>
        </Link>

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
                          } else if (val.first_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return val
                          } else if (val.last_name.toLowerCase().includes(searchTerm.toLowerCase())) {
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
                      <img src="https://cdn.discordapp.com/attachments/829661320923447326/860355801931579422/unknown.png" class="profilePic" />
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
