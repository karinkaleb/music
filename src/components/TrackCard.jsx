import React from "react";
import { ReactComponent as DefaultCover } from "../assets/icons/default_cover.svg";
import { ReactComponent as HeartIcon } from "../assets/icons/heart.svg";
import { ReactComponent as HeartFilledIcon } from "../assets/icons/heart-filled.svg";
import "../styles/track-card.css";

const TrackCard = ({
  number,
  track,
  onChoose,
  isActive,
  favorites,
  toggleFavorite
}) => {
  return (
    <div 
      className={isActive ? "track-card active" : "track-card"} 
      onClick={onChoose}
    >
      {/* Блок с порядковым номером трека */}
      <div className="track-number">{number}</div>

      {/* Основная информация о треке */}
      <div className="info-div">
        <h3>{track?.title}</h3>
        <p>{track?.artist}</p>
      </div>

      {/* Блок обложки трека */}
      <div className="cover-div">
        {track?.cover ? (
          <img
            src={track.cover}
            alt={`Обложка: ${track.title} - ${track.artist}`}
            loading="lazy"
          />
        ) : (
          <DefaultCover />
        )}
        {isActive && (
          <div className="soundwave">
            {[...Array(6)].map((_, i) => <div key={i} className="bar" />)}
          </div>
        )}
      </div>

      {/* Блок управления избранным */}
      <div className="favorite-cell">
        <button
          className="heart-btn"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(track.id);
          }}
          aria-label={
            favorites.has(track.id) 
              ? "Удалить из избранного" 
              : "Добавить в избранное"
          }
        >
          {favorites.has(track.id) ? (
            <HeartFilledIcon className="heart-icon" />
          ) : (
            <HeartIcon className="heart-icon" />
          )}
        </button>
      </div>

      {/* Блок длительности трека */}
      <div className="duration-div">
        <p>{track?.duration}</p>
      </div>
    </div>
  );
};

export default TrackCard;