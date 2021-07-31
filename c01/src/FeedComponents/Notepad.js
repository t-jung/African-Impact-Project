import React from 'react'
import axios from 'axios'
import { Component } from 'react'

let token = sessionStorage.getItem('token');
let email = sessionStorage.getItem('email');
let type = sessionStorage.getItem('type')

class Notepad extends Component {
  state = {
    notes: 
       "Loading notes... "
 }
  componentDidMount() {
    axios.get(`http://localhost:5000/api/users/notes/getNotes`+email)
    .then(res => {
        this.setState({videos:res.data});
        return res.data.map(item =>{ 
            return {
                notes: item.notes
            }    
        })
    })
    .then(res => (
        this.setState({state: res})
    ))
    .catch(err => {
        console.log(err);
        this.setState([]);
    })
  }



  render(){
    return (
      <div>
        <textarea id="w3review" name="w3review" rows="4" cols="50">
          {this.state.notes}
        </textarea>
        <button onClick={saveNote}>
          save
        </button>
      </div>
    )
  }
}

export default Notepad

function saveNote(event) {
  event.preventDefault();
  this.setState({
    notes: state
  }, () => {
    axios.post(`http://localhost:5000/api/users/notes/addNote/`+email, state2)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    });}