import React, { useEffect, useState } from "react";
import { ReactComponent as PlayIcon } from "../assets/icons/play.svg";
import { ReactComponent as PauseIcon } from "../assets/icons/pause.svg";
import { ReactComponent as RepeatIcon } from "../assets/icons/repeat.svg";
import { ReactComponent as RepeatClickedIcon } from "../assets/icons/repeat-clicked.svg";
import { ReactComponent as ShuffleIcon } from "../assets/icons/shuffle.svg";
import { ReactComponent as ShuffleClickedIcon } from "../assets/icons/shuffle-clicked.svg";
import { ReactComponent as SkipIcon } from "../assets/icons/play_skip_back.svg";
import { ReactComponent as RewindIcon } from "../assets/icons/rewind.svg";
import "../styles/controls.css";

const Controls = ({
  audioPlayerRef,
  isRandom,
  setIsRandom,
  handleNextSong,
  trackIndex,
  setTrackIndex,
  tracks,
  isLoop,
  setLoop,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const previousSong = () => {
    setTrackIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
  };

  const handleShuffle = () => {
    setIsRandom((prev) => !prev);
  };

  const handlePlayForward = () => {
    audioPlayerRef.current.currentTime += 10;
  };

  const handlePlayBack = () => {
    audioPlayerRef.current.currentTime -= 10;
  };

  const handleLooping = () => {
    setLoop((prev) => !prev);
  };

  useEffect(() => {
    isPlaying ? audioPlayerRef.current.play() : audioPlayerRef.current.pause();
  }, [isPlaying, audioPlayerRef, trackIndex]);

  return (
    <div className="controls">
      {/* Shuffle Button */}
      <button className="control-btn shuffle" onClick={handleShuffle}>
        {isRandom ? <ShuffleClickedIcon /> : <ShuffleIcon />}
      </button>

      {/* Previous Track Button */}
      <button className="control-btn prev" onClick={previousSong}>
        <SkipIcon />
      </button>

      {/* Rewind Back Button */}
      <button className="control-btn rewind" onClick={handlePlayBack}>
        <RewindIcon />
      </button>

      {/* Play/Pause Button */}
      <button className="control-btn play-pause" onClick={togglePlayPause}>
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>

      {/* Rewind Forward Button */}
      <button className="control-btn rewind next" onClick={handlePlayForward}>
        <RewindIcon className="mirrored" />
      </button>

      {/* Next Track Button */}
      <button className="control-btn next" onClick={handleNextSong}>
        <SkipIcon className="mirrored" />
      </button>

      {/* Repeat Button */}
      <button className="control-btn repeat" onClick={handleLooping}>
        {isLoop ? <RepeatClickedIcon /> : <RepeatIcon />}
      </button>
    </div>
  );
};

export default Controls;