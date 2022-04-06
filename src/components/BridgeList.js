import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { emptyBridges } from '../redux/actions/Main'
import BridgeItem from './BridgeItem'

const BridgeList = () => {
    const dispatch = useDispatch()
    const main = useSelector(API => API.Main)
    const bridges = main.bridges

    const handleEmptyBridges = () => {
      dispatch(emptyBridges())
    }

    return (
        <>
            <h1>Dashboard</h1>

            { Object.keys(bridges).map((key, index) => <div key={index}>
              <BridgeItem />
              <div className="card" style={{width: '48%'}}>
                <div className="card-body">
                  <h5 className="card-title">{bridges[key].name}</h5>
                  {bridges[key].id && <p className="card-text"># ID<br /> {bridges[key].id}</p>}
                  {bridges[key].internalipaddress && <p className="card-text">IP address<br /> {bridges[key].internalipaddress}</p>}
                  {bridges[key].username && <p className="card-text">username<br /> {bridges[key].username}</p>}
                </div>
              </div>
              <button className='btn btn-danger' onClick={handleEmptyBridges}>Empty bridges record</button>
              </div>)

            }
        </>
    )
}

export default BridgeList