
import './ProfileFrame.css'
import React from 'react';

const ProfileFrame = ({userID}) => {
    // User userID to get the following details:
    var userName = "User Name Here";
    var profilePic = "https://i1.sndcdn.com/artworks-Z8AyljiXPrMSNaPb-ecOERw-t500x500.jpg";
    var userEmail = "userName.cscc01@email.com";
    var userPhone = "+1 000-0000-0000";
    var description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    var show = true;
    return (
        <div class="bigContainer">                   
            <div><EditButton show={show}/></div>
            <div class="topContainer">
                <div class="nameCard"><NameCard
                    userName={userName}
                    profilePic={profilePic}
                    userEmail={userEmail}
                    userPhone={userPhone}/></div>
                <div class="align-self-center flex-grow-1">
                    <div><InfoCard info={description}/></div>
                </div>
            </div>
            <div class="bottomContainer">
                <div class="lessonMargin">
                    <LessonBoard/>
                </div>
                <div class="postBoard">
                    <h2>Posts:</h2>
                    <PostBoard/>
                </div>
                
            </div>
        </div>

    );
}

const EditButton = ({show}) => {
    if(show === true) {
        return (
            <div >
                <a href="/profile_edit" button class="btn">Edit</a>
            </div>
        )
    } else {
        return(<div></div>)
    }
}

const NameCard = ({userName, userPhone, profilePic, userEmail}) => {

    return (
        <div class="nameCard">
            <div class="p-2 align-self-center">
                <img class="profilePicture"
                    src={profilePic}
            />
            </div>
            <div class="p-2 align-self-center">
                <h4 class="userName">{userName}</h4>
                <h5>{userEmail} | {userPhone}</h5>
                <div class="d-flex">
                    <button class="btn message text-uppercase btn-block">message</button>
                    <button class="btn follow text-uppercase btn-block">follow</button>
                </div>
                
            </div>
        </div>
    )

}

const InfoCard = ({info}) => {
    return (
        <div class="infoCard">
            <div class="d-flex flex-column align-self-md-center">
                <h5>{info}</h5>
            </div>
        </div>

    )
}


const PostBoard = () => {
    return(
        <div>
            <BlogPost/>
            <BlogPost/>
            <BlogPost/>
        </div>

    )
}

const BlogPost = () => {
    return (
       <div class="card">
           <h5>Personal blogs. "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</h5>
       </div> 
    )
}


const LessonBoard = () => {
    var courses = ["Course 1", "Course 2"];
    return (
        <div>
            <div class="card">
                <h4>Currently learning:</h4>
                <div class="lessonBoard">
                    {courses.map(course => <pre>{course}, </pre>)}
                </div> 
            </div>

        </div>

    )
}

const CompanyMembers = () => {
    return(
        <div class="d-flex flex-row">
            

        </div>
    )
}

export default ProfileFrame