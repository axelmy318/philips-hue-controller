import React from 'react'

const LoadingScreen = () => {
    return (
        <div className='container-fluid' style={{minHeight: '100vh'}}>
            <div className="d-flex justify-content-center" style={{minHeight: '100vh', textAlign: 'center'}}>
                <div className='row align-items-center'>
                    <div className='col'>
                        <div className="spinner-border text-primary" style={{width: "5rem", height: "5rem"}} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <br />
                        <br />
                        <p className='text-big'>The application is loading. Please be patient.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoadingScreen