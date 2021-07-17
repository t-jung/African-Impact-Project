import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

import axios from 'axios';

let token = sessionStorage.getItem('token')
let email = sessionStorage.getItem('email')

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    minWidth: '100%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const CommentList = (props) => {
    console.log(props.comment);
    let comments = props.comment;
    return(
          (comments.map(item => 
            <SingleComment comment={item}/>
          ))
    )
}



const SingleComment = (props) => {
    const [commentedUser, setCommenter] = React.useState(null);
    const classes = useStyles();

    React.useEffect(() => {
      axios.get('http://localhost:5000/api/users/getUserByEmail/' + props.comment.commenter)
      .then(res => {
        setCommenter(res.data)
      })
      .catch(err => console.log(err))
    }, [props])

    if(!commentedUser) {
      console.log("Didn't get user")
      return(
        <h5>No comments</h5>
      )
    } else {
          return(
              <Card className={classes.root}>
                  <CardHeader
                      avatar={
                        <a href='/profile' onClick={ sessionStorage.setItem('loadUser', commentedUser.email)} >
                          <Avatar className={classes.avatar}>
                              {commentedUser.firstName[0]}
                          </Avatar>
                        </a>

                      }
                      action={
                          <IconButton aria-label="report">
                            <MoreVertIcon />
                          </IconButton>
                      }
                      title={commentedUser.firstName + ' ' + commentedUser.lastName}
                  />
                  <CardContent>
                      <Typography variant="body2"component="p">
                          {props.comment.text}
                      </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                      <IconButton aria-label="like">
                      <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                      <ShareIcon />
                      </IconButton>
                  </CardActions>
              </Card>
          );
    }

    
}

export default function UserPost(props) {
    let feed = props.feed;
    console.log(props.feed)
    console.log(feed.userName);
    console.log(feed.comments);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const [commentList, setCommentList] = React.useState(feed.comments);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log(feed.posterEmail)

  const submitComment = () => {
    console.log(props)
    let data = {
      email: email,
      text: comment,
      postId: props.feed.postId
    }

    console.log(data)

    let config = {
        headers: {
            'authentication-token-user': token,
        }
    }

    axios.post('http://localhost:5000/api/users/createComment', data, config)
      .then(res => {
        console.log(res.data)
        setComment('')
        axios.get('http://localhost:5000/api/users/getCommentByPost/' + data.postId)
          .then(response => {
            console.log(response.data)
            setCommentList(response.data)
          })
          .catch(error => console.log(error))
      })
      .catch(e => console.log(e));
  }

  return (

    <Card className={classes.root}>
      <CardHeader
        avatar={
          <a href="/profile" onClick={ sessionStorage.setItem('loadUser', feed.poster) }>
            <Avatar aria-label="recipe" className={classes.avatar} src={feed.img}>
              {feed.userName[0]}
            </Avatar>
          </a>
        }
        action={
          <IconButton aria-label="report">
            <MoreVertIcon />
          </IconButton>
        }
        title={feed.userName}
        subheader={feed.date}
      />
      <CardContent>
        <Typography variant="body2"component="p">
          {feed.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="comments"
        >
          <ChatBubbleOutlineIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
            <textarea id="userComment" rows="2" cols="100" placeholder="Post something!" value={comment} onChange={e => setComment(e.target.value)}></textarea>
            <button class="btn btn_post_blog" onClick={submitComment}>  POST  </button>
            {feed.hasOwnProperty("comments") ? <CommentList comment={commentList}/> : <h5>No comments</h5>}
            
        </CardContent>
      </Collapse>
    </Card>
  );
} 