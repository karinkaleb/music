import React, { useRef, useEffect } from "react";
import { ReactComponent as VolumeIcon } from "../assets/icons/volume.svg";
import "../styles/volume-control.css";

const VolumeControl = ({ volume, setVolume }) => {
  const sliderRef = useRef();

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.setProperty("--volume-level", volume);
    }
  }, [volume]);

  return (
    <div className="volume-control">
      <VolumeIcon className="volume-icon" />
      <input
        ref={sliderRef}
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="volume-slider"
        aria-label="Громкость"
      />
    </div>
  );
};

export default VolumeControl;