import React, { useState } from 'react'
import { ipcRenderer } from 'electron';

import '../assets/css/sidebars.css'
import '../assets/css/bootstrap.min.css'

const Sidebar = ({ selectedMenu, setSelectedMenu, menus }) => {
    const [ version, setVersion ] = useState(null)

    if(version === null) {
        ipcRenderer.invoke('GET_APP_VERSION', {}).then((response) => setVersion(response))
    }

    return (
    <>
        <div className="d-flex flex-column flex-shrink-0 p-0 pt-5 text-white bg-dark" style={{height: '100vh'}}>
            <span className="d-flex align-items-center text-white text-decoration-none">
                <h2 style={{paddingLeft: '20%'}}>HUE Controller</h2>
            </span>
            <hr />
            <ul className="nav nav-pills text-center flex-column mb-auto">
                { Object.keys(menus).map((item, index) => <React.Fragment key={index}><li className={`nav-item`}>
                        <div 
                            onClick={() => setSelectedMenu(item)} 
                            className={`text-150 clickable pt-4 pb-4 text-white ${selectedMenu === item && 'active bg-info'}`}
                            
                        >
                            <span>{menus[item].icon} {menus[item].name}</span>
                        </div>
                    </li>

                    {/*index < Object.keys(menus).length-1 && <hr />*/}
                </React.Fragment>)
                }
            </ul>
            <div style={{paddingLeft: '20%'}}>
                <p className='text-muted'>
                    v{version}
                </p>
            </div>
        </div>
        <script src="../assets/js/sidebars.js"></script>
        <script src="../assets/js/bootstrap.bundle.min.js"></script>
    </>
    )
}

export default Sidebar