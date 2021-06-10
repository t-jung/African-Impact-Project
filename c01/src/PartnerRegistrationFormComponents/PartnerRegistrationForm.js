import './PartnerForm.css';
import React from 'react';
import RegisterForm from '../RegisterComponents/RegisterForm';

const PartnerRegistrationForm = () => {
    var registration_state = {state : 1};
    return (
        <div>
            <div class="rg-box">
                <div class="rg-left">
                    <p>Who are you?</p>
                    <p><button type="button" onClick={()=>registration_state.state=1}>Investor</button></p>
                    <p><button type="button" onClick={()=>registration_state.state=2}>Service Provider</button></p>
                </div>
                <div class="rg-middle">
                    <form>
                        <RegistrationType 
                        state = {registration_state}/> 
                    </form>      
                </div>
            </div>
        </div>
        
    )
}

const RegistrationType = ({state}) => {
    if(state.state===1){
        return <Investor/>
    }
    else{
        return <Serviceprovider/>
    }
    
}
const Investor = () => {
    return(
        <tbody>
            <tr>
                <td colspan="2" class="form_header"><h3>Investor Registration Form</h3></td>
            </tr>
            <tr>
            <td colspan="2"><h3></h3></td> 
            </tr>
            <tr>
            <td class="td_left">
                <b>Organization/Company</b><br/>
                <i>
                    Name of Organization to be registered
                </i>
                </td>
                <td class="td_right">
                    <input type="text" name="inv_com" value="" size="50" maxlenght="100"/>
                </td>
            </tr>
            <tr>
                <td class="td_left"><b>Address</b></td>
                <td class="td_right"><input type="text" name="inv_com_add" value="" size="50" maxlenght="100"/></td>
            </tr>
            <tr>
                <td class="td_left"><b>City/Town</b></td>
                <td class="td_right"><input type="text" name="inv_com_city" value="" size="50" maxlenght="50"/></td>
            </tr>
            <tr>
                <td class="td_left"><b>Province</b></td>
                <td class="td_right"><input type="text" name="inv_com_prov" value="" size="50" maxlenght="50"/></td>
            </tr>
            <tr>
                <td class="td_left"><b>Country</b></td>
                <td class="td_right"><input type="text" name="inv_com_country" value="" size="50" maxlenght="50"/></td>
            </tr>
            <tr>
                <td class="td_left"><b>Phone Number</b></td>
                <td class="td_right"><input type="text" name="ser_com_phone" value="" size="50" maxlenght="20"/></td>
            </tr>
            <tr>
                <td class="td_left"><b>Fax Number</b></td>
                <td class="td_right"><input type="text" name="ser_com_fax" value="" size="50" maxlenght="30"/></td>
            </tr>
            <tr>
                <td class="td_left"><b>Email Address</b></td>
                <td class="td_right"><input type="text" name="ser_com_email" value="" size="50" maxlenght="30"/></td>
            </tr>
            <tr>            
                <td class="td_left">
                    <b>Service Industry</b><br></br>
                    <i>
                        Select the service industries the Organization provided
                    </i>
                </td>
                <td class="td_right">
                    <input class="input_checkbox" type="checkbox" name="inv_ids[]"/> Agriculture <br/>
                    <input class="input_checkbox" type="checkbox" name="inv_ids[]"/> Automotive Products & Services <br/>
                    <input class="input_checkbox" type="checkbox" name="inv_ids[]"/> Aviation <br/>
                    <input class="input_checkbox" type="checkbox" name="inv_ids[]"/> Biotechnology & Life Sciences <br/>
                    <input class="input_checkbox" type="checkbox" name="inv_ids[]"/> Building Services & Products <br/>
                    <input class="input_checkbox" type="checkbox" name="inv_ids[]"/> Education & Training <br/>
                    <input class="input_checkbox" type="checkbox" name="inv_ids[]"/> Energy & Mining <br/>
                    <input class="input_checkbox" type="checkbox" name="inv_ids[]"/> Entertainment & Film <br/>
                    <input class="input_checkbox" type="checkbox" name="inv_ids[]"/> Fashion & Beauty <br/>
                    <input class="input_checkbox" type="checkbox" name="inv_ids[]"/> Food & Beverage <br/>
                    <input class="input_checkbox" type="checkbox" name="inv_ids[]"/> Hospitality, Restaurants & Bars <br/>
                    <input class="input_checkbox" type="checkbox" name="inv_ids[]"/> Internet, eCommerce & Apps <br/>
                    <input class="input_checkbox" type="checkbox" name="inv_ids[]"/> IT, Hardware & Software <br/>
                    <input class="input_checkbox" type="checkbox" name="inv_ids[]"/> Leisure, Tourism & Hotels <br/>
                    <input class="input_checkbox" type="checkbox" name="inv_ids[]"/> Manufacturing <br/>
                    <input class="input_checkbox" type="checkbox" name="inv_ids[]"/> Marketing & Advertising <br/>
                    <input class="input_checkbox" type="checkbox" name="inv_ids[]"/> Media & Publishing<br/>
                    <input class="input_checkbox" type="checkbox" name="inv_ids[]"/> Medical, Pharmaceuticals & Health Car <br/>
                    <input class="input_checkbox" type="checkbox" name="inv_ids[]"/> Products & Inventions <br/>
                    <input class="input_checkbox" type="checkbox" name="inv_ids[]"/> Real Estate <br/>
                    <input class="input_checkbox" type="checkbox" name="inv_ids[]"/> Retail <br/>
                    <input class="input_checkbox" type="checkbox" name="inv_ids[]"/> Security & Defence <br/>
                    <input class="input_checkbox" type="checkbox" name="inv_ids[]"/> Technology <br/>
                    <input class="input_checkbox" type="checkbox" name="inv_ids[]"/> Telecom & Mobile <br/>
                    <input class="input_checkbox" type="checkbox" name="inv_ids[]"/> Transportation <br/>
                </td>
            </tr>
            <tr>
                <td class="btn_tb" colspan="2" align="center">
                    <input type="submit" value="Submit Profile" class="SubmitButton" id="btn"/>
                </td>
            </tr>
        </tbody>
    )
}

