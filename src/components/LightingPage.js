import React from 'react'
import { useSelector } from 'react-redux'
import LightingBridge from './LightingBridge'

const LightingPage = () => {
    const bridges = useSelector(API => API.Main.bridges)
    
    return (
        <div className='container'>
            { Object.keys(bridges).map((item, index) => <React.Fragment key={index}>
                <LightingBridge device={bridges[item]} />
            </React.Fragment>)
            }
            
        </div>
    )
}

export default LightingPage