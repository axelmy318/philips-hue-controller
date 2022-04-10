import React, { useEffect, useState } from 'react'
import LightControl from './LightControl'
import { DeviceType } from '../classes/DeviceType'
import { HuePicker, AlphaPicker } from 'react-color'
import DeviceSmallCard from './DeviceSmallCard'
import { useDispatch } from 'react-redux'
import { switchLightState } from '../redux/actions/Main'

const GroupControl = ({ bridge, group }) => {
    const [ open, setOpen ] = useState(true)
    const [ selected, setSelected ] = useState([])
    const dispatch = useDispatch()

    const findDeviceType = id => {
        let target = bridge.lights[id]
        
        if (target.capabilities.control.colorgamut !== undefined)
            return DeviceType.LIGHT
        
        return DeviceType.PLUG
    }

    const isLight = id => {
        return findDeviceType(id) === DeviceType.LIGHT
    }

    const isPlug = id => {
        return findDeviceType(id) === DeviceType.PLUG
    }

    const getLightWhenMultipleSelected = () => {
        let color = {h: 0, s: 1, v: 1}

        let tmpColor = null        
        let allColorsEqual = true

        if(selected.length <= 0) {
            return color
        }

        selected.map(selectedId => {
            if(isLight(selectedId)) {
                let currentLight = bridge.lights[selectedId]
                if(tmpColor === null)
                    tmpColor = { h: currentLight.state.hue / 65536 * 360, s: currentLight.state.sat / 254, v: currentLight.state.bri / 254 }
                else {
                    if (tmpColor.h !== currentLight.state.hue / 65536 * 360 || tmpColor.s !== currentLight.state.sat / 254 || tmpColor.v !== currentLight.state.bri / 254) {
                        allColorsEqual = false
                    }
                }
            }
        })

        return allColorsEqual ? tmpColor : color
    }

    const [ hue, setHue ] = useState(getLightWhenMultipleSelected())

    const addOrRemoveSelected = (id, addToList) => {
        let tmpSelected = selected
        if(tmpSelected.includes(id)){
            if(addToList)
                tmpSelected = tmpSelected.filter(i => i !== id)
            else
                tmpSelected = [id]
        }
        else{
            if(addToList)
                tmpSelected.push(id)
            else
                tmpSelected = [id]
        }

        setSelected([...tmpSelected])
    }

    useEffect(() => {
        setHue(getLightWhenMultipleSelected())
    }, [selected])
    

    const changeHSV = (part, value, silently = false) => {
        let tmpHue = hue
        hue[part] = value
        setHue({...tmpHue})
        if(!silently) {
            selected.map(lightId => {
                handleChangeLightsColor(tmpHue, bridge.lights[lightId])
            })
        }
      }

    const handleChangeLightsColor = ({ h, s, v }, light) => {
        dispatch(switchLightState(bridge, light, {
          on: true, 
          bri: Math.round(v * 254), 
          sat: Math.round(s * 254), 
          hue: Math.round(h / 360 * 65536),
        }))
    }

    return (
        <div className="card">
            <div className="card-header light-control-bridge-title clickable" onClick={() => setOpen(!open)}>
                {group.name}
            </div>
            <div className='group-controls' style={{display: 'inline-flex'}}>
                <HuePicker color={{h: hue.h, s: 1, v: 1}} onChangeComplete={(value) => {changeHSV('h', value.hsv.h)}} onChange={(value) => {changeHSV('h', value.hsv.h, true)}} />
                <AlphaPicker color={{h: hue.h, s: 1, v: 1, a: hue.s}} onChangeComplete={(value) => {changeHSV('s', value.hsv.a)}} onChange={(value) => {changeHSV('s', value.hsv.a, true)}} />
                <AlphaPicker color={{h: hue.h, s: hue.s, v: 1, a: hue.v}} onChangeComplete={(value) => {changeHSV('v', value.hsv.a)}} onChange={(value) => {changeHSV('v', value.hsv.a, true)}} />
            </div>
            {open && <> 
                {/*<div className="card-body">
                    { group.lights.map((light) => <React.Fragment key={light}>
                        { isLight(light) &&
                            <>
                                <LightControl bridge={bridge} light={bridge.lights[light]} />
                            </>
                        }
                    </React.Fragment>)}
                    </div>*/}

                <div className="card-body">
                    <div className="row row-cols-1 row-cols-md-6 g-2">
                    { group.lights.map((light) => <React.Fragment key={light}>
                        { isLight(light) &&
                            <>
                                <DeviceSmallCard bridge={bridge} device={bridge.lights[light]} isLight={true} onSelect={addOrRemoveSelected} selected={selected.includes(light)} color={selected.includes(light) ? hue : null} />
                            </>
                        }
                    </React.Fragment>)}
                    </div>
                </div>
            </>}
        </div>
    )
}

export default GroupControl