import React from "react";
// Импорт SVG-иконок как React-компонентов
import { ReactComponent as DefaultCover } from "../assets/icons/default_cover.svg";
import { ReactComponent as HeartIcon } from "../assets/icons/heart.svg";
import { ReactComponent as HeartFilledIcon } from "../assets/icons/heart-filled.svg";
// Стили компонента
import "../styles/track-info.css";

const TrackInfo = ({ track, favorites, toggleFavorite }) => {
  return (
    <div className="track-info">
      {/* Блок с обложкой трека */}
      <div className="track-cover">
        {/* Условный рендеринг: кастомная или дефолтная обложка */}
        {track?.cover ? (
          <img
            src={track.cover}
            alt={`Обложка: ${track?.title} - ${track?.artist}`}
            loading="lazy" // Ленивая загрузка изображения
          />
        ) : (
          <DefaultCover aria-label="Дефолтная обложка" />
        )}
      </div>
      
      {/* Блок с названием трека и управлением избранным */}
      <div className="track-title">
        {/* Обертка для заголовка и кнопки избранного */}
        <div className="title-with-heart">
          <h1>{track?.title || "Неизвестный трек"}</h1>
          
          {/* Кнопка добавления в избранное с иконкой */}
          <button
            className="heart-btn"
            onClick={() => track?.id && toggleFavorite(track.id)}
            aria-label={
              favorites.has(track?.id) 
                ? "Удалить из избранного" 
                : "Добавить в избранное"
            }
            disabled={!track?.id} // Блокировка при отсутствии трека
          >
            {/* Переключение между состояниями иконки сердца */}
            {favorites.has(track?.id) ? (
              <HeartFilledIcon 
                className="heart-icon" 
                aria-hidden="true" 
              />
            ) : (
              <HeartIcon 
                className="heart-icon" 
                aria-hidden="true" 
              />
            )}
          </button>
        </div>
        
        {/* Блок с именем исполнителя */}
        <h3>{track?.artist || "Неизвестный исполнитель"}</h3>
      </div>
    </div>
  );
};

export default TrackInfo;