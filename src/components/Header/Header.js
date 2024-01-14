import React from 'react'
import styles from "./Header.module.css"
import resumeSVG from "../../assets/resume.svg"

function Header(){
  return (
    <div className={styles.container}>
      <div className='left'>
        <p className={styles.heading}>Easy <span>Resume</span> in few minutes</p>
        <p className={styles.heading}>Make your own resume.<span>For FREE!!!</span></p>
      </div>
      <div className='right'>
        <img src={resumeSVG} alt="Resume"/>
      </div>
    </div>
  )
}

export default Header
