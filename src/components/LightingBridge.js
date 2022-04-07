import React, { useState } from 'react'
import LightControl from './LightControl'

const LightingBridge = ({ device }) => {
    const [ open, setOpen ] = useState(true)

    return (
        <div className="card">
            <div className="card-header light-control-bridge-title clickable" onClick={() => setOpen(!open)}>
                {device.customName}
            </div>
            {open && <> 
                <div className="card-body">
                    { Object.keys(device.lights).map((light, index) => <React.Fragment key={index}>
                        <LightControl device={device} light={device.lights[light]} />
                    </React.Fragment>)

                    }
                </div>
            </>}
        </div>
    )
}

export default LightingBridge