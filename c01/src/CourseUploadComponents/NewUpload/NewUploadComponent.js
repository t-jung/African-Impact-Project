import React, { Component } from 'react'
import './NewUploadComponent.css'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { Checkbox } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import axios from 'axios'

const tagsCategories = [
    "Start up", "Investing", "Management", "Interpersonal", "Education", "Electronics"
]

const TagsDisplay = (props) => {
    return(
        <div class='tagContainer'>
            {tagsCategories.map((item, index) => ( 
                <div class="indivTags">
                    <div>
                        <input type="checkbox" id={index} name={item} value={item} onClick={props.handle}/>
                        <label for={item}>{item}</label>
                    </div>
                </div>
            ))}
        </div>
    )
}

const TextFieldStyled =  withStyles((theme) => ({
    root: {
        borderRadius: 10,
        border: 0,
        color: 'black',
        fontWeight: 200,
        paddingRight: 15,
        paddingLeft: 15,
        padding: 10,
        marginBottom: 3,
    }
}))(TextField);

const NewCourseForm = (props) => {
    const [checked, setChecked] = React.useState(false);
    const [videoTitle, setTitle] = React.useState('Unamed video');
    const [videoLink, setLink] = React.useState('no link');
    const [videoDescription, setDescription] = React.useState('');

    let trackTagged = []
    for(let i = 0; i < tagsCategories.length; i++) {
        trackTagged[i] = false;
    }

    const taggedChange = (event) => {
        trackTagged[event.target.id] = !trackTagged[event.target.id];
    }

    const handleChange = (event) => {
      setChecked(!checked);
    };

    function handSubmit(event) {
        event.preventDefault();

        if(videoTitle.length === 0) {
            alert("Video title cannot be empty!")
            return;
        }

        if(videoLink.length === 0) {
            alert("Please input a link to the video!")
            return;
        }


        let data = {
            videoTitle: videoTitle,
            videoLink: videoLink,
            isAssignment: checked,
            description: videoDescription,
            tags: []
        }

        for(const [index, checked] of trackTagged.entries()) {
            if(checked) data.tags.push(tagsCategories[index])
        }

        props.handle(data);
    }

    return(
        <div class="formContainer">
            <form class="d-flex justify-content-center">
                <FormControl>
                    <Typography>Video title:</Typography>
                    <TextFieldStyled variant="outlined" size="small" id="videoTitle" placeholder="Video title" value={videoTitle} onChange={(e) => setTitle(e.target.value)}/>
                    <Typography>Link video:</Typography>
                    <TextFieldStyled variant="outlined" size="small" id="videoLink" placeholder="Video link" value={videoLink} onInput={(e) => setLink(e.target.value)}/>
                    <Typography>description:</Typography>
                    <TextFieldStyled variant="outlined" multiline={true} rows={4} size="small" id="videoDescription" value={videoDescription} onInput={(e) => setDescription(e.target.value)}/>
                    <Typography>Is assignment?</Typography>
                    <Checkbox
                        checked={checked}
                        onChange={() => setChecked(!checked)}
                        label="Assignment"
                        id="isAssignment"
                        inputProps={{ 'aria-label': 'primary checkbox'}}/>
                    <Typography>Tags:</Typography>
                    <TagsDisplay handle={taggedChange}/>
                    <Button
                        onClick={handSubmit}>
                        Save!
                    </Button>
                </FormControl>
            </form>
        </div>
    );
}

class NewUpload extends Component {

    state = {
        title: '',
        link: '',
        description: '',
        isAssignment: false,
        tags: []
    }

    constructor(props){
        super(props);
        this.state = this.handleStateChange.bind(this)
    }

    handleSetState = (e) => {
        console.log(e.target.value);
        console.log(this.state.videoTitle);
        //this.setState({ [e.target.id]: e.target.value})
        console.log(this.state.videoTitle);
    }

    handleStateChange = (data) => {
        console.log(data);

        let date = new Date();

        this.setState({
            title: data.videoTitle,
            link: data.videoLink,
            description: data.description,
            isAssignment: data.isAssignment,
            uploader: "admin",
            uploadDate: date.toLocaleString('en-US', { timeZone: 'America/Toronto' }),
            tags: data.tags

        }, () => {console.log("current: "); console.log(this.state);
        axios.post('http://localhost:5000/api/videos/uploadVideo/', this.state)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        });

        /*
        let config = {
            headers: {
                'authentication-token-company': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55Ijp7ImlkIjoiNjBlNjNjM2RjODNhOGUwOTE0MzRhYzYxIn0sImlhdCI6MTYyNTgwNzMzMiwiZXhwIjoxNjI1ODEwOTMyfQ.W5DSEBZtDzPqm3SFPV-3HrwpuX-9K7ve22fIwKGYDfE',
            }
        }
        */
        console.log(this.state)
        
    }

    render() {
        return(
            <NewCourseForm handle={this.handleStateChange} state={this.state}/>
        )
    }
}

export default NewUpload