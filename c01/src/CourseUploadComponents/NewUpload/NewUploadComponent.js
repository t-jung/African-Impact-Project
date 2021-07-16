import React, { Component } from 'react'
import styles from '../../styles.js'
import './NewUploadComponent.css'

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { Checkbox, FormControlLabel, InputLabel } from '@material-ui/core';

const tagsCategories = [
    "tag1", "tag2", "tag3"
]

const TagsDisplay = () => {
    return(
        <div>
            {tagsCategories.map(item => {
                <div class="tagContainer">
                    <Typography>Testing </Typography>
                    <input type="checkbox" id={item} name={item}/>
                    <label for={item}>{item}</label>
                </div>
            })}
        </div>
    )
}

const NewCourseForm = (props) => {
    const [checked, setChecked] = React.useState(false);
    const [videoTitle, setTitle] = React.useState('Unamed video');
    const [videoLink, setLink] = React.useState('no link');

    const handleChange = (event) => {
      setChecked(!checked);
    };

    function handSubmit(event) {
        event.preventDefault();
        let data = {
            videoTitle: videoTitle,
            videoLink: videoLink,
            isAssignment: checked,
            tags: []
        }
        props.handle(data);
    }

    return(
        <div class="formContainer">
            <form>
                <FormControl>
                    <Typography>Video title:</Typography>
                    <TextField variant="outlined" size="small" id="videoTitle" value={videoTitle} onChange={(e) => setTitle(e.target.value)}/>
                    <Typography>Link video:</Typography>
                    <TextField variant="outlined" size="small" id="videoLink" value={videoLink} onInput={(e) => setLink(e.target.value)}/>
                    <Typography>Is assignment?</Typography>
                    <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        label="Assignment"
                        id="isAssignment"
                        inputProps={{ 'aria-label': 'primary checkbox'}}/>
                    <Typography>Tags:</Typography>
                    <FormControlLabel
                    control={<Checkbox />}
                    label="Itenm"
                    />
                    <TagsDisplay/>
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
        videoTitle: '',
        videoLink: '',
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
        this.setState({
            videoTitle: data.videoTitle,
            videoLink: data.videoLink,
            isAssignment: data.isAssignment,
            tags: data.tags
        }, () => {console.log("current: "); console.log(this.state);});

        let config = {
            headers: {
                'authentication-token-company': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55Ijp7ImlkIjoiNjBlNjNjM2RjODNhOGUwOTE0MzRhYzYxIn0sImlhdCI6MTYyNTgwNzMzMiwiZXhwIjoxNjI1ODEwOTMyfQ.W5DSEBZtDzPqm3SFPV-3HrwpuX-9K7ve22fIwKGYDfE',
            }
        }

        console.log(this.state)
        /*
        axios.put('http://localhost:5000/api/company/change_company_info/', this.state, config)
        .then(res => console.log(res))
        .catch(err => console.log(err));*/
    }

    render() {
        return(
            <NewCourseForm handle={this.handleStateChange} state={this.state}/>
        )
    }
}

export default NewUpload