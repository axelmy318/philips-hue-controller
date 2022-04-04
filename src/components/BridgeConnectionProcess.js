import React, {useEffect, useState, useRef} from 'react'

const BridgeConnectionProcess = ({ selectedDevice, setSelectedDevice }) => {
    const MAX_TIME = 30
    const [ name, setName ] = useState("")
    const [ started, setStarted ] = useState(false)
    const [ timeRemaining, setTimeRemaining ] = useState(MAX_TIME)
    const [ APIData, setAPIData ] = useState(null)

    const checkIfBridgeConnectionIsValid = () => {
        
    }

    const goBackToSelectionMenu = () => {
        setSelectedDevice(null)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if(started) {
                setTimeRemaining(timeRemaining-1)
                checkIfBridgeConnectionIsValid()
            }
        }, 1000);

        if(timeRemaining <= 0){
            setTimeRemaining(-1)
            clearInterval(interval)
        }

        return () => clearInterval(interval)
      }, [timeRemaining, started]);

    return (
        <div className='bridge-connection-process'>
            <div>
                { !started && 
                    <>
                    <p className='text-big'>Once you click on start, you will have {timeRemaining} seconds to press to link button on your HUE bridge.</p>
                    <br />
                    <div className='row'>
                        <div className='col md-4'></div>
                        <div className='col md-4'><input value={name} onChange={(e) => setName(e.target.value)} class="form-control form-control-lg" type="text" placeholder="Name your HUE bridge" /></div>
                        <div className='col md-4'></div>
                    </div>
                    <button className='btn btn-lg btn-secondary mt-4' onClick={goBackToSelectionMenu}>Cancel</button>&nbsp;
                    <button className='btn btn-success btn-lg mt-4' disabled={!(name !== "")} onClick={() => setStarted(true)}>Start</button>
                    </>
                }
                { started && timeRemaining >= 0 && APIData === null &&
                    <>
                    <p className='text-big'>You now have {Math.max(0, timeRemaining)} seconds to go click the link button on your HUE bridge !</p>
                    <div className="progress mt-4">
                        <div className="progress-bar" role="progressbar" style={{width: `${timeRemaining / MAX_TIME * 100}%`}} aria-valuenow={timeRemaining / MAX_TIME * 100} aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <button className='btn btn-lg btn-secondary mt-4' onClick={goBackToSelectionMenu}>Cancel</button>
                    </>
                }
                { started && timeRemaining <= 0 && APIData === null &&
                    <>
                    <p className='text-big'>The link button was not pressed in time.</p>
                    <button className='btn btn-lg btn-danger mt-4' onClick={goBackToSelectionMenu}>Go back</button>
                    </>
                }
                { started && APIData !== null &&
                    <>
                    <p className='text-big'>The HUE bridge successfully connected.</p>
                    <button className='btn btn-secondary mt-4' onClick={goBackToSelectionMenu}>Next</button>
                    </>
                }
            </div>
        </div>
    )
}

export default BridgeConnectionProcess