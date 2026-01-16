import React, { useContext } from "react";
import styles from "./SideBar.module.css"
import ArticleIcon from '@mui/icons-material/Article';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import {Link,useLocation ,useNavigate}  from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";
 

const SideBar=()=>{
const location=useLocation();
const navigate=useNavigate();

console.log(location);

const {login, setLogin, userInfo, setUserInfo}=useContext(AuthContext);
const  handleLogOut =()=>{
    localStorage.clear();
    setLogin(false);
    setUserInfo(null);
    navigate('/');
}

    return <div className={styles.sidebar}>
        <div className={styles.sidebarIcon}>
            <ArticleIcon sx={{fontSize:54,marginBottom:2}}/>
            <div className={styles.sidebarTopContent}>Resume Screening</div>
        </div>

        <div className={styles.sidebarOptionsBlock}>
            <Link  to={"/dashboard"}className={[styles.sidebarOptions,location.pathname==='/dashboard'?styles.selectedOption:null].join(' ')}>
                <DashboardIcon sx={{fontSize:22}}/>
                <div>Dashboard</div>
            </Link>

            <Link to={"/history"}className={[styles.sidebarOptions ,location.pathname==='/history'? styles.selectedOption:null].join(' ')}>
                <HistoryIcon sx={{fontSize:22}}/>
                <div>History</div>
            </Link>

            {
                userInfo?.role==='admin' && <Link to={"/admin"} className={[styles.sidebarOptions ,location.pathname==='/admin'? styles.selectedOption:null].join(' ')}>
                <SupervisorAccountIcon sx={{fontSize:22}}/>
                <div>Admin</div>
            </Link>
            }

            <div  onClick={handleLogOut} className={styles.sidebarOptions}>
                <LogoutIcon sx={{fontSize:22}}/>
                <div>Log Out</div>
            </div>

        </div>
    </div>
}
export default SideBar