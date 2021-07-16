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
    const classes = useStyles();
    let comment = props.comment;
    console.log(comment)
    if(comment !== null) {
        return(
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label={comment.userName} className={classes.avatar} src={comment.src}>
                            {comment.userName[0]}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="report">
                          <MoreVertIcon />
                        </IconButton>
                    }
                    title={comment.userName}
                />
                <CardContent>
                    <Typography variant="body2"component="p">
                        {comment.content}
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
    } else {
        return null;
    }
}

export default function UserPost(props) {
    let feed = props.feed;
    console.log(feed.userName);
    console.log(feed.comment);

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [comment, setComment] = React.useState('');

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log(feed.posterEmail)

  const submitComment = () => {
    console.log("Adding comment:")
    console.log(comment)
  }

  return (

    <Card className={classes.root}>
      <CardHeader
        avatar={
          <a href="/profile" onclick={ sessionStorage.setItem('loadUserEmail', feed.poster) }>
            <Avatar aria-label="recipe" className={classes.avatar} src={feed.img}>
              {feed.userName}
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
            <textarea id="userComment" rows="2" cols="100" placeholder="Post something!" onChange={e => setComment(e.target.value)}></textarea>
            <button class="btn btn_post_blog" onClick={submitComment}>  POST  </button>
            {feed.hasOwnProperty("comment") ? <CommentList comment={feed.comment}/> : null}
            
        </CardContent>
      </Collapse>
    </Card>
  );
} 