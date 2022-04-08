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
        <div className="d-flex flex-column flex-shrink-0 p-5 text-white bg-dark" style={{height: '100vh'}}>
            <span className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <svg className="bi me-2" width="40" height="32"></svg>
            <span className="fs-4">PHC {version}</span>
            </span>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                { Object.keys(menus).map((item, index) => <React.Fragment key={index}><li className={`nav-item`}>
                        <div onClick={() => setSelectedMenu(item)} style={{marginRight: '10%', marginLeft: '10%'}} className={`mt-3 mb-3 text-125 text-center clickable nav-link text-white ${selectedMenu === item && 'active bg-info'}`}>
                            {menus[item].icon} {menus[item].name}
                        </div>
                    </li>

                    {index < Object.keys(menus).length-1 && <hr />}
                </React.Fragment>)
                }
            </ul>
            
        </div>
        <script src="../assets/js/sidebars.js"></script>
        <script src="../assets/js/bootstrap.bundle.min.js"></script>
    </>
    )
}

export default Sidebar