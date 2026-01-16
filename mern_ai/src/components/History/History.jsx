import React, { useState ,useEffect, useContext} from 'react';
import withAuthHOC from "../../utils/HOC/withAuthHOC";
import styles from './History.Module.css'
import Skeleton from '@mui/material/Skeleton';
import axios from "../../utils/axios";
import { AuthContext } from '../../utils/AuthContext';

const History = () => {
     const [data ,setData]=useState([]);
     const[loader,setLoader]=useState(false);
     const {userInfo} =useContext(AuthContext);

     useEffect(()=>{
          const fetchUserData= async ()=>{
               setLoader(true);
               try{
                    const results= await axios.get(`/api/resume/get/${userInfo?._id}`);
                    console.log(results.data.resumes);
                    setData(results.data.resumes);
               }catch(err){
                    console.log(err);
                    alert("Something Went Wrong");
               }
               finally{
                    setLoader(false);
               }
          }
          fetchUserData();
     },[])
          
     

  return (

    <div className={styles.History}>
      <div className={styles.HistoryCardBlock}>
{
       loader && <>
       <Skeleton variant='rectangular' sx={{borderRadius:"20px"}} width={280} height={280}/>
       <Skeleton variant='rectangular' sx={{borderRadius:"20px"}} width={280} height={280}/>
       <Skeleton variant='rectangular' sx={{borderRadius:"20px"}} width={280} height={280}/>
       </>
     
}
        {
          data.map((item,index)=>{
               return (
                    <div key={item._id} className={styles.HistoryCard}>
                         <div className={styles.cardPercentage}>{item.score}%</div>
                              {/* <h2></h2> */}
                              <p>Resume name:{item.resume_name}</p>
                              <p>{item.feedback}</p>
                              <p>Dated:{item.createdAt.slice(0,10)}</p>
                         </div>
               );
          })
        }
      </div>
     </div>
  )
}

export default withAuthHOC(History)

