import React, { useEffect, useState } from 'react'
import { ipcRenderer } from 'electron';

import '../assets/css/sidebars.css'
import '../assets/css/bootstrap.min.css'

const Sidebar = ({ selectedMenu, setSelectedMenu, menus }) => {
    const [ version, setVersion ] = useState(null)
    const [ updateAvailable, setUpdateAvailable] = useState(false)

    if(version === null) {
        ipcRenderer.invoke('GET_APP_VERSION', {}).then((response) => setVersion(response))
    }

    const getAppVersion = () => {
        /*ipcRenderer.send('CHECK_FOR_UPDATE_TEST')
        ipcRenderer.on('UPDATE_STATUS', (value, arg) => setVersion(arg.version))*/
    }
    
    useEffect(() => {
        /*return (() => {
            ipcRenderer.removeListener('UPDATE_STATUS', (value, arg) => console.log(arg))
        })*/
    })

    return (
    <>
        <div className="d-flex flex-column flex-shrink-0 p-5 text-white bg-primary" style={{height: '100vh'}}>
            <span className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <svg className="bi me-2" width="40" height="32"></svg>
            <span className="fs-4" onClick={() => getAppVersion()}>PHC {version} {updateAvailable ? 'AV' : 'NO'}</span>

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