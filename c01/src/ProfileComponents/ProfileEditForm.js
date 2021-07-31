import './ProfileFrame.css'
import React, { useState, Component, useEffect } from 'react';
import styles from '../styles.js';
import { Typography } from '@material-ui/core';
import jwt_decode from "jwt-decode";
import axios from 'axios';

import tagsCategories from '../tagCategories'

let token = sessionStorage.getItem('token');

const TagsDisplay = (props) => {
    console.log(props.defaultValue)
    return(
        <div class='tagContainer'>
            {tagsCategories.map((item, index) => ( 
                <div class="indivTags">
                    <div>
                        <input type="checkbox" id={index} name={item} value={item} onClick={props.handle} checked={props.defaultValue[index]}/>
                        <label for={item}>{item}</label>
                    </div>
                </div>
            ))}
        </div>
    )
}

class EditForm extends Component {

    state = {
        firstName: '',
        middleName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        description: '',
        tags: ['']
    }

    constructor(props) {
        super(props)
        this.state = this.handleStateChange.bind(this)
    }

    handleSetState = (e) => {
        console.log(this.state);
    }

    handleStateChange = (data) => {
        console.log(data);
        this.setState({
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            email: sessionStorage.getItem('email'),
            phoneNumber: data.phoneNumber,
            description: data.description,
            tags: data.tags
        }, () => {
            console.log(this.state)
            console.log(token);

            let config = {
                headers: {
                    'authentication-token-user': token,
                }
            }

            axios.put('http://localhost:5000/api/users/updateInfo', this.state, config)
                .then(res => console.log(res))
                .catch(e => console.log(e));
        });
    }

    componentDidMount() {
        console.log("mounted")
        axios.get('http://localhost:5000/api/users/getUserById/' + jwt_decode(token).user.id)
            .then(response => {
                console.log(response.data)
                this.setState(response.data)
            })
            .catch((err) => console.log(err))
    }

    render() {
        return(
            <Form handle={this.handleStateChange} state={this.state}/>
        )
    }
}

const Form = (props) => {

    console.log(props.state)
    console.log(tagsCategories)

    let trackTagged = []
    for(let i = 0; i < tagsCategories.length; i++) {
           trackTagged[i] = false; 
    }

    const taggedChange = (event) => {
        trackTagged[event.target.id] = !trackTagged[event.target.id];
        setTagChange(trackTagged)
    }

    console.log(jwt_decode(token).user.id)
    console.log(sessionStorage.getItem('email'))

    const [trackedTagged, setTagChange] = useState(trackTagged);
    useEffect(() => {
        console.log(props.state.tags)
        if(typeof props.state.tags !== 'undefined') {
            console.log("not undefined")
            let tags = props.state.tags
            for(let i = 0; i < tagsCategories.length; i++) {
               console.log("Checking default values")
                if(tags.includes(tagsCategories[i]) === true) {
                    trackTagged[i] = true
                } 
            }
            console.log(trackTagged)
        }
        setTagChange(trackTagged)
    }, [props.state.tags])

    const [firstName, setFirstName] = useState('');
    useEffect(() => {setFirstName(props.state.firstName)}, [props.state.firstName])

    const [middleName, setMiddleName] = useState('');
    useEffect(() => {setMiddleName(props.state.middleName)}, [props.state.middleName])

    const [lastName, setLastName] = useState('');
    useEffect(() => {setLastName(props.state.lastName)}, [props.state.lastName])

    const [phone, setPhone] = useState('');
    useEffect(() => {setPhone(props.state.phoneNumber)}, [props.state.phoneNumber])

    const [description, setDescription] = useState('');
    useEffect(() => {setDescription(props.state.description)}, [props.state.description])

    const onSubmit = (e) => {
        e.preventDefault()
        
        if(firstName === '') {
            alert('A first name is required.')
            return
        }

        if(lastName === '') {
            alert('A last name is required.')
            return
        }
        

        if(phone === '') {
            alert('A phone number is required for registration.')
            return
        }

        console.log('Successful.')        
        console.log(`Name: ${firstName}`)

        let data = {
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            phoneNumber: phone,
            email: props.state.email,
            description: description,
            tags: []
        }

        for(const [index, check] of trackTagged.entries()) {
            if(check) data.tags.push(tagsCategories[index])
        }

        console.log(data)

        props.handle(data);
    }

    return(
    <div class="formContainer card">
        <Typography style={{
                    color: styles.palette.primary.main,
                    fontWeight: 900,
                    fontSize: 30,
                }}>
            Editing User Profile Information:
         </Typography><br/>
        <form>
            <div class="d-flex inputContainer">
                <label class="title  align-self-center" for="fName">First name: </label>
                <input type="text"
                    id="fNameID"
                    class="form-control"
                    placeholder="Edit first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}/>
            </div>
            <div class="d-flex inputContainer">
                <label class="title  align-self-center" for="fName">Middle name: </label>
                <input type="text"
                    id="mNameID"
                    class="form-control"
                    placeholder="Edit middle name"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}/>
            </div>
            <div class="d-flex inputContainer">
                <label class="title  align-self-center" for="lName">Last name: </label>
                <input type="text"
                    id="lNameID"
                    class="form-control"
                    placeholder="Edit last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}/>
            </div>

            <div class="d-flex inputContainer">
                <label class="title  align-self-center" for="phone">Phone number: </label>
                <input type="number"
                    id="phoneID"
                    class="form-control"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}/>
            </div>
            <div class="d-flex inputContainer">
                <label class="title  align-self-center" for="email">Description: </label>
                <textarea
                    rows={4}
                    class="form-control multiText"
                    name="body"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <div class="d-flex inputContainer">
                <label class="title  align-self-center" for="email">Interests: </label>
                <TagsDisplay handle={taggedChange} defaultValue={trackedTagged}/>
            </div>
            <div class="d-flex justify-content-center">
                <a href="/profile" button class="btn profile-editBtn" type="submit" value="Save!" onClick={onSubmit}>Edit</a>
            </div>        
        </form>
    </div>
    );
    
}

export default EditForm

