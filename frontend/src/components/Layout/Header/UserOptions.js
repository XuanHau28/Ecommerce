import React, { Fragment, useState } from 'react';
import {SpeedDial, SpeedDialAction} from '@material-ui/lab';
import { Backdrop } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListAltIcon from '@material-ui/icons/ListAlt';   
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';
import { useDispatch } from 'react-redux';

const UserOptions = ({ user }) => {
    
    const [open, setOpen] = useState(false);

    const history = useHistory();

    const alert = useAlert();

    const dispatch = useDispatch();

    const options = [
        {icon: <ListAltIcon />, name: "Orders", func: orders},
        {icon: <PersonIcon />, name: "Profile", func: account},
        {icon: <ExitToAppIcon />, name: "Logout", func: logoutUser},
    ]

    if(user.role === "admin") {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard
        });
    }

    function dashboard() {
        history.push("/dashboard");
    };

    function orders () {
        history.push("/orders");
    };

    function account() {
        history.push("/profile");
    };

    function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfully");
    }

  return (
    <Fragment>
        <Backdrop open={open} className="z-11" />
        <SpeedDial
        className='fixed right-[3vmax] top-[2.5vmax]'
        ariaLabel='Speedial tooltip example'
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        icon={
        <img
            className='speedDialIcon w-[54px] h-[54px] rounded-[100%]'
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile" 
            />
        }
        >
            {options.map((item) => (
                <SpeedDialAction
                key={item.name}
                icon={item.icon}
                tooltipTitle={item.name}
                onClick={item.func} />
            ))}
        </SpeedDial>
    </Fragment>
  )
}

export default UserOptions