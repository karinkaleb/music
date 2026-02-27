import React, { useRef, useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import Controls from "./Controls";
import VolumeControl from "./VolumeControl";
import { ReactComponent as HeartIcon } from "../assets/icons/heart.svg";
import { ReactComponent as HeartFilledIcon } from "../assets/icons/heart-filled.svg";
import "../styles/player.css";

const Player = ({ 
  tracks, 
  trackIndex, 
  setTrackIndex,
  favorites,
  toggleFavorite 
}) => {
  const [isRandom, setIsRandom] = useState(false);
  const [isLoop, setLoop] = useState(false);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const audioPlayerRef = useRef();
  const progressBarRef = useRef();

  useEffect(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.volume = volume;
    }
  }, [volume]);

  const handleNextSong = () => {
    let newIndex = (trackIndex + 1) % tracks.length;
    if (isRandom) {
      do {
        newIndex = Math.floor(Math.random() * tracks.length);
      } while (trackIndex === newIndex);
    }
    setTrackIndex(newIndex);
  };

  const onLoadedMetadata = () => {
    const dur = audioPlayerRef.current.duration;
    setDuration(dur);
    progressBarRef.current.max = dur;
  };

  const progressProps = {
    progressBarRef,
    audioPlayerRef,
    timeProgress,
    duration
  };

  return (
    <div className="player">
      {/* Левая секция */}
      <div className="track-info">
        <img
          src={tracks[trackIndex]?.cover}
          className="album-cover-small"
          alt="Обложка трека"
          key={tracks[trackIndex]?.id} // Добавлен ключ для ререндера
        />
        <div className="track-meta">
          <h3>{tracks[trackIndex]?.title}</h3>
          <p>{tracks[trackIndex]?.artist}</p>
        </div>
        <button 
          className="heart-btn"
          onClick={() => toggleFavorite(tracks[trackIndex]?.id)}
        >
          {favorites.has(tracks[trackIndex]?.id) ? (
            <HeartFilledIcon className="heart-icon" />
          ) : (
            <HeartIcon className="heart-icon" />
          )}
        </button>
      </div>

      {/* Центральная секция */}
      <div className="player-center">
        <Controls
          audioPlayerRef={audioPlayerRef}
          isRandom={isRandom}
          setIsRandom={setIsRandom}
          handleNextSong={handleNextSong}
          trackIndex={trackIndex}
          setTrackIndex={setTrackIndex}
          tracks={tracks}
          isLoop={isLoop}
          setLoop={setLoop}
        />
        <ProgressBar {...progressProps} />
      </div>

      {/* Правая секция */}
      <VolumeControl volume={volume} setVolume={setVolume} />

      {/* Скрытый аудио элемент */}
      <audio
        src={tracks[trackIndex]?.src}
        ref={audioPlayerRef}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={(e) => setTimeProgress(e.target.currentTime)}
        onEnded={handleNextSong}
        loop={isLoop}
      />
    </div>
  );
};

export default Player;