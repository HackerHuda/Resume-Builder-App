import React, { useEffect, useState } from 'react'
import styles from "./Editor.module.css"
import {X} from "react-feather"
import InputControl from '../InputControl/InputControl'

export default function Editor(props) {
    
    const sections= props.sections
    const information= props.information

    const [activeSection, setActiveSection]= useState(
        Object.keys(sections)[0]
    )
    const [activeInformation, setActiveInformation] = useState(
        information[sections[Object.keys(sections)[0]]]
      );
    const [activeIndex,setActiveIndex]=useState(0);
    const [sectionTitle, setSectionTitle]=useState(
        sections[Object.keys(sections)[0]]
    )
    const [values, setValues] = useState({
        name: activeInformation?.detail?.name || "",
        title: activeInformation?.detail?.title || "",
        linkedin: activeInformation?.detail?.linkedin || "",
        github: activeInformation?.detail?.github || "",
        phone: activeInformation?.detail?.phone || "",
        email: activeInformation?.detail?.email || "",
      });
    const handleSubmission=()=>{
        switch(sections[activeSection]){
            case sections.basicInfo:
            {
                const tempDetail={
                    name:values.name,
                    title:values.title,
                    phone:values.phone,
                    email:values.email,
                    linkedin:values.linkedin,
                    github:values.github,
                }
                props.setInformation(prev=>({...prev,[sections.basicInfo]
                :{...prev[sections.basicInfo],
                detail:tempDetail,
                sectionTitle
                }
            }))
            break;
            }
            case sections.workExp:
            {
                const tempDetail={
                    companyName:values.companyName,
                    title:values.title,
                    location:values.location,
                    certiLink:values.certiLink,
                    startDate:values.startDate,
                    endDate:values.endDate,
                    points:values.points
                }
                const tempDetails =[ ...information[sections.workExp]?.details]
                tempDetails[activeIndex] = tempDetail

                props.setInformation((prev)=>({...prev,[sections.workExp]
                :{...prev[sections.workExp],
                details:tempDetails,
                sectionTitle
                }
            }))
            break;
            }
            case sections.project:
            {
                const tempDetail={
                    deployed:values.deployed,
                    title:values.title,
                    overview:values.overview,
                    github:values.github,
                    points:values.points
                }
                const tempDetails =[ ...information[sections.project]?.details]
                tempDetails[activeIndex] = tempDetail
                
                props.setInformation((prev)=>({...prev,[sections.project]
                :{...prev[sections.project],
                details:tempDetails,
                sectionTitle
                }
            }))
            break;
            }
            case sections.education:
            {
                const tempDetail={
                    title:values.title,
                    collegeName:values.collegeName,
                    startDate:values.startDate,
                    endDate:values.endDate
                }
                const tempDetails =[ ...information[sections.education]?.details]
                tempDetails[activeIndex] = tempDetail
                
                props.setInformation((prev)=>({...prev,[sections.education]
                :{...prev[sections.education],
                details:tempDetails,
                sectionTitle
                }
            }))
            break;
            }
            case sections.achievements:
            {
                const tempPoints= values.points
                props.setInformation((prev)=>({...prev,[sections.achievements]
                :{...prev[sections.achievements],
                points:tempPoints,
                sectionTitle
                }
            }))
            break;
            }
            case sections.summary:
            {
                const tempDetail=values.summary
                props.setInformation((prev)=>({...prev,[sections.summary]
                :{...prev[sections.summary],
                detail:tempDetail,
                sectionTitle
                }
            }))
            break;
            }
            case sections.other:
            {
                const tempDetail=values.other
                props.setInformation((prev)=>({...prev,[sections.other]
                :{...prev[sections.other],
                detail:tempDetail,
                sectionTitle
                }
            }))
            break;
            }
        }
    }
    const handlePointUpdate=(value,index)=>{
        const tempValues = {...values};
        if(!Array.isArray(tempValues.points)) 
            tempValues.points=[];
        tempValues.points[index]=value;
        setValues(tempValues)
    }
    
    const basicInfoBody=(
        <div className={styles.detail}>
            <div className={styles.row}>
                <InputControl 
                    label="Name"
                    placeholder="Enter your Name"
                    value={values.name}
                    onChange={(ev)=>setValues(
                        (prev)=>({...prev, name:ev.target.value})
                    )}
                />
                <InputControl 
                    label="Title"
                    placeholder="Enter the role you prefer"
                    value={values.title}
                    onChange={(ev)=>setValues(
                        (prev)=>({...prev, title:ev.target.value})
                    )}
                />
            </div>
            <div className={styles.row}>
                <InputControl 
                    label="Email"
                    placeholder="Enter email address"
                    value={values.email}
                    onChange={(ev)=>setValues(
                        (prev)=>({...prev, email:ev.target.value})
                    )}
                />
                <InputControl 
                    label="Phone"
                    placeholder="Enter Phone number"
                    value={values.phone}
                    onChange={(ev)=>setValues(
                        (prev)=>({...prev, phone:ev.target.value})
                    )}
                />
            </div>
            <div className={styles.row}>
                <InputControl 
                    label="LinkedIn Link"
                    placeholder="Enter link"
                    value={values.linkedin}
                    onChange={(ev)=>setValues(
                        (prev)=>({...prev, linkedin:ev.target.value})
                    )}
                />
                <InputControl 
                    label="Github Link"
                    placeholder="Enter link"
                    value={values.github}
                    onChange={(ev)=>setValues(
                        (prev)=>({...prev, github:ev.target.value})
                    )}
                />
            </div>
        </div>
    )
    const workExpBody=(
        <div className={styles.detail}>
            <div className={styles.row}>
                <InputControl 
                    label="Title"
                    placeholder="Eg Data scientist"
                    value={values.title}
                    onChange={(ev)=>setValues(
                        (prev)=>({...prev, title:ev.target.value})
                    )}
                />
            </div>
            <div className={styles.row}>
                <InputControl 
                    label="Organisation Name"
                    placeholder=""
                    value={values.companyName}
                    onChange={(ev)=>setValues(
                        (prev)=>({...prev, companyName:ev.target.value})
                    )}
                />
            </div>
            <div className={styles.row}>
                <InputControl 
                    label="Certificate Link"
                    placeholder=""
                    value={values.certiLink}
                    onChange={(ev)=>setValues(
                        (prev)=>({...prev, certiLink:ev.target.value})
                    )}
                />
            </div>
            <div className={styles.row}>
                <InputControl 
                    label="Location"
                    placeholder="Enter location of work place"
                    value={values.location}
                    onChange={(ev)=>setValues(
                        (prev)=>({...prev, location:ev.target.value})
                    )}
                />
            </div>
            <div className={styles.row}>
                <InputControl 
                    label="Start date"
                    type="date"
                    placeholder=""
                    value={values.startDate}
                    onChange={(ev)=>setValues(
                        (prev)=>({...prev, startDate:ev.target.value})
                    )}
                />
                <InputControl 
                    label="End date"
                    type="date"
                    placeholder=""
                    value={values.endDate}
                    onChange={(ev)=>setValues(
                        (prev)=>({...prev, endDate:ev.target.value})
                    )}
                />
            </div>
            
            <div className={styles.column}>
                <label>Enter work description</label>
                <InputControl placeholder="Work 1"
                value={values.points?values.points[0]: ""}
                onChange={(ev)=>handlePointUpdate(ev.target.value,0)}/>
                <InputControl placeholder="Work 2"
                value={values.points?values.points[1]: ""}
                onChange={(ev)=>handlePointUpdate(ev.target.value,1)}/>
                <InputControl placeholder="Work 3"
                value={values.points?values.points[2]: ""}
                onChange={(ev)=>handlePointUpdate(ev.target.value,2)}/>
            </div>
        </div>
    )
    const projectBody=(
        <div className={styles.detail}>
            <div className={styles.row}>
                <InputControl 
                    label="Title"
                    placeholder="Eg Resume builder App"
                    value={values.title}
                    onChange={(ev)=>setValues(
                        (prev)=>({...prev, title:ev.target.value})
                    )}
                />
                <InputControl 
                    label="Overview of Project"
                    placeholder="platform and language used and functionalities"
                    value={values.overview}
                    onChange={(ev)=>setValues(
                        (prev)=>({...prev, overview:ev.target.value})
                    )}
                />
            </div>
            <div className={styles.row}>
                <InputControl 
                    label="Deployed Link"
                    placeholder="Enter a valid deployed Link"
                    value={values.deployed}
                    onChange={(ev)=>setValues(
                        (prev)=>({...prev, deployed:ev.target.value})
                    )}
                />
                <InputControl 
                    label="Github Link"
                    placeholder="Github Repo link"
                    value={values.github}
                    onChange={(ev)=>setValues(
                        (prev)=>({...prev, github:ev.target.value})
                    )}
                />
            </div>
            <div className={styles.column}>
                <label>Enter project description</label>
                <InputControl placeholder="project 1"
                value={values.points?values.points[0]: ""}
                onChange={(ev)=>handlePointUpdate(ev.target.value,0)}/>
                <InputControl placeholder="project 2"
                value={values.points?values.points[1]: ""}
                onChange={(ev)=>handlePointUpdate(ev.target.value,1)}/>
                <InputControl placeholder="project 3"
                value={values.points?values.points[2]: ""}
                onChange={(ev)=>handlePointUpdate(ev.target.value,2)}/>
                <InputControl placeholder="project 4"
                value={values.points?values.points[3]: ""}
                onChange={(ev)=>handlePointUpdate(ev.target.value,3)}/>
            </div>
        </div>
    )
    const eduBody=(
        <div className={styles.detail}>
            <div className={styles.row}>
                <InputControl 
                    label="Title"
                    placeholder="Degree/Qualification"
                    value={values.title}
                    onChange={(ev)=>setValues(
                        (prev)=>({...prev, title:ev.target.value})
                    )}
                />
                <InputControl 
                    label="University/College name"
                    placeholder="Enter name of your college"
                    value={values.collegeName}
                    onChange={(ev)=>setValues(
                        (prev)=>({...prev, collegeName:ev.target.value})
                    )}
                />
            </div>
            <div className={styles.row}>
                <InputControl 
                    label="Start date"
                    type="date"
                    placeholder=""
                    value={values.startDate}
                    onChange={(ev)=>setValues(
                        (prev)=>({...prev, startDate:ev.target.value})
                    )}
                />
                <InputControl 
                    label="End date"
                    type="date"
                    placeholder=""
                    value={values.endDate}
                    onChange={(ev)=>setValues(
                        (prev)=>({...prev, endDate:ev.target.value})
                    )}
                />
            </div>
        </div>
    )
    const achievementsBody=(
        <div className={styles.detail}>
            <div className={styles.column}>
                <label>Enter your achievements</label>
                <InputControl placeholder="achievement 1"
                value={values.points?values.points[0]: ""}
                onChange={(ev)=>handlePointUpdate(ev.target.value,0)}/>
                <InputControl placeholder="achievement 2"
                value={values.points?values.points[1]: ""}
                onChange={(ev)=>handlePointUpdate(ev.target.value,1)}/>
                <InputControl placeholder="achievement 3"
                value={values.points?values.points[2]: ""}
                onChange={(ev)=>handlePointUpdate(ev.target.value,2)}/>
                <InputControl placeholder="achievement 4"
                value={values.points?values.points[3]: ""}
                onChange={(ev)=>handlePointUpdate(ev.target.value,3)}/>
            </div>
        </div>
    )
    const summaryBody =(
        <div className={styles.detail}>
            <InputControl 
                label="Summary"
                value={values.summary}
                onChange={(ev)=>setValues(
                    (prev)=>({...prev, summary:ev.target.value})
                )}
            />
        </div>
    )
    const otherBody =(
        <div className={styles.detail}>
            <InputControl 
                label="Other"
                placeholder="Enter Additional details..."
                value={values.other}
                onChange={(ev)=>setValues(
                    (prev)=>({...prev, other:ev.target.value})
                )}
            />
        </div>
    )
    const generateBody=()=>{
        switch(sections[activeSection]){
            case sections.basicInfo:
                return basicInfoBody;
            case sections.workExp: 
                return workExpBody;
            case sections.project: 
                return projectBody;
            case sections.education: 
                return eduBody;
            case sections.achievements: 
                return achievementsBody;
            case sections.summary: 
                return summaryBody;
            case sections.other: 
                return otherBody;
            default:
                return null;
        }
    };

    useEffect(()=>{
        const activeInfo = information[sections[activeSection]];
        setActiveInformation(activeInfo);
        setSectionTitle(sections[activeSection]);
        setActiveIndex(0);
        setValues({
          name: activeInfo?.detail?.name || "",
          overview: activeInfo?.details
            ? activeInfo.details[0]?.overview || ""
            : "",
          deployed: activeInfo?.details ? activeInfo.details[0]?.deployed || "" : "",
          certiLink: activeInfo?.details
            ? activeInfo.details[0]?.certiLink || ""
            : "",
          companyName: activeInfo?.details
            ? activeInfo.details[0]?.companyName || ""
            : "",
          collegeName: activeInfo?.details
            ? activeInfo.details[0]?.collegeName || ""
            : "",
          location: activeInfo?.details
            ? activeInfo.details[0]?.location || ""
            : "",
          startDate: activeInfo?.details
            ? activeInfo.details[0]?.startDate || ""
            : "",
          endDate: activeInfo?.details 
            ? activeInfo.details[0]?.endDate || "" 
            : "",
          points: activeInfo?.details
            ? activeInfo.details[0]?.points
              ? [...activeInfo.details[0]?.points]
              : ""
            : activeInfo?.points
            ? [...activeInfo.points]
            : "",
          title: activeInfo?.details
            ? activeInfo.details[0]?.title || ""
            : activeInfo?.detail?.title || "",
          phone: activeInfo?.detail?.phone || "",
          email: activeInfo?.detail?.email || "",
          linkedin: activeInfo?.detail?.linkedin || "",
          github: activeInfo?.details
            ? activeInfo.details[0]?.github || ""
            : activeInfo?.detail?.github || "",
          summary:typeof activeInfo?.detail!== "object"?activeInfo.detail:"",
          other:typeof activeInfo?.detail!== "object"?activeInfo.detail:"" ,
        })
    },[activeSection,information,sections])

    useEffect(()=>{
        setActiveInformation(information[sections[activeSection]])
    })

    useEffect(() => {
        const details = activeInformation?.details;
        if (!details) return;
    
        const activeInfo = information[sections[activeSection]];
        setValues({
          overview: activeInfo.details[activeIndex]?.overview || "",
          deployed: activeInfo.details[activeIndex]?.deployed || "",
          certiLink:
            activeInfo.details[activeIndex]?.certiLink || "",
          companyName: activeInfo.details[activeIndex]?.companyName || "",
          location: activeInfo.details[activeIndex]?.location || "",
          startDate: activeInfo.details[activeIndex]?.startDate || "",
          endDate: activeInfo.details[activeIndex]?.endDate || "",
          points: activeInfo.details[activeIndex]?.points || "",
          title: activeInfo.details[activeIndex]?.title || "",
          linkedin: activeInfo.details[activeIndex]?.linkedin || "",
          github: activeInfo.details[activeIndex]?.github || "",
          college: activeInfo.details[activeIndex]?.college || "",
        });
      }, [activeIndex]);
      
    const handleDeleteDetail = (index) => {
        const details = activeInformation?.details
          ? [...activeInformation?.details]
          : "";
        if (!details) return;
        details.splice(index, 1);
        props.setInformation((prev) => ({
          ...prev,
          [sections[activeSection]]: {
            ...information[sections[activeSection]],
            details: details,
          },
        }));
    
        setActiveIndex((prev) => (prev === index ? 0 : prev - 1));
      };
    const handleAddNew=()=>{
        const details =activeInformation?.details;
        if (!details) return;
        const lastDetail = details.slice(-1)[0]
        if (!Object.keys(lastDetail).length) return;
        details?.push({})
        props.setInformation(prev=>({
            ...prev, 
            [sections[activeSection]]:{
                ...information[sections[activeSection]],
                details:details,
            }
        }))
        setActiveIndex(details?.length-1)
    }
    
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {Object.keys(sections)?.map((key)=>
            <div className={`${styles.section} ${activeSection===key? styles.active : ""} `}
                key={key} 
                onClick={()=> setActiveSection(key)}>
                {sections[key]}
            </div>)}
      </div>
      <div className={styles.body}>
        <InputControl 
            label="Title" 
            placeholder='Enter the section title'
            value={sectionTitle}
            onChange={(event)=>setSectionTitle(event.target.value)}
        />
        <div className={styles.chips}>
            {activeInformation?.details 
            ?activeInformation?.details?.map((item,index)=>(
                <div 
                    className={`${styles.chip} ${
                    activeIndex === index ? styles.active: ""
                    }`} 
                    key={item.title+index}
                    onClick={()=>setActiveIndex(index)}
                    >
                    <p>{sections[activeSection]} {index+1}</p>
                    <X
                         onClick={(event) => {
                            event.stopPropagation();
                            handleDeleteDetail(index);
                          }}
                    />
                </div>))
            :""
            }
            {
                activeInformation?.details && activeInformation?.details?.length>0
                ?(<div className={styles.new} onClick={handleAddNew}>+New</div>):""
            }
            
        </div>
        {generateBody()}

        <button onClick={handleSubmission}>Save</button>
      </div>
    </div>
  )
}
