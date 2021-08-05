import './Nav.css';
import { Link }from 'react-router-dom'
import { Avatar, Button, Tooltip } from '@material-ui/core';
import { ThemeProvider, withStyles, makeStyles } from '@material-ui/styles';
import SearchBar from './SearchComponent/SearchBar';

import theme from '../styles.js'

import PolicyIcon from '@material-ui/icons/Policy';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ForumIcon from '@material-ui/icons/Forum';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

let email = sessionStorage.getItem('email')

const useStyles = makeStyles(() => ({
  root: {
    fill: theme.palette.primary.main,
    fontSize: 35,
    marginRight: 10,
    marginLeft: 10,
  },
  elearningIcon: {
    marginBottom: 5,
  }
}));

function Nav(props) {

  const navStyle={
    color:'black'
  }

  const classes = useStyles()

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
                  <td>
                    <div class='nav-icon-container'>
                        <a href='/AdminPage'>
                          <Tooltip title="Admin page">
                            <PolicyIcon className={classes.root}/>
                          </Tooltip>
                        </a>
                        <a href='/Landing'>
                          <Tooltip title="Elearning">
                            <MenuBookIcon className={[classes.root, classes.elearningIcon]}/>
                          </Tooltip>
                        </a>
                        <a href='/Chatroom'>
                          <Tooltip title="Chatroom">
                            <ForumIcon className={classes.root}/>
                          </Tooltip>
                        </a>
                        <a href='/'>
                          <Tooltip title="Log out">
                            <ExitToAppIcon className={classes.root}/>
                          </Tooltip>
                        </a>
                      </div>
                  </td>
                </tr>
              </table>
              </div>
            
            </li>
            
            
        </ul>
    </nav>
  );
}

export default Nav;
