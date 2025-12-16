import React, { useContext } from 'react'
import { Commet } from 'react-loading-indicators'
// import { useDarkMode } from '@/context/dark-mode-context/DarkModeContext';
import "@/App.css";

const CommetLoader = () => {
  return (
    <div className='loader-bg bg '>
      <div style={{position: "relative"}}>
        <Commet color="#111827" size="large" text="Loading..." textColor="#111827" />
      </div>
    </div>
  )
}

export default CommetLoader
