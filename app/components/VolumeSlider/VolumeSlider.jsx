import React, {useState, useEffect, useRef} from 'react';
import './VolumeSlider.scss';

export const VolumeSlider = ({onChange}) => {
  const sliderRef = useRef(null);
  const slidingRef = useRef(false);
  const [volume, setVolume] = useState(1);

  const calculateVolume = (offset, offsetRange) => {
    const newVolume = 1 - (offset / offsetRange);
    if(newVolume < 0.1) return 0;
    if(newVolume > 0.9) return 1;
    return newVolume;
  }

  const changeVolume = (event) => {
    const vol = calculateVolume(event.offsetY, event.target.offsetHeight);
    setVolume(vol)
    onChange(vol);
  };

  const handleMouseDown = (event) => {
    slidingRef.current = true;
    changeVolume(event);
  }

  const handleMouseMove = (event) => {
    if(slidingRef.current) changeVolume(event);
  }

  const handleMouseUp = (event) => {
    slidingRef.current = false;
  }

  useEffect(() => {
    sliderRef.current.addEventListener('mousedown', handleMouseDown);
    sliderRef.current.addEventListener('mousemove', handleMouseMove);
    sliderRef.current.addEventListener('mouseup', handleMouseUp);
    return () => {
      sliderRef.current.removeEventListener('mousedown', handleMouseDown);
      sliderRef.current.removeEventListener('mousemove', handleMouseMove);
      sliderRef.current.removeEventListener('mouseup', handleMouseUp);
    }
  }, []);
  
  const barHeight = (volume * 85) + '%';
  return(
    <div className="tmm_volume-slider">
      <div className="tmm_volume-slider_bar" style={{height: barHeight}} />
      <div ref={sliderRef} className="tmm_volume-slider_touch" />
    </div>
  );
}
