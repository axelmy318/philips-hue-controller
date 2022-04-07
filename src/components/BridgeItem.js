import React from 'react'
import { useDispatch } from 'react-redux'
import BridgeImage from '../assets/img/hue-bridge.jpg'
import { scanNetworkForBridges, removeBridge } from '../redux/actions/Main'

const BridgeItem = ({ device }) => {
    const dispatch = useDispatch()

    const handleRemoveBridge = () => {
        dispatch(removeBridge(device))
        dispatch(scanNetworkForBridges())
    }

    return (
        <div className="card">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={BridgeImage} className="img-fluid rounded-start" alt="HUE Bridge" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{device.customName}</h5>
                        <table className='bridge-card-info-table'>
                            <tbody>
                                <tr>{device.id && <><td className="card-text">ID </td><td>{device.id}</td></>}</tr>
                                <tr>{device.internalipaddress && <><td className="card-text">IP </td><td>{device.internalipaddress}</td></>}</tr>
                                <tr>{device.id && <><td className="card-text">MAC </td><td>{(device.id.slice(0, 6)+device.id.slice(10, device.id.length)).replace(/(.{2})/g,"$1:").slice(0, -1)}</td></>}</tr>
                            </tbody>
                        </table>
                        <p className="card-text">
                            { device.validConnection
                            ? <small className="text-success">Connected</small>
                            : <small className="text-danger">Not connected</small>
                            }
                            &nbsp;&nbsp;
                            <span className='text-muted'>&bull;</span>
                            &nbsp;&nbsp;
                            <small className="text-muted clickable" onClick={handleRemoveBridge}>remove</small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BridgeItem