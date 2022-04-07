import React, { useState } from 'react'
import LightControl from './LightControl'

const LightingBridge = ({ device, group }) => {
    const [ open, setOpen ] = useState(true)

    return (
        <div className="card">
            <div className="card-header light-control-bridge-title clickable" onClick={() => setOpen(!open)}>
                {group.name}
            </div>
            {open && <> 
                <div className="card-body">
                    { group.lights.map((light) => <React.Fragment key={light}>
                            <LightControl device={device} light={device.lights[light]} />
                        </React.Fragment>)
                    }
                </div>
            </>}
        </div>
    )
}

export default LightingBridge