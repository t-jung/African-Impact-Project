import { Typography, Avatar } from '@material-ui/core'
import React from 'react'
import './ProfileFrame.css'
import './CompanyEmployee.css'
import styles from '../styles'
import { withStyles } from '@material-ui/core/styles';

const adminList = [
    {
        name: 'Bob',
        img: 'B'
    },
    {
        name: 'Hope',
        img: 'H'
    }
]

const employeeList = [
    {
        name: 'Tims',
        img: 'T'
    },
    {
        name: 'Hortons',
        img: 'H'
    },
    {
        name: 'Wendy',
        img: 'W'
    },
    {
        name: 'King',
        img: 'K'
    }
]

const StyledTypography = (withStyles({
    root: {
        color: styles.palette.primary.main,
        fontWeight: 600,
        fontSize: 18,
        marginLeft: 20
    },
}))(Typography);


const Employee = (props) => {
    let list = props.list;
    return(
        <div class="employeeList">
            {list.map(item => (
                <div class="singleEmployee">
                    <Avatar>{item.img}</Avatar>
                    <Typography>{item.name}</Typography>
                </div>
            ))};
        </div>
    );
}

const EmployeePage = () => {
    return(
        <div class="formContainer">
            <Typography style={{
                    color: styles.palette.primary.main,
                    fontWeight: 900,
                    fontSize: 30,
                }}>Employees</Typography><br/>
                <StyledTypography>Admin</StyledTypography>
                <Employee list={adminList}/>
                <StyledTypography>Employee</StyledTypography>
                <Employee list={employeeList}/>
        </div>
    );
}

export default EmployeePage