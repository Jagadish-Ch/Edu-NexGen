import React from 'react'
import { OrbitProgress } from 'react-loading-indicators'
import "@/App.css";

const spinner = () => {
  return (
    <div className='loader-bg'>
      <div style={{position: "relative"}}>
        <OrbitProgress color="gold" size="large" text="Loading..." textColor="gold" />
      </div>
    </div>
  )
}

export default spinner
