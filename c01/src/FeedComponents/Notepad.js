import React from 'react'
import axios from 'axios'
import { Component } from 'react'

let token = sessionStorage.getItem('token');
let email = sessionStorage.getItem('email');
let type = sessionStorage.getItem('type')

class Notepad extends Component {
  state = {
    notes: 
       "loading notes..."
 }
  componentDidMount() {
    axios.get(`http://localhost:5000/api/users/notes/getNotes/`+email)
    .then(res => {
        this.setState({notes:res.data});
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

  saveNote(e) {
    e.preventDefault();

    let jsx = {
      notes: e.target.value
    };

    axios.post(`http://localhost:5000/api/users/notes/addNote/`+email, jsx)
        .then(res => console.log(res))
        .catch(err => console.log(err));

    console.log(this);
  
  }



  render(){
    if (this.state.notes === "loading notes..."){
      return "no notes";
    }
    return (
      <div>
        <textarea id="w3review" name="w3review" rows="4" cols="50"
        onChange={this.saveNote}>
          {this.state.notes}
        </textarea>
      </div>
    )
  }
}

export default Notepad
