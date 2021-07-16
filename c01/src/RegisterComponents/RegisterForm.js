import React, { Component } from 'react';
import axios from 'axios';
class RegisterForm extends React.Component {
    state ={ 
        firstName: '', 
        middleName: '', 
        lastName: '',
        gender: '',
        phoneNumber: '',
        address: '',
        email: '',
        password: '',
        description: '',
        status: 'verified'
    }
    constructor(props) {
        super(props);
        this.state = this.handleStateChange.bind(this)
    }  

    handleStateChange = (event) => {
        console.log("Clicked button for registering")

        const {name: fieldName, value} = event.target

        this.setState({
            [fieldName]: value
        })
        console.log(this.state)

        axios.post('http://localhost:5000/api/users/register', this.state)
        .then(res => {
            console.log(res)
            sessionStorage.put('token', res.data.token) 
            window.location ='/feed' 
        })
        .catch(e => console.log(e));
    }
    render(){
    return (
        <div class="container">
            <div class="mx-auto col-sm-9 col-lg-5">
            <div class="card">
                <div class="card-body">
                    <h5 class="text-center" >User Registration</h5>
                        <div class="d-flex justify-content-center">
                            <form>  
                                <hr />  
                                <label>   
                                <b>Name :</b> 
                                </label>  <br/>
                                <input type="text" name="firstname" placeholder= "Firstname" size="15" onChange={(e) => {this.setState({firstName: e.target.value})}}
                        value={this.state.firstName}  required />     <br/>
                                <input type="text" name="lastname" placeholder="Lastname" size="15" onChange={(e) => {this.setState({lastName: e.target.value})}}
                        value={this.state.lastName} required />   
                                <div>  
                                    <label>   
                                    <b>Gender : </b> 
                                    </label>   <br/>
                                    <select onChange={(e) => {this.setState({gender: e.target.value})}}
                        value={this.state.gender}>  
                                        <option value="Male">Male</option>  
                                        <option value="Female">Female</option>  
                                        <option value="Vtuber">Vtuber</option>  
                                        <option value="Other">Other</option>   
                                    </select>  
                                </div>  
                                <label>   
                                <b>Phone :</b>  
                                </label>  <br/>
                                <input  type="text" name="phone" placeholder="4160000000" size="10" onChange={(e) => {this.setState({phoneNumber: e.target.value})}}
                        value={this.state.phoneNumber} required  />   
                                <br/>
                            
                                <b>Current Address :</b>  <br/>
                                <input type="text" name="Address" placeholder="1265 Military Trail, Scarborough" size="30" onChange={(e) => {this.setState({address: e.target.value})}}
                        value={this.state.address} required  />   
                                <br/>
                                
                                <label for="email"><b>Email</b></label>  <br/>
                                <input type="text" placeholder="User@gmail.com" name="email" onChange={(e) => {this.setState({email: e.target.value})}}
                        value={this.state.email} required /><br/>
                                <label for="email"><b>Confirm Email</b></label>  <br/>
                                <input type="text" placeholder="User@gmail.com" name="cemail" required /><br/>

                                <label for="psw"><b>Password</b></label>  <br/>
                                <input type="password" placeholder="Enter Password" name="psw" onChange={(e) => {this.setState({password: e.target.value})}}
                        value={this.state.password} required />  <br/>
                                <label for="psw-repeat"><b>Re-type Password</b></label>  <br/>
                                <input type="password" placeholder="Retype Password" name="psw-repeat" required />  <br/>
                                <button type="submit" class="btn_REG" onClick={this.handleStateChange} >Register</button>    

                            </form>  
                        </div>
                    </div>
                </div>
            </div>
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        </div>
    )
}
}
export default RegisterForm
