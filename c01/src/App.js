import './App.css';
import LoginForm from './LoginComponents/LoginForm'
import RegisterForm from './RegisterComponents/RegisterForm'
import PartnerRegistrationForm from './PartnerRegistrationFormComponents/PartnerRegistrationForm'
import AdminPage from './AdminComponents/AdminPage'
import ProfileFrame from './ProfileComponents/ProfileFrame'
import CompanyForm from './LoginComponents/CompanyRegistrationForm'
import ProfileEditForm from './ProfileComponents/SideBarProfile'
import Nav from './NavbarComponents/Nav'
import Feed from './FeedComponents/Feed';
import NewVideo from './CourseUploadComponents/NewUpload/NewUploadComponent'
import Elearning from './ELearningComponents/ELearning.js'
import ChatRoom from './ChatRoomComponents/ChatRoomComponent'
import ResultPage from './NavbarComponents/SearchComponent/ResultPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ViewUploadedAssignments from './CourseUploadComponents/ViewUploadedAssignments/ViewUploadedAssignments.js';
import Landing from './ELearningComponents/Landing'
function App() {
  return (


    <Router>
    <div className="App">
    
     

      { /* https://medium.com/@mcurena24/add-direct-messaging-to-your-app-using-react-redux-socket-io-4953ad53944d THIS SEEMS USEFUL */}
      <Route path={/\(?^.{2,}$\d{3}\/(?!register)\)/} component={ Nav } />
      <Switch>
        
        <Route path="/" exact component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/profile" component={ProfileFrame} />
        <Route path="/feed" component={Feed} />
        <Route path="/profile_edit" component={ProfileEditForm} />
        <Route path="/adminpage" component={AdminPage} />
        <Route path="/partner_register" component={PartnerRegistrationForm} />
        <Route path="/company_register" component={CompanyForm} />
        <Route path="/new_upload_video" component={NewVideo}/>
        <Route path="/landing" component={Landing} />
        <Route path="/elearning" component={Elearning}/>
        <Route path="/view_uploaded_assignments" component={ViewUploadedAssignments}/>
        <Route path="/chatroom" component={ChatRoom}/>
        <Route path="/search_results" component={ResultPage}/>
      </Switch>
    </div>

    </Router>
  );
}

export default App;