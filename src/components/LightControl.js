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
    console.log('HUE IS ', light.state,hue)

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


    const iconColor = light.state.on ? 'cyan' : 'grey'

    return (
      <div className="card w-100 mb-2">
          <div className="card-body">
            <div className='row align-items-center'>
              <div className='col col-md-1' align="center">
                <IconContext.Provider value={{color: iconColor, size: '75%'}}>
                  <LogoLightBulb />
                  <div className="form-check form-switch" align="center">
                    <input className="form-check-input input-lg" checked={light.state.on} ref={lightCheckedRef} onChange={handleLightOnOff} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                  </div>
                </IconContext.Provider>
              </div>
              <div className='col col-md-5'>
                <h5 className="card-title">{light.name}</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" className="btn btn-primary">Button</a>
              </div>
              <div className='col col-md-6'>
                {/*<HsvColorPicker color={hue} onChange={(value) => {console.log(value);setHue(value)}} onMouseLeave={(e)=>handleChangeLightsColor(hue)} onMouseUp={(e)=>handleChangeLightsColor(hue)} />*/}
                HUE <HuePicker color={{h: hue.h, s: 1, v: 1}} onChangeComplete={(value) => {console.log(value); changeHSV('h', value.hsv.h)}} />
                SAT<AlphaPicker color={{h: hue.h, s: 1, v: 1, a: hue.s}} onChangeComplete={(value) => {console.log(value); changeHSV('s', value.hsv.a)}} />
                BRI <AlphaPicker color={{h: 360, s: 1, v: 1, a: hue.v}} onChangeComplete={(value) => {console.log(value); changeHSV('v', value.hsv.a)}} />
              </div>
            </div>
          </div>
      </div>
    )
}

export default LightControl