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
              <div class="fkreact">oi</div>
            <table>
              <tr>
                <td>
                  <a href="/profile"><img src="https://i1.sndcdn.com/artworks-Z8AyljiXPrMSNaPb-ecOERw-t500x500.jpg" className="profile_framing" /></a>
                </td>
                <td width="500">
                  <input type="text" placeholder="I hope you're fucking happy Cheryl" 
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
              </tr>
             </table>
            </li>
            <Link style={navStyle} to='/'>
            <li> &emsp;&emsp;Log out  &emsp; </li>
            </Link>
            <Link style={navStyle} to='/partner_register'>
            <li> Register as a Partner &emsp; </li>
            </Link>
            <Link style={navStyle} to='/AdminPage'>
            <li> Adminpage &emsp;</li>
            </Link>
        </ul>
    </nav>
  );
}

export default Nav;
