
import './AdminPage.css'

const AdminPage = () => {
    return (
        <div>
            <div class="page">
                <div class="header">
                    <h2>Administrator Page</h2>
                <div class = "navButtons">
                <button class="btn text-uppercase">View User List</button>
                <button class="btn text-uppercase">View Banned Users</button>
                <button class="btn text-uppercase">Return to Main View</button>
                <button class="btn text-uppercase">Log Out</button>
                </div>
                </div>
            </div>
            <div class="d-flex d-column">
            <div class="pendingVerification">
                        <PendingBoard/>
                    </div>
            <div class="reports">
                <ReportBoard/>
            </div>
                    </div>
            
                </div>

    );
}


const PendingBoard = () => {
    return (
        <div>
            <div class="pendingBoard card">
                <h4>Pending Verification:</h4>
                <a href = "Wcdonalds">Wcdonalds - Company</a>
                <a href ="Musk Elon">Musk Elon - Investor</a>
            </div> 
        </div>

    )
}

const ReportBoard = () => {
    return (
        <div>
            <div class = "ReportBoard card">
                <h3>Pending Reports by User:</h3>
                <dt>Report from Paul Logan#1 to Paul Jake#1</dt>
                <dd>This guy is pretending to be my brother! Ban him!</dd>
                <dt>Report from Manav Patel#1 to Manav Patel#125</dt>
                <dd>I am the true manav. Please ban this person thank you sir.</dd>
                <dt>Report from Lorem#22 to ipsum#33</dt>
                <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum accumsan purus vel sollicitudin. Ut eu nibh massa. In consequat sagittis enim, sed gravida lectus aliquet non. Nulla in eros sed quam tempor euismod. Curabitur libero dolor, hendrerit vel pharetra at, venenatis sed elit. Fusce venenatis dolor et lacinia volutpat. Integer id nulla eget est ultrices porta. Ut fermentum ipsum efficitur tincidunt fringilla. Proin sollicitudin tristique nulla sit amet hendrerit. Nulla vel sem vitae enim placerat eleifend. Ut ac metus eu justo finibus posuere vel sed massa. Pellentesque ante magna, convallis vel dictum sed, dictum eget ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut lacinia ut dui et ullamcorper. Donec a eros nibh. Integer vulputate tortor pellentesque, posuere nisl sit amet, eleifend ligula.</dd>
                
            </div>
        </div>
    )

}
export default AdminPage