import React from 'react'
import { IconContext } from 'react-icons'
import { FaRegLightbulb as LogoLightBulb } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Status } from '../classes/Status'
import { loadLightsForBridge, switchLightState } from '../redux/actions/Main'

const DeviceSmallCard = ({ bridge, device, isLight, isPlug, color, onSelect, selected }) => {
  const dispatch = useDispatch()

  const statusShadowColor = 'cyan'
  const stateStyle = {
    //textShadow: `text-shadow: 0 0 10px #fff, 0 0 10px ${statusShadowColor}, 0 0 10px ${statusShadowColor}, 0 0 10px ${statusShadowColor}, 0 0 ${statusShadowSize}px ${statusShadowColor}, 0 0 10px ${statusShadowColor}, 0 0 ${statusShadowSize}px ${statusShadowColor};`
    textShadow: device.state.on ? `0 0 10px #fff, 0 0 5px ${statusShadowColor}, 0 0 5px ${statusShadowColor}, 0 0 5px ${statusShadowColor}, 0 0 5px ${statusShadowColor}, 0 0 5px ${statusShadowColor}, 0 0 5px ${statusShadowColor}` : 'none',
    color: device.state.on ? 'white' : 'black',
    fontWeight: 'bold',
    letterSpacing: "3px"
  }

  console.log(device.name, color)

  if(color === null && !isLight)
    color = {h: 0, s: 1, v: 0}
  else if(color === null && isLight)
    color = {h: device.state.hue/65536*360, s: device.state.sat/254*100, v: device.state.bri/254*100}
  else
    color = {h: color.h, s: color.s*100, v: color.v*100}

  if(device.isLoaded === Status.None) {
    dispatch(loadLightsForBridge(bridge))
  }

  const generateHSL = () => {
    return `hsl(${Math.round(color.h)}, ${Math.round(color.s)}%, ${Math.round(color.v/2)}%)`
  }

  const handleLightOnOff = () => {
    dispatch(switchLightState(bridge, device, {on: !device.state.on}))
  }

  const handleOnSelect = (e) => {
    e.stopPropagation()
    onSelect(device.id, e.ctrlKey)
  }

  const handleOnStateChange = (e) => {
    e.stopPropagation()
    handleLightOnOff()
  }

  return (
    <div className="col col-md-2 text-center">
      <div className={`card ${selected ? 'border-primary' : 'border-dark'} mb-3`} onClick={(e) => handleOnSelect(e)}>
        <div className={`card-header ${selected ? 'text-primary' : 'text-dark'}`}>{device.name}</div>
        <div className="card-body text-dark">
          <IconContext.Provider value={{color: generateHSL(), size: '50%'}}>
            {isLight && <LogoLightBulb />}
          </IconContext.Provider>
        </div>
        <div className='card-footer clickable' onClick={(e) => handleOnStateChange(e)}>
          <span>{ device.state.on ? <span style={stateStyle}>ON</span> : <span style={stateStyle}>OFF</span> }</span>
        </div>
      </div>
    </div>
  )
}

DeviceSmallCard.defaultProps = {
  bridge: null,
  device: null,
  isLight: false,
  isPlug: false,
  color: null,
}

export default DeviceSmallCard