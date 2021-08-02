import React from 'react';
import './AdminPage.css'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';

import "@fontsource/roboto";

export default class ViewBannedUsers extends React.Component {
    state = {
        users: [],
        companies: [],
        partners: []

    }

    axiosGetAll = () => {
        axios.get('http://localhost:5000/api/users/getAllUsers')
            .then(response => this.setState({users: this.filterBanned(response)}))
            .catch(console.log("error yes"));
            
            axios.get('http://localhost:5000/api/company/get_all_company')
            .then(response => this.setState({companies: this.filterBanned(response)}))
            .catch(console.log("error yes"));
        
            axios.get('http://localhost:5000/api/partner/get_all_partner')
            .then(response => this.setState({partners: this.filterBanned(response)}))
            .catch(console.log("error yes"));
    }

    filterBanned (response) {

        // console.log(response.data);

        const result = response.data.filter(item => item.status === "banned");

        return result;
    }

 
    componentDidMount() {
        console.log(this.state.pendingVerifications);
        try {

            axios.get('http://localhost:5000/api/users/admin/getAllUsers')
            .then(response => this.setState({users: this.filterBanned(response)}))
            .catch(console.log("error yes"));
            
            axios.get('http://localhost:5000/api/company/get_all_company')
            .then(response => this.setState({companies: this.filterBanned(response)}))
            .catch(console.log("error yes"));
        
            axios.get('http://localhost:5000/api/partner/get_all_partner')
            .then(response => this.setState({partners: this.filterBanned(response)}))
            .catch(console.log("error yes"));

        } catch (e){
            
        }
    }
    
    
    render() {
        if(!this.state.partners && !this.state.users && !this.state.companies){
            return (<div>
                no Banned Users
                </div>)
        }
        return(
            <div>
            <List>
            {this.state.users.map(item => (
                <ListItem key={item._id}>
                    <ListItemText primary={item.email} secondary="User"/>
                </ListItem>
            ))}
            {this.state.companies.map(item => (
                <ListItem key={item._id}>
                    <ListItemText primary={item.email} secondary="Company"/>
                </ListItem>
            ))}
            {this.state.partners.map(item => (
                <ListItem key={item._id}>
                    <ListItemText primary={item.email} secondary="Partner"/>
                </ListItem>
            ))}
        </List>
            </div>
        );

    }
    
}
