import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Status } from '../classes/Status'
import { loadLightsForBridge, validateBridgeConnection } from '../redux/actions/Main'
import BridgeList from './BridgeList'
import Sidebar from './Sidebar'

const Dashboard = () => {
    const main = useSelector(API => API.Main)
    const dispatch = useDispatch()
    const bridges = main.bridges

    const menus = {
      bridges: {
        id: "bridges",
        icon: null,
        name: 'Bridges',
        component: <BridgeList />
      },
      lighting: {
        id: "lighting",
        icon: null,
        name: 'Lighting',
        component: null
      },
      presets: {
        id: "presets",
        icon: null,
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
            <div className='col-2'>
              <Sidebar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} menus={menus} />
            </div>
            <div className='col-10'>
              {menus[selectedMenu].component}
            </div>
          </div>
          </main>
        </div>
      </>
    )
}

export default Dashboard