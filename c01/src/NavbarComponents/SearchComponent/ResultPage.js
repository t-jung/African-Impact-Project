import React from 'react';
import './SearchBar.css'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import Avatar from '@material-ui/core/Avatar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import styles from '../../styles'

import Nav from '../../NavbarComponents/Nav.js'
import './ResultPage.css'
import SearchBar from './SearchBar';
import { IconButton } from '@material-ui/core';

let email = sessionStorage.getItem('email')

const useStyles = makeStyles((theme) => ({
    root: {
      width: '15vw',
      height: '20vw',
      margin: '1vw',
    },
    large: {
        width: '9vw',
        height: '9vw',
      }
  }));

const ProfileCard = (props) => {
    let user = props.user
    const classes = useStyles();
    return(
        <Card className={classes.root}>
            <CardContent>
                <div class="result-header">
                    <a
                        href='/profile'
                        onClick={ sessionStorage.setItem('loadUser', user.email)} >
                        <Avatar className={classes.large}>
                            {user.profile_type === 'user' ? user.firstName[0]
                                : user.name[0]}
                        </Avatar>
                    </a>
                    <Typography>
                        {user.profile_type === 'user' ? user.firstName + ' ' + user.lastName: user.name}  
                    </Typography>
                </div>
                <Typography variant="body2"component="p">
                    { typeof user.description !== 'undefined' ? user.description : "" }
                </Typography>
            </CardContent>
        </Card>
    )
}

class ResultPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = [
            {
                firstName: " ",
                name: " ",
                profile_type: "user",
            }
        ]
    }

    componentDidMount(){
        axios.get('http://localhost:5000/api/search/' + sessionStorage.getItem('searchTerm'))
            .then(res => {
                this.setState(res.data)
                console.log(res.data)
            })
    }
//{(this.state).map(item => <ProfileCard user={item}/>)}
    render() {
        console.log(this.state)
        console.log(typeof this.state)

        return(
            <div>
                <NavBar/>
               <div class="result-cards">
                    {Object.entries(this.state).map(item => <ProfileCard user={item[1]}/> )}
                </div> 
            </div>
            
        )
    }

}

const NavBar = () => {
    return(
        <nav>
            <div class="results-nav">
                <div class="results-nav-left">
                    <a href="/feed">
                        <IconButton>
                        <ArrowBackIcon/>
                        </IconButton>
                    </a>
                    <Typography
                        style={{
                            color: styles.palette.primary.main,
                            fontWeight: 900,
                            fontSize: 25,
                            verticalAlign: true,
                        }}>
                        Results 
                    </Typography>  
                </div>
                
                  <SearchBar/>
            </div>
    </nav>
    )
}

export default ResultPage