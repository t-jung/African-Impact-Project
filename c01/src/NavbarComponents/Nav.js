import './Nav.css';
import { Link }from 'react-router-dom'

function Nav() {

    const navStyle={
        color:'white'
    }

  return (
    <nav>
        <Link style={navStyle} to= "/feed">
        <h3>Home</h3>
        </Link>

        <ul className="nav-links">         
            <Link style={navStyle} to='/'>
            <li>Log out</li>
            </Link>
            <Link style={navStyle} to='/partner_register'>
            <li>Register as a Partner</li>
            </Link>
            <Link style={navStyle} to='/AdminPage'>
            <li>Adminpage</li>
            </Link>
        </ul>
    </nav>
  );
}

export default Nav;
