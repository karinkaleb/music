import React from "react";
import Playlist from "../components/Playlist";
// Импортируем изображение
import favoritesCover from "../data/songs_covers/favorites.png"; 
import "../styles/favorites.css"; 

const Favorites = ({ tracks, trackIndex, setTrackIndex, favorites, toggleFavorite }) => (
  <div className="favorites-page">
    {/* Добавляем блок с изображением и заголовком */}
    <div className="favorites-header">
      <img
        src={favoritesCover}
        alt="Избранное"
        className="favorites-cover"
      />
      <h1>Избранное</h1>
    </div>

    {/* Передача пропсов в Playlist */}
    <Playlist
      tracks={tracks}
      trackIndex={trackIndex}
      setTrackIndex={setTrackIndex}
      favorites={favorites}
      toggleFavorite={toggleFavorite}
    />
  </div>
);

export default Favorites;