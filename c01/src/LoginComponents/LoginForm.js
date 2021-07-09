import axios from 'axios';
import React, { useState } from 'react';
import './LoginForm.css'

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e) => {

        console.log("clicked")

        const userInfo = {
            email: email,
            password: password
        };
        axios.post('http://localhost:5000/api/login', userInfo)
        .then(res => console.log(res.data));
    }

    return (
        <div class="container_login">
            <div class="mx-auto col-sm-9 col-lg-5">
            <div class="card">
                <div class="card-body">
                    <h5 class="text-center" >Sign In</h5>
                    <div class="d-flex justify-content-center">
                        <div class="d-flex justify-content-center">
                            <form onSubmit={onSubmit}>
                                <div class="form-group">
                                    <label for="email"></label>
                                    <input type="email" class="form-control" id="email" placeholder="Email address" onChange={e => setEmail(e.target.value)}/>
                                </div>

                                <div class="form-group">
                                    <label for="pass"></label>
                                    <input type="pass" class="form-control" id="pass" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                                </div>
                                <div class="form-group form-check">
                                    <input type="checkbox" class="form-check-input" id="check" />
                                    <label for="check" class="form-check-label">Remember password</label>
                                </div>
                                <button onClick={onSubmit} class="btn btn-primary text-uppercase btn-block">sign in</button>
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



export default LoginForm
