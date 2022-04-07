import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { emptyBridges, scanNetworkForBridges } from '../redux/actions/Main'
import BridgeItem from './BridgeItem'
import ConnectBridge from './ConnectBridge'

const BridgeList = () => {
    const dispatch = useDispatch()
    const main = useSelector(API => API.Main)
    const bridges = main.bridges

    const handleEmptyBridges = () => {
      dispatch(emptyBridges())
      dispatch(scanNetworkForBridges())
    }

    return (
      <>
      <div className='container'>
        <h2>Connect a new bridge</h2>
        <ConnectBridge />
        { !(Object.keys(bridges).length <= 0) &&
          <>
          <h2>My bridges</h2>
          <div className='row align-items-center row-cols-1 row-cols-md-3 g-4 m-3'>
              { Object.keys(bridges).map((key, index) => <div key={index}>
                  <BridgeItem device={bridges[key]} />
                </div>
              )}
            </div>
          </>
        }
        </div>
        </>
    )
}

export default BridgeList