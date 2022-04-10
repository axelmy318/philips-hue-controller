import React from 'react'
import { useSelector } from 'react-redux'
import GroupControl from './GroupControl'

const ControlPage = () => {
    const bridges = useSelector(API => API.Main.bridges)
    
    return (
        <div className='container'>
            { Object.keys(bridges).map((bridge) => <React.Fragment key={bridge}>
                { bridges[bridge].groups && Object.keys(bridges[bridge].groups).map((group) => <React.Fragment key={group}>
                        <GroupControl bridge={bridges[bridge]} group={bridges[bridge].groups[group]} />
                    </React.Fragment>)
                }
            </React.Fragment>)
            }
            { /*Object.keys(bridges).map((item, index) => <React.Fragment key={index}>
                    <GroupControl device={bridges[item]} />
                </React.Fragment>)*/
            }
            
        </div>
    )
}

export default ControlPage