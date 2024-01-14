import React, { forwardRef, useEffect, useRef, useState } from 'react'
import styles from './Resume.module.css'
import { Calendar, GitHub, Linkedin, Mail, MapPin, Paperclip, Phone } from 'react-feather'

const Resume=forwardRef((props,ref)=> {
    const information = props.information
    const sections =props.sections
    const containerRef=useRef()
    const info ={
        basicInfo:information[sections.basicInfo],
        workExp:information[sections.workExp],
        project:information[sections.project],
        achievements:information[sections.achievements],
        education:information[sections.education],
        summary:information[sections.summary],
        other:information[sections.other],
    }
    const getFormattedDate=(value)=>{
        if(!value)return""
        const date = new Date(value)
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
    }
    const [col,setCol]=useState([[],[]])
    const [source,setSource]= useState("")
    const [target,setTarget]= useState("")
    const secDiv={
        [sections.workExp]:
        <div key={"workexp"} draggable onDragOver={()=>setTarget(info.workExp?.id)} onDragEnd={()=>setSource(info.workExp?.id)} className={`${styles.section} ${info.workExp?.sectionTitle?"":styles.hidden}`}>
            <div className={styles.sectionTitle}>{info.workExp.sectionTitle}</div>
            <div className={styles.content}>
                {
                    info.workExp?.details?.map((item)=>(
                        <div className={styles.item} key={item.title}>
                            {
                                item.title &&(
                                <p className={styles.title}>
                                    {item.title}
                                </p>)
                            }
                            {
                                item.companyName &&(
                                <p className={styles.subTitle}>
                                    {item.companyName}
                                </p>)
                            }
                            {
                                item.certiLink && (
                                    <a className={styles.certiLink} href={item.certiLink}>
                                        <Paperclip/> {item.certiLink}
                                    </a>
                                )
                            }
                            {
                                item.startDate && item.endDate?(
                                    <div className={styles.date}>
                                        <Calendar/>{getFormattedDate(item.startDate)}-{getFormattedDate(item.endDate)}
                                    </div>
                                ):""
                            }
                            {
                                item.location && (
                                    <a className={styles.location}>
                                        <MapPin/> Remote
                                    </a>
                                )
                            }
                            {
                                item.points?.length>0 &&(
                                    <ul className={styles.points}>
                                        {
                                            item.points?.map((ele,index)=>(
                                                <li className={styles.point} key={ele+index}>
                                                    {ele}
                                                </li>
                                            ))
                                        }  
                                    </ul>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </div>,
        [sections.education]:
        <div key={"education"} draggable onDragOver={()=>setTarget(info.education?.id)} onDragEnd={()=>setSource(info.education?.id)} className={`${styles.section} ${info.education?.sectionTitle?"":styles.hidden}`}>
            <div className={styles.sectionTitle}>{info.education?.sectionTitle}</div>
            <div className={styles.content}>
                {
                    info.education?.details?.map((item)=>(
                        <div className={styles.item}>
                            {item.title && <p className={styles.title}>{item.title}</p>}
                            {item.collegeName && <p className={styles.subTitle}>{item.collegeName}</p>}
                            {
                                item.startDate && item.endDate?(
                                    <div className={styles.date}>
                                        <Calendar/>{getFormattedDate(item.startDate)}-{
                                        getFormattedDate(item.endDate)}
                                    </div>
                                ):""
                            }
                        </div>
                    ))
                }
                
            </div>
        </div>,
        [sections.project]:
        <div key={"project"} draggable onDragOver={()=>setTarget(info.project?.id)} onDragEnd={()=>setSource(info.project?.id)} className={`${styles.section} ${info.project?.sectionTitle?"":styles.hidden}`}>
            <div className={styles.sectionTitle}>{info.project.sectionTitle}</div>
            <div className={styles.content}>
                {info.project?.details?.map((item)=>(
                    <div className={styles.item}>
                        {item.title && <p className={styles.title}>{item.title}</p>}
                        {item.deployed &&<a className={styles.deployed} href={item.deployed} target="_blank" rel="noopener noreferrer">
                            <Paperclip/>{item.deployed}
                        </a>}
                        {item.github && <a className={styles.github} href={item.github} target="_blank" rel="noopener noreferrer">
                            <GitHub/>{item.github}
                        </a>}
                        {item.overview && <p className={styles.overview}>
                            {item.overview}
                        </p>}
                        {item.points?. length>0 && (<ul className={styles.points}>
                            {item.points?.map((ele,index)=>{
                                <li className={styles.point} key={ele+index}>
                                    {ele}
                                </li>
                            })}
                        </ul>)}
                    </div>
                ))}
                
            </div>
        </div>,
        [sections.achievements]:
        <div key={"achievements"} draggable onDragOver={()=>setTarget(info.achievements?.id)} onDragEnd={()=>setSource(info.achievements?.id)} className={`${styles.section} ${info.achievements?.sectionTitle?"":styles.hidden}`} >
            <div className={styles.sectionTitle}>{info.achievements?.sectionTitle}</div>
            <div className={styles.content}>
                {info.achievements?.points?.length>0 &&(
                    <ul className={styles.numbered}>
                        {info.achievements.points.map((ele,index)=>(
                            <li className={styles.point} key={ele+index}>
                                {ele}
                            </li>
                        ))
                        }  
                    </ul>
                )}
            </div>
        </div>,
        [sections.other]:
        <div key={"other"} draggable onDragOver={()=>setTarget(info.other?.id)} onDragEnd={()=>setSource(info.other?.id)} className={`${styles.section} ${info.other?.sectionTitle?"":styles.hidden}`}>
            <div className={styles.sectionTitle}>{info.other?.sectionTitle}</div>
            <div className={styles.content}>
                <div className={styles.overview}>
                    {info.other?.detail}
                </div>
            </div>
        </div>,
        [sections.summary]:
        <div key={"summary"} draggable onDragOver={()=>setTarget(info.summary?.id)} onDragEnd={()=>setSource(info.summary?.id)} className={`${styles.section} ${info.summary?.sectionTitle?"":styles.hidden}`}>
            <div className={styles.sectionTitle}>{info.summary?.sectionTitle}</div>
            <div className={styles.content}>
                <div className={styles.overview}>
                    {info.summary?.detail}
                </div>
            </div>
        </div>
    }
    const swapSourceTarget = (source, target) => {
        if (!source || !target) return;
        const tempColumns = [[...col[0]], [...col[1]]];
    
        let sourceRowIndex = tempColumns[0].findIndex((item) => item === source);
        let sourceColumnIndex = 0;
        if (sourceRowIndex < 0) {
          sourceColumnIndex = 1;
          sourceRowIndex = tempColumns[1].findIndex((item) => item === source);
        }
    
        let targetRowIndex = tempColumns[0].findIndex((item) => item === target);
        let targetColumnIndex = 0;
        if (targetRowIndex < 0) {
          targetColumnIndex = 1;
          targetRowIndex = tempColumns[1].findIndex((item) => item === target);
        }
    
        const tempSource = tempColumns[sourceColumnIndex][sourceRowIndex];
        tempColumns[sourceColumnIndex][sourceRowIndex] =
          tempColumns[targetColumnIndex][targetRowIndex];
    
        tempColumns[targetColumnIndex][targetRowIndex] = tempSource;
    
        setCol(tempColumns);
      }
    useEffect(()=>{
        setCol([
        [sections.project,sections.workExp,sections.summary],
        [sections.education,sections.achievements,sections.other]])
        },[])
    useEffect(()=>{
        swapSourceTarget(source,target)
    },[source])
    useEffect(()=>{
        const container =containerRef.current
        if(!props.activeColor|| !container)return;

        container.style.setProperty('--color',props.activeColor)
        
    },[props.activeColor])
  return (
    <div ref={ref}>
        <div ref={containerRef} className={styles.container}>
            <div className={styles.header}>
                <p className={styles.heading}>{info.basicInfo?.detail?.name}</p>
                <p className={styles.subHeading}>{info.basicInfo?.detail?.title}</p>
                <div className={styles.links}>
                    {info.basicInfo?.detail?.phone &&
                    <a className={styles.link} type='number'>
                        <Phone/>
                        {info.basicInfo?.detail?.phone}
                    </a>
                    }
                    {info.basicInfo?.detail?.email&&
                    <a className={styles.link}>
                        <Mail/>
                        {info.basicInfo?.detail?.email}
                    </a>}
                    {info.basicInfo?.detail?.linkedin&&
                    <a className={styles.link}>
                        <Linkedin/>
                        {info.basicInfo?.detail?.linkedin}
                    </a>}
                    {info.basicInfo?.detail?.github&&
                    <a className={styles.link}>
                        <GitHub/>
                        {info.basicInfo?.detail?.github}
                    </a>}
                    
                </div>
            </div>
            <div className={styles.main}>
                <div className={styles.row}>
                <div className={styles.col2}>
                    {col[0] && Array.isArray(col[0]) && col[0].map((item) => secDiv[item])}            
                </div>
                <div className={styles.col3}>
                    {col[1] && Array.isArray(col[1]) && col[1].map((item) => secDiv[item])}            
                </div>

                </div>
            </div>
        </div>
    </div>
    
  )
});
export default Resume;
