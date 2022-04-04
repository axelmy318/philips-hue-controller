import React, { useState } from 'react';
import { ipcRenderer } from 'electron';
import HueBridge from '../assets/img/hue-bridge.jpg'

const SelectBridge = ({ selectedDevice, setSelectedDevice }) => {
  //const [ deviceList, setDeviceList ] = useState({isLoaded: false, content: [], error: null})
  const [ deviceList, setDeviceList ] = useState({isLoaded:true,content:[{ip:"192.168.22.50",mac:"00:17:88:20:48:f4",name:"Philips Lighting BV"},{ip:"192.168.22.56",mac:"00:17:88:20:45:5d",name:"Philips Lighting BV"}],error:null})
  
  const loadDeviceList = () => {
    console.log('Sending IPC...')
    setDeviceList({isLoaded: 'pending', content: [], error: null})

    //ipcRenderer.invoke('catch-on-main', 'ping').then((result) => console.log('Result is ', result))
    ipcRenderer.invoke('GET_LOCAL_DEVICES', 'ping').then((result) => setDeviceList({isLoaded: true, content: result, error: null}))
  }

  const catchOnRenderer = (event, data) => {
    console.log(data)
  }

  /*if(!deviceList.isLoaded)
    loadDeviceList()*/

  return (<>
    <div>
      <p className='text-big'>To get started, find your <i>Philips HUE Bridge</i> in the list below.</p>
      <div className='device-list'>
        <div className='col'>
          <div className='device-list-viewport'>
            <div className='row'>
            {
              deviceList.content.map((device, index) => <div key={index} className="card" style={{width: '46%'}}>
                <img src={HueBridge} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">HUE Bridge</h5>
                  <p className="card-text">Mac Address<br /> {device.mac}</p>
                  <button className="btn btn-primary" onClick={() => setSelectedDevice(device)}>Select</button>
                </div>
              </div>
              )
            }
            </div>
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