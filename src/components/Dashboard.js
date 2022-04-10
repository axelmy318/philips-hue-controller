import React, { useEffect, useState } from 'react'

import { MdOutlineRouter as LogoBridge } from 'react-icons/md'
import { RiLandscapeLine as LogoScenes } from 'react-icons/ri'
import { GoSettings as LogoControls } from 'react-icons/go'
import { FiSettings as LogoSettings } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { Status } from '../classes/Status'
import { loadLightsForBridge, validateBridgeConnection } from '../redux/actions/Main'
import BridgeList from './BridgeList'
import Sidebar from './Sidebar'
import MenuHeader from './MenuHeader'
import ControlPage from './ControlPage'
import SettingsPage from './SettingsPage'

const Dashboard = () => {
    const main = useSelector(API => API.Main)
    const dispatch = useDispatch()
    const bridges = main.bridges

    const menus = {
      bridges: {
        id: "bridges",
        icon: <LogoBridge />,
        name: 'Bridges',
        component: <BridgeList />
      },
      controls: {
        id: "controls",
        icon: <LogoControls />,
        name: 'Controls',
        component: <ControlPage />
      },
      scenes: {
        id: "scenes",
        icon: <LogoScenes />,
        name: 'Scenes',
        component: null
      },
      settings: {
        id: 'settings',
        icon: <LogoSettings />,
        name: 'Settings',
        component: <SettingsPage />
      }
    }

    const [ selectedMenu, setSelectedMenu ] = useState(Object.keys(main.bridges).length > 0 ? menus['controls'].id : menus['bridges'].id)

    useEffect(() => {
      Object.keys(bridges).map(bridgeId => {
        let bridge = bridges[bridgeId]

        // If the app already validated the bridge connection
        if(bridge.validConnection === Status.Fulfilled) {
          // Load lights
          if(bridge.lightsLoaded === Status.None) {
            dispatch(loadLightsForBridge(bridge))
          }
        }
        // Validate the bridge connection
        else if(bridge.validConnection === Status.None) {
          dispatch(validateBridgeConnection(bridge))
        }

      })
    }, [main])
    

    return (
      <>
      <div className='container-fluid p-0'>
        <main>
          <div className='row w-100'>
            <div className='col-2 p-0'>
              <Sidebar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} menus={menus} />
            </div>
            <div className='col-10 p-0'>
              <div className='row'>
                <div className='col bg-dark text-white'>
                  <MenuHeader header={menus[selectedMenu].name} />
                </div>
              </div>
              <div className='row main-app-content'>
                <div className='col'>
                  {menus[selectedMenu].component}
                </div>
              </div>
            </div>
          </div>
          </main>
        </div>
      </>
    )
}

export default Dashboard