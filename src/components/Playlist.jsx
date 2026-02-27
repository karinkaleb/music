import React from "react";
import TrackCard from "./TrackCard";
import Statistics from "./Statistics";
import { parseTime } from "../utils";
import "../styles/playlist.css";
import { ReactComponent as ClockIcon } from "../assets/icons/clock.svg";

const Playlist = ({
  tracks,          // Полный массив всех треков
  filteredTracks,  // Опциональный отфильтрованный список
  trackIndex,
  setTrackIndex,
  favorites,
  toggleFavorite
}) => {
  // Определяем какие треки отображать
  const displayTracks = filteredTracks || tracks;

  // Рассчет общей продолжительности для отображаемых треков
  const totalDuration = displayTracks.reduce(
    (sum, track) => sum + parseTime(track.duration),
    0
  );

  // Обработчик выбора трека с поиском в исходном массиве
  const handleChooseTrack = (trackId) => {
    const globalIndex = tracks.findIndex(t => t.id === trackId);
    if (globalIndex !== -1) setTrackIndex(globalIndex);
  };

  return (
    <div className="playlist">
      <Statistics
        totalTracks={displayTracks.length}
        totalDuration={totalDuration}
        favoritesCount={favorites.size}
      />

      <div className="track-header">
        <span>#</span>
        <span>Название</span>
        <span>Избранные</span>
        <span className="duration-header">
          <ClockIcon className="header-clock-icon" />
        </span>
      </div>

      {displayTracks.map((track) => (
        <TrackCard
          key={track.id}
          number={tracks.indexOf(track) + 1} // Глобальный номер в исходном массиве
          track={track}
          onChoose={() => handleChooseTrack(track.id)}
          isActive={track.id === tracks[trackIndex]?.id}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
};

export default Playlist;