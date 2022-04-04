import React, { useEffect } from 'react';
import { ipcRenderer } from 'electron';

const HelloWorld = () => {
  const sendIpc = () => {
    console.log('Sending IPC...')

    //ipcRenderer.invoke('catch-on-main', 'ping').then((result) => console.log('Result is ', result))
    ipcRenderer.invoke('GET_LOCAL_DEVICES', 'ping').then((result) => console.log('Result is ', result))
  }

  const catchOnRenderer = (event, data) => {
    console.log(data)
  }

  /*useEffect(() => {
    ipcRenderer.on('catch-on-renderer', (event, arg) => {console.log(arg)})

    return () => {
      ipcRenderer.removeListener('catch-on-renderer', catchOnRenderer)
    }
  })*/

  return (
    <div>
      <h1>Hello, Electron!</h1>
      <p>I hope you enjoy using basic-electron-react-boilerplate to start your dev off right!</p>
      <button onClick={() => sendIpc()}>Send</button>
    </div>
  )
};

export default HelloWorld;