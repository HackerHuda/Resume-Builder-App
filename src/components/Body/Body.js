import React, { useRef, useState } from 'react'
import styles from "./Body.module.css"
import ReactToPrint from 'react-to-print'
import {Download} from "react-feather"
import Editor from '../Editor/Editor';
import Resume from '../Resume/Resume';

function Body() {
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#b22db2'];
    const sections ={
      basicInfo:"Basic Info",
      workExp:"Work Experience",
      project:"Projects",
      education:"Education",
      achievements:"Achievements",
      summary:"Summary",
      other:"Other",
    }
    const [activeColor,setActiveColor]=useState(colors[0])
    const resumeRef=useRef()
    const [userCurrentInfo, setUserCurrentInfo]= useState({
      [sections.basicInfo]:{
        id: sections.basicInfo,
        sectionTitle:sections.basicInfo,
        detail:{},
      },
      [sections.workExp]:{
        id: sections.workExp,
        sectionTitle:sections.workExp,
        details:[],
      },
      [sections.project]:{
        id: sections.project,
        sectionTitle:sections.project,
        details:[],
      },
      [sections.education]:{
        id: sections.education,
        sectionTitle:sections.education,
        details:[],
      },
      [sections.achievements]:{
        id: sections.achievements,
        sectionTitle:sections.achievements,
        points:[],
      },
      [sections.summary]:{
        id: sections.summary,
        sectionTitle:sections.summary,
        detail:"",
      },
      [sections.other]:{
        id: sections.other,
        sectionTitle:sections.other,
        detail:"",
      },

    })
    
  return (
    <div className={styles.container}>
      <p className={styles.heading}>Resume Builder App</p>
      <div className={styles.toolbar}>
        <div className={styles.colors}>
            {
                colors.map((item)=>(
                    <span
                    key={item}
                    style={{backgroundColor:item}}
                    className={`${styles.color} ${activeColor===item?styles.activeColor:""}`}
                    onClick={()=>setActiveColor(item)}/>
                    ))
            }
        </div>
        <ReactToPrint
          trigger={() => {
            return (
              <button>
                Download <Download />
              </button>
            );
          }}
          content={() => resumeRef.current}
        />
      </div>
      <div className={styles.main}>
            <Editor 
              sections={sections} 
              information={userCurrentInfo}
              setInformation={setUserCurrentInfo}
            />
            <Resume
            ref={resumeRef}
              sections={sections} 
              information={userCurrentInfo}
              activeColor={activeColor}
            />
      </div>
    </div>
  )
}

export default Body
