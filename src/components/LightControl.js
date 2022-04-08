import React, { useRef, useState } from 'react'
import { IconContext } from 'react-icons'

import { HsvColorPicker } from 'react-colorful'
import { HuePicker, AlphaPicker } from 'react-color'

import { FaRegLightbulb as LogoLightBulb } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Status } from '../classes/Status'
import { loadLightsForBridge, switchLightState } from '../redux/actions/Main'

const LightControl = ({ device, light }) => {
    const dispatch = useDispatch()
    const lightCheckedRef = useRef()

    const [ hue, setHue ] = useState({
      h: light.state.hue / 65536 * 360, s: light.state.sat / 254, v: light.state.bri / 254
    })

    //let hue = { h: light.state.hue / 65536, s: light.state.sat / 254 * 100, v: light.state.bri / 254 * 100 }

    if(light.isLoaded === Status.None) {
      dispatch(loadLightsForBridge(device))
    }

    const changeHSV = (part, value) => {
      let tmpHue = hue
      hue[part] = value
      setHue({...tmpHue})
      handleChangeLightsColor(tmpHue)
    }

    const handleLightOnOff = () => {
      dispatch(switchLightState(device, light, {on: !light.state.on}))
    }

    const handleChangeLightsColor = ({ h, s, v }) => {
      dispatch(switchLightState(device, light, {
        on: true, 
        bri: Math.round(v * 254), 
        sat: Math.round(s * 254), 
        hue: Math.round(h / 360 * 65536),
      }))
    }

    return (
      <div className="card w-100 mb-2">
          <div className="card-body">
            <div className='row align-items-center'>
              <div className='col col-md-1' align="center">
                <IconContext.Provider value={{color: light.state.on ? `hsl(${Math.round(hue.h)}, ${Math.round(hue.s*100)}%, ${Math.round(hue.v*100/2)}%)` : 'grey', size: '75%'}}>
                  <LogoLightBulb />
                  <div className="form-check form-switch custom-switch-lg" align="center" style={{heigth: '50px', width: '100px'}}>
                    <input className="form-check-input input-lg" checked={light.state.on} ref={lightCheckedRef} onChange={handleLightOnOff} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                  </div>
                </IconContext.Provider>
              </div>
              <div className='col col-md-8'>
                <div className='row'>
                  <div className='col'>
                    <table>
                      <tbody>
                        <tr><td>HUE</td><td><HuePicker color={{h: hue.h, s: 1, v: 1}} onChangeComplete={(value) => {changeHSV('h', value.hsv.h)}} /></td></tr>
                        <tr><td>Saturation</td><td><AlphaPicker color={{h: hue.h, s: 1, v: 1, a: hue.s}} onChangeComplete={(value) => {changeHSV('s', value.hsv.a)}} /></td></tr>
                        <tr><td>Brightness</td><td><AlphaPicker color={{h: hue.h, s: hue.s, v: 1, a: hue.v}} onChangeComplete={(value) => {changeHSV('v', value.hsv.a)}} /></td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
}

export default LightControl