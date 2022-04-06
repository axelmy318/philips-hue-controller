import React, { useEffect, useState } from 'react'

import { MdOutlineRouter as LogoBridge } from 'react-icons/md'
import { FaRegLightbulb as LogoLighting} from 'react-icons/fa'
import { GoSettings as LogoPreset } from 'react-icons/go'
import { useDispatch, useSelector } from 'react-redux'
import { Status } from '../classes/Status'
import { loadLightsForBridge, validateBridgeConnection } from '../redux/actions/Main'
import BridgeList from './BridgeList'
import Sidebar from './Sidebar'
import MenuHeader from './MenuHeader'

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
      lighting: {
        id: "lighting",
        icon: <LogoLighting />,
        name: 'Lighting',
        component: null
      },
      presets: {
        id: "presets",
        icon: <LogoPreset />,
        name: 'Presets',
        component: null
      },
    }

    const [ selectedMenu, setSelectedMenu ] = useState(menus['bridges'].id)

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