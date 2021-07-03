import { useState } from 'react'
import './CompanyRegistrationForm.css'

export const CompanyRegistrationForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [pass, setPass] = useState('')
    const [confPass, setConfPass] = useState('')
    

    const onSubmit = (e) => {
        e.preventDefault()
        
        if(!name) {
            alert('A company name is required.')
            setName('')
            return
        }
        
        
        if(!email) {
            alert('A company email is required for registration.')
            setEmail('')
            return
        }

        if(!number) {
            alert('A company phone number is required for registration.')
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

        console.log('Successful Company Registration.')        
        console.log(`Company Name: ${name}`)
        console.log(`Email: ${email}`)
        console.log(`Password: ${pass}`)

        setName('')
        setEmail('')
        setPass('')
        setConfPass('')
        setNumber('')

        // TODO: After submission it should bring you to a different page.
    }

    return (
        <div className = 'container_login_company'>
            <div className = 'card'>
                <div className = 'cardbody'>
                    <h1>Company Registration Form</h1>
                    <p>Sign up as a company and meet potential investors and partners through our online community.</p>
                    <form className='reg-form' onSubmit={onSubmit}>

                        <br/>

                        <div className = 'card'>
                            <h3>Basic Information</h3>
                            <p>The following fields are required for registration.</p>
                            <div className='form-group'>
                            <label class='description'>Company Name</label>
                            <input 
                                type='text' 
                                class="form-control"
                                placeholder='Whats your company name?' 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div class="form-group">
                            <label class='description'>Company Email</label>
                                <input 
                                    type="email"
                                    class="form-control"
                                    id="email"
                                    placeholder="Email address"
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    />
                            </div>

                            <div class="form-group">
                            <label class='description'>Company Phone</label>
                                <input 
                                    type="number"
                                    class="form-control"
                                    id="number"
                                    placeholder="Phone number"
                                    value={number} 
                                    onChange={(e) => setNumber(e.target.value)} 
                                    />
                            </div>

                            <div class="form-group">
                            <label class='description'>Password</label>
                                <input
                                    type="pass"
                                    class="form-control"
                                    id="pass"
                                    placeholder="Password"
                                    value={pass} 
                                    onChange={(e) => setPass(e.target.value)}
                                    />
                            </div>

                            <div class="form-group">
                            <label class='description'>Confirm Password</label>
                                <input
                                    type="pass"
                                    class="form-control"
                                    id="pass"
                                    placeholder="Confirm your Password"
                                    value={confPass}
                                    onChange={(e) => setConfPass(e.target.value)}
                                    />
                            </div>
                        </div>

                        <br/>

                        <div className = 'card'>
                            <h3>Additional Information</h3>
                            <p>These fields are optional.</p>
                            <div className='form-group'>
                                <label class='description'>Location</label>
                                <input type='text' class="form-control" placeholder='Where is your company based?' />
                            </div>
                            <div className='form-group'>
                                <label class='description'>Industry</label>
                                <input type='text' class="form-control" placeholder='Whats industry is your company a part of?' />
                            </div>
                            <div className='form-group'>
                                <label class='description'>Start up date</label>
                                <input type='date' class="form-control" />
                            </div>
                            <div className='form-group'>
                                <label class='description'>Company Website</label>
                                <input type='text' class="form-control" placeholder='Got a link to your companies website?' />
                            </div>
                            <div className='form-group'>
                                <label class='description'>Company Description</label>   
                                <textarea className="form-control multiText" placeholder='Tell us a little about your company.'/>
                            </div> 
                            
                        </div>
                        <br/>
                        <button class="btn btn-secondary text-uppercase btn-block">register</button>
                    </form>
                </div>
                
            </div>
            
        </div>
    )
}

export default CompanyRegistrationForm

/*
Comapny profile:

- company name
- company location (headquarters/and all locations)
- company type
- industry
- specialities
- company official website
- company description (about)
- contact information
- company size
- company owners/employees (higher, that requires authentication)
*/