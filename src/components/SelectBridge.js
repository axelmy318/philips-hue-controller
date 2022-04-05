import React, { useState } from 'react';
import { ipcRenderer } from 'electron';
import HueBridge from '../assets/img/hue-bridge.jpg'

const SelectBridge = ({ selectedDevice, setSelectedDevice }) => {
  //const [ deviceList, setDeviceList ] = useState({isLoaded: false, content: [], error: null})
  const [ deviceList, setDeviceList ] = useState({isLoaded:true,content:[{id: '001788fffe2048f4', internalipaddress:"192.168.22.50"},{internalipaddress:"192.168.22.56",id:"001788fffe20455d"}],error:null})
  
  const loadDeviceList = () => {
    setDeviceList({isLoaded: 'pending', content: [], error: null})

    //ipcRenderer.invoke('catch-on-main', 'ping').then((result) => console.log('Result is ', result))
    ipcRenderer.invoke('GET_LOCAL_DEVICES', 'ping').then((result) => setDeviceList({isLoaded: true, content: result, error: null}))
  }

  if(!deviceList.isLoaded)
    loadDeviceList()

  return (<>
    <div>
      <p className='text-big'>To get started, find your <i>HUE Bridge</i> in the list below.</p>
      <div className='device-list'>
        <div className='row'>
          <div className='device-list-viewport'>
            <div className='col md-3'></div>
            <div className='col md-6'>
              { deviceList.content.length > 0 ? <><div className='row'>{
                  deviceList.content.map((device, index) => <div key={index} className="card" style={{width: '48%'}}>
                    <img src={HueBridge} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">HUE Bridge</h5>
                      {device.id && <p className="card-text"># ID<br /> {device.id}</p>}
                      {device.internalipaddress && <p className="card-text">IP address<br /> {device.internalipaddress}</p>}
                      {device.id && <p className="card-text">MAC address<br /> {(device.id.slice(0, 6)+device.id.slice(10, device.id.length)).replace(/(.{2})/g,"$1:").slice(0, -1)}</p>}
                      <button className="btn btn-primary" onClick={() => setSelectedDevice(device)}>Select</button>
                    </div>
                  </div>
                  )
                }</div></>
                :
                <>
                  We couldn't find any HUE Bridge in your network. <br />Make sure you are connected to the same network as your HUE Bridges
                </>
              }
            </div>
            <div className='col md-3'></div>
          </div>
        </div>
      { deviceList.isLoaded !== 'pending' ?
        <a className='clickable' onClick={() => loadDeviceList()}>{deviceList.isLoaded === true ? 'Re-scan network for HUE Bridges' : 'Scan network for HUE Bridges'}</a>
        :
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      }
      </div>
    </div>
    </>
  )
};

export default SelectBridge;