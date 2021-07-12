import './PartnerForm.css';
import { useState } from 'react'
import axios from 'axios';

export const PartnerRegistrationForm = () =>{

    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [confPass, setConfPass] = useState('')
    const [address, setAddress] = useState('')
    const [number, setNumber] = useState('')
    const [fax, setFax] = useState('')
    const [investing_area, setInvesting_area] = useState('')
    const myJSON = {name:'', email: '', password: '', address:'',phone_number:'',fax:'',investing_area:''}

    const onSubmit = (e) => {
        let authentication = sessionStorage.getItem('token');
        e.preventDefault()
        
        if(!name) {
            alert('An investor name is required.')
            setName('')
            return
        }
        
        
        if(!email) {
            alert('An investor email is required for registration.')
            setEmail('')
            return
        }

        if(!number) {
            alert('An investor phone number is required for registration.')
            setNumber('')
            return
        }
        

        if(!pass) {
            alert('A password is required to register.')
            setPass('')
            setConfPass('')
            return
        }
        

        if(!confPass){
            alert('A password is required to register.')
            setPass('')
            setConfPass('')
            return
        } else if(confPass != pass){
            alert('Passwords do not match.')
            setPass('')
            setConfPass('')
            return
        }

        if(pass.length < 6){
            alert('Please use a password of at least 6 characters.')
            setPass('')
            setConfPass('')
            return
        }

        myJSON.name = name;
        myJSON.email = email;
        myJSON.address = address;
        myJSON.phone_number = number;
        myJSON.password = pass;
        myJSON.fax = fax;
        myJSON.investing_area = investing_area;
        let config = {
            headers: {
                'authentication-token-user': authentication
            }
        }
        console.log(myJSON);
        console.log(config);
        axios.post('http://localhost:5000/api/partner/partner_register', myJSON, config).then(res => console.log(res))
        .catch(e => console.log(e));
        setName('')
        setEmail('')
        setAddress('')
        setInvesting_area('')
        setPass('')
        setConfPass('')
        setNumber('')

        // TODO: After submission it should bring you to a different page.
    }
    return (
        <div class="container">
            Investor and Service Provider Form
            <br/>
            <div class="mx-auto col-lg-10">
            <div class="card">
            <h3>Investor Registration Form</h3>
            <p>Sign up as an investor</p>
            <form onSubmit = {onSubmit}>
                <div class="card">
                    
                        <h3>Basic Information</h3>
                        <label>Organization/Company</label>
                        <input type="text" name="com_name" placeholder="Enter the organization/company name" value={name} 
                                onChange={(e) => setName(e.target.value)} required/><br/><br/>
                        <label>Address</label>
                        <input type="text" name="com_add" placeholder="Address" value={address} 
                        onChange={(e) => setAddress(e.target.value)} required/><br/><br/>
                        <label>Phone Number</label>
                        <input type="text" name="com_phone" placeholder="Phone number" value={number} 
                                onChange={(e) => setNumber(e.target.value)} required/><br/><br/>
                        <label>Email Address</label>
                        <input type="text" name="com_email" placeholder="Email address" value={email} 
                                onChange={(e) => setEmail(e.target.value)}/><br/><br/>
                        <label>Fax Number (if any)</label>
                        <input type="text" name="com_fax" placeholder="Fax number" value={fax} 
                                onChange={(e) => setFax(e.target.value)}/><br/><br/>
                        <label>Password</label>
                        <input type="password" name="pw" placeholder="Enter Password" value={pass} 
                                onChange={(e) => setPass(e.target.value)} required/><br/><br/>
                        <label>Re-enter Password</label>
                        <input type="password" name="pw-repeat" placeholder="Re-enter Password" value={confPass} 
                                onChange={(e) => setConfPass(e.target.value)} required/><br/><br/>
                         
                </div>
                <br/>
                <div class="card">
                    <form>
                        <h3>Additional Information</h3>
                        <label>Investing Area</label><br/>
                                <input type='text' name = "investing_area" placeholder='Whats industry is your company a part of?' value = {investing_area}
                                onChange = {(e) => setInvesting_area(e.target.value)} />
                    </form>
                </div>
                <br/>
                <button type="submit" class="btn_PF btn_PF2">Register</button>   
                </form>
        </div>
        </div>
    </div>     
    )
    }


    

export default PartnerRegistrationForm;
