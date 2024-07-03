import React from 'react'
import { ProgressBar } from 'react-loader-spinner'
import css from "./Loader.module.css"

const Loader = () => {
  return (
    <div className={css.loaderWrapper}>
       <ProgressBar
  height="80"
  width="80"
  ariaLabel="progress-bar-loading"
  wrapperStyle={{}}
  wrapperClass="progress-bar-wrapper"
  borderColor = '#5c059e80'
  barColor = '#1705a3'
/></div>
  )
}

export default Loader