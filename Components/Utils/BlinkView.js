import React, { useEffect, useState } from 'react'

function BlinkView(props) {
    const [isVisible,setIsVisible] = useState(true)
    useEffect(() =>{
            setTimeout(() =>{
                setIsVisible(!isVisible)
            },props.timeout)
        
    },[isVisible])
    
  return (
        isVisible?(
            props.children
        ):(null)
    )
}

export default BlinkView