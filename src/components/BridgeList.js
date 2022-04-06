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
        <h2>My bridges</h2>
        { Object.keys(bridges).length <= 0 
          ?
            <>
              <p>No bridges... You can add above</p>
            </>
          :
          <>
          <div className='row align-items-center row-cols-1 row-cols-md-3 g-4 m-3'>
              { Object.keys(bridges).map((key, index) => <div key={index}>
                  <BridgeItem device={bridges[key]} />
                </div>
              )}

              
            {console.log(bridges)}
            </div>
            <button className='btn btn-danger' onClick={handleEmptyBridges}>Empty</button>
          </>
        }
        </div>
        </>
    )
}

export default BridgeList