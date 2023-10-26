import React from 'react'
import "./styles.css"

const Button = ({ text, onClick, disabled, width }) => {
  return (
    <div className='custom-btn'
     onClick={onClick} 
     disabled={disabled}
      style={{ width: width }}>
      {text}
    </div>
  )
}

export default Button;