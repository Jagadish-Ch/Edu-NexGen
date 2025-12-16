import React from 'react'
import { FourSquare } from 'react-loading-indicators'
import "@/App.css";

const FoutSquareLoader = () => {
  return (
   <div className='loader-bg'>
      <div style={{position: "relative"}}>
        <FourSquare color="gold" size="large" text="Loading..." textColor="gold" />
      </div>
    </div>
  )
}

export default FoutSquareLoader
