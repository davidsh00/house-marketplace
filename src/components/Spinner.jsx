import React from 'react'
import spinner from '../styles/spinner.module.css'
import {FaSpinner}from 'react-icons/fa'
function Spinner() {
  return (
    <div className={spinner.container}>
        <div className={spinner.spinner}>
            <FaSpinner />
        </div>
    </div>
  )
}

export default Spinner