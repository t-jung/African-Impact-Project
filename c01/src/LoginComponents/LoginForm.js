import axios from 'axios';
import React, { useState, Component } from 'react';
import './LoginForm.css'

<<<<<<< HEAD
export default class Login extends Component {
=======
const LoginForm = () => {
    return (
        <div class="container_login">
            <div class="mx-auto col-sm-9 col-lg-5">
            <div class="card">
                <div class="card-body">
                    <h5 class="text-center" >Sign In</h5>
                    <div class="d-flex justify-content-center">
                        <div class="d-flex justify-content-center">
                            <form>
                                <div class="form-group">
                                    <label for="email"></label>
                                    <input type="email" class="form-control" id="email" placeholder="Email address" />
                                </div>

                                <div class="form-group">
                                    <label for="pass"></label>
                                    <input type="password" class="form-control" id="pass" placeholder="Password" />
                                </div>
                                <div class="form-group form-check">
                                    <input type="checkbox" class="form-check-input" id="check" />
                                    <label for="check" class="form-check-label">Remember password</label>
                                </div>
                                <a href="/feed" class="btn btn-primary text-uppercase btn-block">sign in</a>
                                <a href="/register" button class="btn btn-secondary text-uppercase btn-block">register</a>
                                <hr />
                                <a href="/feed"  class="btn gbtn text-uppercase btn-block">sign in with google</a>
                                <br />
                                <a href="/feed" class="btn fbbtn text-uppercase btn-block">sign in with facebook</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
		</div>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
>>>>>>> development

    state = {
        email: '',
        password: ''
    }

    constructor(props) {
        super(props);
        this.state = this.handleStateChange.bind(this)
    }  

    handleStateChange = (event) => {
        
        console.log("Clicked")

        const {name: fieldName, value} = event.target

        this.setState({
            [fieldName]: value
        })
        console.log(this.state)

        axios.post('http://localhost5000/api/company/change_company_info/', this.state)
        .then(res => console.log(res));
    }

    onSubmit(e) {
        e.preventDefault();

        const userInfo = {
            email:this.state.email,
            password: this.state.password,
        };

        axios.post('http://localhost:5000/api/login', userInfo)
            .then(res => console.log(res.data))
            .catch(e => console.log(e));

    }

    render(){
        return (
            <div class="container_login">
                <div class="mx-auto col-sm-9 col-lg-5">
                <div class="card">
                    <div class="card-body">
                        <h5 class="text-center" >Sign In</h5>
                        <div class="d-flex justify-content-center">
                            <div class="d-flex justify-content-center">
                                <form>
                                    <div class="form-group">
                                        <label for="email"></label>
                                        <input type="email" class="form-control" id="email" placeholder="Email address" onChange={(e) => {this.setState({email: e.target.value})}}/>
                                    </div>
    
                                    <div class="form-group">
                                        <label for="pass"></label>
                                        <input type="pass" class="form-control" id="pass" placeholder="Password" onChange={(e) => {this.setState({password: e.target.value})}}/>
                                    </div>
                                    <div class="form-group form-check">
                                        <input type="checkbox" class="form-check-input" id="check" />
                                        <label for="check" class="form-check-label">Remember password</label>
                                    </div>
                                    <button type="submit" onClick={this.handleStateChange} class="btn btn-primary text-uppercase btn-block">sign in</button>
                                    <a href="/register" button={true} class="btn btn-secondary text-uppercase btn-block">register</a>
                                    <hr />
                                    <button class="btn gbtn text-uppercase btn-block">sign in with google</button>
                                    <br />
                                    <button class="btn fbbtn text-uppercase btn-block">sign in with facebook</button>
                                </form>
                            </div>
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

