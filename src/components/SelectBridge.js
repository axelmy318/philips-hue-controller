import React from 'react';
import HueBridge from '../assets/img/hue-bridge.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { scanNetworkForBridges } from '../redux/actions/Main';
import { Status } from '../classes/Status';
import BridgeConnectionProcess from './BridgeConnectionProcess';

const SelectBridge = ({ selectedDevice, setSelectedDevice, addSelectedDevice, removeSelectedDevice }) => {
  //const [ deviceList, setDeviceList ] = useState({isLoaded: false, content: [], error: null})
  //const [ deviceList, setDeviceList ] = useState({isLoaded:true,content:[{id: '001788fffe2048f4', internalipaddress:"192.168.22.50"},{internalipaddress:"192.168.22.56",id:"001788fffe20455d"}],error:null})
  
  const deviceList = useSelector(API => API.Main.bridgesConnexions)
  const dispatch = useDispatch()

  const loadDeviceList = () => {
    dispatch(scanNetworkForBridges())
    //setDeviceList({isLoaded: 'pending', content: [], error: null})
    //ipcRenderer.invoke('GET_LOCAL_DEVICES', 'ping').then((result) => setDeviceList({isLoaded: true, content: result}))
  }

  if(deviceList.pending.isLoaded === Status.None)
    loadDeviceList()

  return (<>
  
    <div className='row align-items-center row-cols-1 row-cols-md-3 g-4 m-3'>
      {(Object.keys(deviceList.pending.content)).map((device, index) => 
        <div key={index}>
          <div className="card card-bridge-connection" style={{minHeight: '145px'}}>
          { selectedDevice[device] === undefined ?
            <div className="row g-0">
              <div className="col-md-4">
                <img src={HueBridge} className="img-fluid rounded-start" alt="HUE Bridge" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                { selectedDevice[device] === undefined
                  ? <><table className='bridge-card-info-table'>
                      <tbody>
                        <tr>{deviceList.pending.content[device].id && <><td className="card-text">ID </td><td>{deviceList.pending.content[device].id}</td></>}</tr>
                        <tr>{deviceList.pending.content[device].internalipaddress && <><td className="card-text">IP </td><td>{deviceList.pending.content[device].internalipaddress}</td></>}</tr>
                        <tr>{deviceList.pending.content[device].id && <><td className="card-text">MAC </td><td>{(deviceList.pending.content[device].id.slice(0, 6)+deviceList.pending.content[device].id.slice(10, deviceList.pending.content[device].id.length)).replace(/(.{2})/g,"$1:").slice(0, -1)}</td></>}</tr>
                      </tbody>
                  </table>
                  <button className="btn btn-sm btn-primary" onClick={() => addSelectedDevice(deviceList.pending.content[device])}>Connect</button>
                  </>
                  : <BridgeConnectionProcess loadDeviceList={loadDeviceList} selectedDevice={selectedDevice[device]} setSelectedDevice={() => removeSelectedDevice(device)} />
                  }
                </div>
              </div>
            </div>
            :
            <div className="row g-0">
              <div className="col-md-12 align-self-center">
                <div className="card-body">
                  <BridgeConnectionProcess loadDeviceList={loadDeviceList} selectedDevice={selectedDevice[device]} setSelectedDevice={() => removeSelectedDevice(device)} />
                </div>
              </div>
            </div>
            }
          </div>
        </div>)}
      </div>
      <p className='link clickable' onClick={loadDeviceList} style={{color: 'skyblue'}}>Re-scan network for bridges</p>
    </>
  )
};

export default SelectBridge;