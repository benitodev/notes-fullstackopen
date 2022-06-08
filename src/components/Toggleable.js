import React, { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from "prop-types"
const Toggleable = forwardRef(({children, buttonLabel}, ref) => {
    const [visible, setVisible] = useState(false);
    const hideWhenVisible = {display: visible ? "none" : ""}
    const showWhenVisible = {display: visible ? "" : "none"}
    const toggleVisibility = ()=> setVisible(!visible)
    useImperativeHandle(ref, ()=>{
      return {
        toggleVisibility
      }
    })
  return (
    <div>
        <div style={hideWhenVisible}>
            <button onClick={toggleVisibility}>{buttonLabel}</button>  
        </div> 

        <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>Cancel</button>
        </div>
    </div>
  )
})
Toggleable.displayName = 'Toggleable'
Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
export default Toggleable