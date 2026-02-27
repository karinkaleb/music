import React from "react";
// Утилита для преобразования времени в формат мм:сс
import { formatTime } from "../utils";

const Statistics = ({ totalTracks, totalDuration, favoritesCount }) => (
  <div className="statistics">
    {/* Блок с общей статистикой */}
    <div>Треков: {totalTracks}</div>         {/* Отображение количества треков */}
    <div>Общее время: {formatTime(totalDuration)}</div>  {/* Форматированное время */}
    <div>Избранных: {favoritesCount}</div>   {/* Счетчик избранных треков */}
  </div>
);

export default Statistics;