import React from 'react';
import './SearchBar.css'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import Avatar from '@material-ui/core/Avatar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import styles from '../../styles'
import Chip from '@material-ui/core/Chip';

import Nav from '../../NavbarComponents/Nav.js'
import './ResultPage.css'
import SearchBar from './SearchBar';
import { IconButton } from '@material-ui/core';

let email = sessionStorage.getItem('email')
let searchTerm = sessionStorage.getItem('searchTerm')
let found = true

let classNameHolder = ['greenAvatar', 'yellowAvatar', 'pinkAvatar', 'blueAvatar']

const useStyles = makeStyles((theme) => ({
    root: {
      color: 'white',
      margin: '1vw',
    },
    large: {
        width: '5vw',
        height: '5vw',
      },
    cardSize: {
        width: '15vw',
        height: '17vw',
        padding: '5vh',
        background: styles.palette.primary.main,
        borderRadius: 10,
        borderWidth: 2,
    },
    avatarStyle:{
        fontSize: 25,
        color: styles.palette.primary.main,
        fontWeight: 700,
        border: '7px solid orange'
    },
    greenAvatar:{
        backgroundColor: styles.palette.green.main,
    },
    yellowAvatar:{
        backgroundColor: styles.palette.yellowLemon.main,
    },
    pinkAvatar:{
        backgroundColor: styles.palette.pink.main,
    },
    blueAvatar:{
        backgroundColor: styles.palette.blue.main,
    },
  }));

const UserCard = (props) => {
    let name = ''
    const [hover, setHover] = React.useState(false)
    if(props.type === 'user') {
        name = props.info.firstName + ' ' + props.info.lastName
    } else {
        name = props.info.name
    }
    const classes = useStyles()
    console.log(props.info.email)
    return(
        <a href="/profile">
            <div onClick={() => {sessionStorage.setItem('loadUser', props.info.email); sessionStorage.setItem('loadType', props.info.profile_type)}}  class="result-card">
            <Card className={classes.root}>
                    <CardContent className={classes.cardSize}>
                        <div class="result-header">
                            <Avatar className={[classes.avatarStyle, classes.large, classes[classNameHolder[Math.floor(Math.random() * classNameHolder.length)]]]}>{name[0]}</Avatar>    
                            <Typography
                                noWrap={true}
                                style={{
                                    color: 'white',
                                    fontWeight: 300,
                                    fontSize: 20,
                                    verticalAlign: true,
                                    marginTop: 15,
                                    width: '13vw',
                                    textAlign: 'center',
                                }}>
                                {name}
                            </Typography>

                            <Typography
                                noWrap={true}
                                paragraph={true}
                                style={{
                                    color: 'white',
                                    fontWeight: 100,
                                    fontSize: 16,
                                    verticalAlign: true,
                                    marginTop: 15,
                                    width: '13vw',
                                    height: 20,
                                    textAlign: 'center',
                                }}>
                                {props.info.description}
                            </Typography>
                            
                            {props.type === 'user' ? 
                                <div class="results-nav">
                                <Typography
                                    style={{
                                        color: 'white',
                                        fontWeight: 100,
                                        fontSize: 12,
                                        verticalAlign: true,
                                        textAlign: 'center',
                                    }}>
                                    following: {props.info.following.length} 
                                </Typography>
                                <Typography
                                    style={{
                                        color: 'white',
                                        fontWeight: 100,
                                        fontSize: 12,
                                        verticalAlign: true,
                                        textAlign: 'center',
                                    }}>
                                    followers: {props.info.follower.length}
                                </Typography>
                                </div>
                                
                            : null}
                        </div>
                    </CardContent>
                </Card> 
            </div>
        </a>
        
        
    )
}

class ResultPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            found: true,
            status: "404",
            company: [],
            partner: [],
            user: [],
        }
    }

    componentDidMount(){
        if(searchTerm.length === 0) {
            axios.get('http://localhost:5000/api/all_result')
                .then(res => {
                    this.setState(res.data)
                    console.log(res.data)
                })
        } else {
            axios.get('http://localhost:5000/api/search/' + searchTerm)
                .then(res => {
                    this.setState(res.data)
                    if(res.data.status === "404") {
                        this.setState({found: false})
                    }
                    console.log(res.data)
                })
                .catch(err => console.log(err))
        }
        
    }
//{(this.state).map(item => <ProfileCard user={item}/>)}
    render() {
        console.log(this.state)
        console.log(typeof this.state)
        
        return(
            <div>
                <NavBar found={this.state.found}/>
                {this.state.user.length !== 0 ? 
                    <Typography
                        style={{
                            color: styles.palette.primary.main,
                            fontWeight: 900,
                            fontSize: 18,
                            verticalAlign: true,
                            margin: '1vw',
                        }}>
                        User
                    </Typography>
                    : null }
                <Grid container>
                    <Grid item container direction="row" justify="flex-start" alignItems="center">
                        {this.state.user.map(item => (
                                <UserCard type='user' info={item} />
                            
                        ))}
                        
                    </Grid>
                </Grid>

                {this.state.company.length !== 0 ? 
                    <Typography
                        style={{
                            color: styles.palette.primary.main,
                            fontWeight: 900,
                            fontSize: 18,
                            verticalAlign: true,
                            margin: '1vw',
                        }}>
                        Company
                    </Typography>
                    : null }
                    <Grid container>
                    <Grid item container direction="row" justify="flex-start" alignItems="center">
                        {this.state.company.map(item => (
                            <UserCard type='company' info={item} />
                        ))}
                        
                    </Grid>
                </Grid>

                {this.state.partner.length !== 0 ? 
                    <Typography
                        style={{
                            color: styles.palette.primary.main,
                            fontWeight: 900,
                            fontSize: 18,
                            verticalAlign: true,
                            margin: '1vw',
                        }}>
                        Partner
                    </Typography>
                    : null }
                <Grid container>
                    <Grid item container direction="row" justify="flex-start" alignItems="center">
                        {this.state.partner.map(item => (
                            <UserCard type='partner' info={item} />
                        ))}
                        
                    </Grid>
                </Grid>
                
            </div>   
        )
    }

}

const NavBar = (props) => {
    const headerDisplay = (props.found === true ? ("Results for: " + searchTerm) : "No results found, check these usesr: ")
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
                            {headerDisplay}  
                    </Typography>  
                </div>
                
                  <SearchBar/>
            </div>
    </nav>
    )
}

export default ResultPage