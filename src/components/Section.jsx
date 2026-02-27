import React from 'react';
import { useNavigate } from 'react-router-dom';

const Section = ({ 
  title, 
  items = [], 
  onShowAll,
  showAll,
  totalItems // Добавляем новый пропс для общего количества альбомов
}) => {
  const navigate = useNavigate();

  const handleAlbumClick = (albumId) => {
    navigate(`/album/${albumId}`);
  };

  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        
        {/* Показываем кнопку только если есть больше 5 альбомов */}
        {totalItems > 5 && (
          <button 
            className="show-all-button" 
            onClick={onShowAll}
          >
            {showAll ? "Свернуть" : "Показать все"}
          </button>
        )}
      </div>

      <div className="album-scroll-container">
        {items.map((album) => (
          <div
            key={album.id}
            className="album-card"
            onClick={() => handleAlbumClick(album.id)}
            role="button"
            tabIndex={0}
          >
            <img
              src={album.cover}
              alt={album.title}
              loading="lazy"
              className="album-cover"
            />
            <h3 className="album-title">{album.title}</h3>
            <p className="album-artist">{album.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section;