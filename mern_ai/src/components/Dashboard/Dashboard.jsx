import React, { useContext, useState } from 'react';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import styles from './Dashboard.Module.css'
import Skeleton from '@mui/material/Skeleton';
import withAuthHOC from "../../utils/HOC/withAuthHOC";
import axios from "../../utils/axios"
import { AuthContext } from '../../utils/AuthContext';

const Dashboard = () => {
  const [uploadFileText,setUploadFileText]=useState("Upload Your Resume");
  const [loading ,setLoading]=useState(false);
  const [resumeFile,setResumeFile]=useState(null);
  const [jobDesc,setJobDesc]=useState("");
  const [result ,setResult]=useState(null);
  const {userInfo}=useContext(AuthContext);

  const handleChangeFile=(e)=>{
    setResumeFile(e.target.files[0]);
    setUploadFileText(e.target.files[0].name);
  }

  const handleUpload =async()=>{
    setResult(null);
     if(!jobDesc || !resumeFile){
      alert("Please fill Job Description and upload resume");
      return;
     }
     const formData =new FormData();
     formData.append("resume",resumeFile);
     formData.append("job_desc",jobDesc);
     formData.append("user",userInfo._id);
     setLoading(true);
     try{
     const result = await axios.post("/api/resume/addResume",formData);
     setResult(result.data.data);
           
     }catch(err){
      console.log(err);
     }
     finally{
      setLoading(false);
     }

  }

  return (
    <div className={styles.Dashboard}>
      <div className={styles.DashboardLeft}>

         <div className={styles.DashboardHeader}>
           <div className={styles.DashboardHeaderTitle}> Smart Resume Screening</div>
           <div className={styles.DashboardHeaderLargeTitle}> Resume Match Score</div>
         </div>

         <div className={styles.alertInfo}>
               <div>⚠️ Important Instructions</div>
               <div className={styles.dashboardInstructions}>
                  <div> 📋Please Paste the complete Job description in "Job Description Field" Before Submitting</div>
                  <div> 🔗Only PDF Format (.pdf) resumes are accepted</div>
                </div>
        </div>

        <div className={styles.dashboardUploadResume}>
                <div className={styles.dashboardResumeBlock}>{uploadFileText}</div>
                <div className={styles.dashboardInputField}>
               <label htmlFor='inputField' className={styles.analyzeBtn}>Upload Resume</label>
               <input type='file' accept='.pdf' id='inputField' onChange={handleChangeFile}/>
        </div>
        </div>

        <div className={styles.jobDesc}>
          <textarea value={jobDesc} onChange={(e)=>{setJobDesc(e.target.value)}} className={styles.textArea} placeholder='paste Job Description Here'></textarea>
          <div className={styles.AnalyzeBtn}  onClick={handleUpload}>Analyze</div>
         </div>

       

        </div>

      <div className={styles.DashboardRight}>
        <div className={styles.DashboardRightTopCard}>
        <div>Analyzed With AI</div>
        <img className={styles.profileImage}   alt='profile'src={userInfo?.photoUrl}/>
        <h2>{userInfo?.name}</h2>
        </div>

         
        {
          result && <div className={styles.DashboardRightTopCard}>
          <div>Result</div>
  
          <div className={styles.percentResult}>
            <h1>{result?.score}%</h1>
            <CreditScoreIcon sx={{fontSize:22}}/>
            
          </div>
  
          <div className={styles.feedback}>
            <h3>Feedback</h3>
            <p>{result ?.feedback}</p>
            </div>
          </div> 
        }
      {
        loading && <Skeleton variant='rectangular' sx={{borderRadius:"20px"}} width={280} height={280}/>
         
      }
      </div>
      </div>
  )
}

export default withAuthHOC(Dashboard)

