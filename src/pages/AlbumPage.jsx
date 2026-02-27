import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Playlist from '../components/Playlist';
import '../styles/album-page.css';
import { ReactComponent as BackIcon } from '../assets/icons/back.svg';

const AlbumPage = ({ 
  tracks = [], // Значение по умолчанию для пропса
  trackIndex,
  setTrackIndex,
  favorites,
  toggleFavorite 
}) => {
  const { albumId } = useParams();
  const navigate = useNavigate();

  // Фильтрация треков с мемоизацией
  const albumTracks = React.useMemo(
    () => tracks.filter(track => track.albumId === albumId),
    [tracks, albumId]
  );

  // Ранний возврат для отсутствующего альбома
  if (!albumTracks.length) {
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
          <h1>Альбом не найден</h1>
          <p>Попробуйте выбрать другой альбом</p>
        </div>
      </div>
    );
  }

  // Деструктуризация данных альбома
  const { cover: albumCover, genre = 'Неизвестный жанр' } = albumTracks[0];

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
        <img
          src={albumCover}
          alt={`Обложка альбома "${albumId}"`}
          className="album-cover-main"
          loading="lazy"
        />
        
        <div>
          <h1 className="album-title">{albumId}</h1>
          <div className="album-meta">
            <span>{albumTracks.length} {formatTrackCount(albumTracks.length)}</span>
            <span>•</span>
            <span>{genre}</span>
          </div>
        </div>
      </div>

      <Playlist
        tracks={tracks}
        filteredTracks={albumTracks}
        trackIndex={trackIndex}
        setTrackIndex={setTrackIndex}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
};

// Вспомогательная функция для склонения
const formatTrackCount = (count) => {
  const lastDigit = count % 10;
  if (lastDigit === 1) return 'трек';
  if (lastDigit > 1 && lastDigit < 5) return 'трека';
  return 'треков';
};

export default React.memo(AlbumPage);