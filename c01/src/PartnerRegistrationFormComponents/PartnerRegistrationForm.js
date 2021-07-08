import './PartnerForm.css';
import React from 'react';


const PartnerRegistrationForm = () => {

    return (
        <div class="container">
            Investor and Service Provider Form are the same (just changing some title)
            <br/>
            <div class="mx-auto col-lg-10">
            <div class="card">
            <h3>Investor Registration Form</h3>
            <p>Sign up as an investor</p>
                <div class="card">
                    <form>
                        <h3>Basic Information</h3>
                        <label>Organization/Company</label>
                        <input type="text" name="com_name" placeholder="Enter the organization/company name" required/><br/><br/>
                        <label>Address</label>
                        <input type="text" name="com_add" placeholder="Address" required/><br/><br/>
                        <label>Phone Number</label>
                        <input type="text" name="com_phone" placeholder="Phone number" required/><br/><br/>
                        <label>Email Address</label>
                        <input type="text" name="com_email" placeholder="Email address" required/><br/><br/>
                        <label>Fax Number (if any)</label>
                        <input type="text" name="com_fax" placeholder="Fax number"/><br/>
                    </form>
                    
                </div>
                <br/>
                <div class="card">
                    <form>
                        <h3>Additional Information</h3>
                        <label>Investing Area</label><br/>
                        <input class="input_checkbox" type="checkbox" name="ids[]"/> Agriculture <br/>
                        <input class="input_checkbox" type="checkbox" name="ids[]"/> Automotive Products & Services <br/>
                        <input class="input_checkbox" type="checkbox" name="ids[]"/> Aviation <br/>
                        <input class="input_checkbox" type="checkbox" name="ids[]"/> Biotechnology & Life Sciences <br/>
                        <input class="input_checkbox" type="checkbox" name="ids[]"/> Building Services & Products <br/>
                        <input class="input_checkbox" type="checkbox" name="ids[]"/> Education & Training <br/>
                        <input class="input_checkbox" type="checkbox" name="ids[]"/> Energy & Mining <br/>
                        <input class="input_checkbox" type="checkbox" name="ids[]"/> Entertainment & Film <br/>
                        <input class="input_checkbox" type="checkbox" name="ids[]"/> Fashion & Beauty <br/>
                        <input class="input_checkbox" type="checkbox" name="ids[]"/> Food & Beverage <br/>
                        <input class="input_checkbox" type="checkbox" name="ids[]"/> Hospitality, Restaurants & Bars <br/>
                        <input class="input_checkbox" type="checkbox" name="ids[]"/> Internet, eCommerce & Apps <br/>
                        <input class="input_checkbox" type="checkbox" name="ids[]"/> IT, Hardware & Software <br/>
                        <input class="input_checkbox" type="checkbox" name="ids[]"/> Leisure, Tourism & Hotels <br/>
                        <input class="input_checkbox" type="checkbox" name="ids[]"/> Manufacturing <br/>
                        <input class="input_checkbox" type="checkbox" name="ids[]"/> Marketing & Advertising <br/>
                        <input class="input_checkbox" type="checkbox" name="ids[]"/> Media & Publishing<br/>
                        <input class="input_checkbox" type="checkbox" name="ids[]"/> Medical, Pharmaceuticals & Health Car <br/>
                        <input class="input_checkbox" type="checkbox" name="ids[]"/> Products & Inventions <br/>
                        <input class="input_checkbox" type="checkbox" name="ids[]"/> Real Estate <br/>
                        <input class="input_checkbox" type="checkbox" name="ids[]"/> Retail <br/>
                        <input class="input_checkbox" type="checkbox" name="ids[]"/> Security & Defence <br/>
                        <input class="input_checkbox" type="checkbox" name="ids[]"/> Technology <br/>
                        <input class="input_checkbox" type="checkbox" name="ids[]"/> Telecom & Mobile <br/>
                        <input class="input_checkbox" type="checkbox" name="ids[]"/> Transportation <br/>
                    </form>
                </div>
                <br/>
                <button type="submit" class="btn_PF btn_PF2">Register</button>   
        </div>
        </div>
    </div>     
    )
}

    

export default PartnerRegistrationForm;