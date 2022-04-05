import React from 'react'

import { useDispatch } from 'react-redux'
import { emptyBridges } from '../redux/actions/Main'

const Dashboard = () => {
    const dispatch = useDispatch()

    const handleEmptyBridges = () => {
      dispatch(emptyBridges())
    }


    return (
      <>
        <div>Dashboard</div>
        <button className='btn btn-danger' onClick={handleEmptyBridges}>Empty bridges record</button>
      </>
    )
}

export default Dashboard