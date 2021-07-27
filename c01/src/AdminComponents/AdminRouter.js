import React from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import PendingBoard from './AdminPendingReports';

const AdminRouter = (props) => (
        <Route path="/adminpage/" component={PendingBoard} exact={true}/> 
);


export default AdminRouter;