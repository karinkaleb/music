import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Playlist from '../components/Playlist';
import '../styles/album-page.css'; // Используем стили альбомов
import { ReactComponent as BackIcon } from '../assets/icons/back.svg';
import { parseTime, formatTime } from '../utils';

const GenrePage = ({
  tracks,
  trackIndex,
  setTrackIndex,
  favorites,
  toggleFavorite
}) => {
  const { genreName } = useParams();
  const navigate = useNavigate();

  const genreTracks = tracks.filter(t => t.genre === genreName);
  const totalDuration = genreTracks.reduce(
    (sum, track) => sum + parseTime(track.duration), 
    0
  );

  if (!genreTracks.length) {
    return (
      <div className="album-page">
        <button
          className="back-button"
          onClick={() => navigate(-1)}
          aria-label="Назад"
        >
          <BackIcon />
        </button>
        <h1>Жанр не найден</h1>
      </div>
    );
  }

  return (
    <div className="album-page">
      <button
        className="back-button"
        onClick={() => navigate(-1)}
        aria-label="Назад"
      >
        <BackIcon />
      </button>

      <div className="album-header">
        <div>
          <h1 className="album-title">{genreName}</h1>
          <div className="album-meta">
            <span>{genreTracks.length} треков</span>
            <span>•</span>
            <span>Общее время: {formatTime(totalDuration)}</span>
          </div>
        </div>
      </div>

      <Playlist
        tracks={tracks}
        filteredTracks={genreTracks}
        trackIndex={trackIndex}
        setTrackIndex={setTrackIndex}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
};

export default GenrePage;