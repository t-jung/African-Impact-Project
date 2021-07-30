import React from 'react';
import { Route} from 'react-router-dom';
import PendingBoard from './AdminPendingReports';
import VerifBoard from './AdminPendingVerifications';
import ViewUserList from './AdminViewUserList';
import ViewBannedUsers from './AdminViewBannedUsers';
import AdminUploadVideo from './AdminUploadVideo';
import ViewUploaded from '../CourseUploadComponents/CourseUploadComponent'

const AdminRouter = () => (
        <div>
        <Route path="/adminpage/" component={PendingBoard} exact={true}/>
        <Route path="/adminpage/verifications" component={VerifBoard} />
        <Route path="/adminpage/users" component={ViewUserList} /> 
        <Route path="/adminpage/banned" component={ViewBannedUsers} />
        <Route path="/adminpage/video" component={AdminUploadVideo} />
        <Route path="/adminpage/view_uploaded" component={ViewUploaded}/>
        </div>

);


export default AdminRouter;