const Serviceprovider = () => {
    return (
        <tbody>
            <tr>
                <td colspan="2" class="form_header"><h2>Service Provider Registration Form</h2></td>
            </tr>
            <tr>
                <td colspan="2" class="td_left"><h3>General Information</h3></td>
            </tr>
            <tr>
                <td class="td_left">
                    <b>Organization/Company</b><br/>
                    <i>
                        Name of Organization to be registered
                    </i>
                </td>
                <td class="td_right">
                    <input type="text" name="cor_name" value="" size="50" maxlenght="100"/>
                </td>
            </tr>
            <tr>
                <td class="td_left"><b>Address</b></td>
                <td class="td_right"><input type="text" name="ser_add" value="" size="50" maxlenght="100"/></td>
            </tr>
            <tr>
                <td class="td_left"><b>City/Town</b></td>
                <td class="td_right"><input type="text" name="ser_city" value="" size="50" maxlenght="50"/></td>
            </tr>
            <tr>
                <td class="td_left"><b>Province</b></td>
                <td class="td_right"><input type="text" name="ser_prov" value="" size="50" maxlenght="50"/></td>
            </tr>
            <tr>
                <td class="td_left"><b>Country</b></td>
                <td class="td_right"><input type="text" name="ser_country" value="" size="50" maxlenght="50"/></td>
            </tr>
            <tr>
                <td class="td_left"><b>Phone Number</b></td>
                <td class="td_right"><input type="text" name="ser_phone" value="" size="50" maxlenght="20"/></td>
            </tr>
            <tr>
                <td class="td_left"><b>Fax Number</b></td>
                <td class="td_right"><input type="text" name="ser_fax" value="" size="50" maxlenght="30"/></td>
            </tr>
            <tr>
                <td class="td_left"><b>Email Address</b></td>
                <td class="td_right"><input type="text" name="ser_email" value="" size="50" maxlenght="30"/></td>
            </tr>
            <tr>
                <td class="td_left"><h3>Service Details</h3></td>
            </tr>
            <tr>            
                <td class="td_left">
                    <b>Service Industry</b><br/>
                    <i>
                        Select the service industries the Organization provided
                    </i>
                </td>
                <td class="td_right">
                    <input class="input_checkbox" type="checkbox" name="ser_ids[]"/> Agriculture <br/>
                    <input class="input_checkbox" type="checkbox" name="ser_ids[]"/> Automotive Products & Services <br/>
                    <input class="input_checkbox" type="checkbox" name="ser_ids[]"/> Aviation <br/>
                    <input class="input_checkbox" type="checkbox" name="ser_ids[]"/> Biotechnology & Life Sciences <br/>
                    <input class="input_checkbox" type="checkbox" name="ser_ids[]"/> Building Services & Products <br/>
                    <input class="input_checkbox" type="checkbox" name="ser_ids[]"/> Education & Training <br/>
                    <input class="input_checkbox" type="checkbox" name="ser_ids[]"/> Energy & Mining <br/>
                    <input class="input_checkbox" type="checkbox" name="ser_ids[]"/> Entertainment & Film <br/>
                    <input class="input_checkbox" type="checkbox" name="ser_ids[]"/> Fashion & Beauty <br/>
                    <input class="input_checkbox" type="checkbox" name="ser_ids[]"/> Food & Beverage <br/>
                    <input class="input_checkbox" type="checkbox" name="ser_ids[]"/> Hospitality, Restaurants & Bars <br/>
                    <input class="input_checkbox" type="checkbox" name="ser_ids[]"/> Internet, eCommerce & Apps <br/>
                    <input class="input_checkbox" type="checkbox" name="ser_ids[]"/> IT, Hardware & Software <br/>
                    <input class="input_checkbox" type="checkbox" name="ser_ids[]"/> Leisure, Tourism & Hotels <br/>
                    <input class="input_checkbox" type="checkbox" name="ser_ids[]"/> Manufacturing <br/>
                    <input class="input_checkbox" type="checkbox" name="ser_ids[]"/> Marketing & Advertising <br/>
                    <input class="input_checkbox" type="checkbox" name="ser_ids[]"/> Media & Publishing<br/>
                    <input class="input_checkbox" type="checkbox" name="ser_ids[]"/> Medical, Pharmaceuticals & Health Care <br/>
                    <input class="input_checkbox" type="checkbox" name="ser_ids[]"/> Products & Inventions <br/>
                    <input class="input_checkbox" type="checkbox" name="ser_ids[]"/> Real Estate <br/>
                    <input class="input_checkbox" type="checkbox" name="ser_ids[]"/> Retail <br/>
                    <input class="input_checkbox" type="checkbox" name="ser_ids[]"/> Security & Defence <br/>
                    <input class="input_checkbox" type="checkbox" name="ser_ids[]"/> Technology <br/>
                    <input class="input_checkbox" type="checkbox" name="ser_ids[]"/> Telecom & Mobile <br/>
                    <input class="input_checkbox" type="checkbox" name="ser_ids[]"/> Transportation <br/>
                </td>
            </tr>
            <tr>
                <td class="btn_tb" colspan="2" align="center">
                    <input type="submit" value="Submit Profile" class="SubmitButton" id="btn"/>
                </td>
            </tr>               
        </tbody>               
    )
}


export default PartnerRegistrationForm;