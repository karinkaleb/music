import React, { useEffect } from "react";
// Утилита для преобразования времени в формат мм:сс
import { formatTime } from "../utils";
// Стили компонента прогресс-бара
import "../styles/progress-bar.css";

const ProgressBar = ({
  progressBarRef,
  audioPlayerRef,
  timeProgress,
  duration,
}) => {

  const handleChange = (e) => {
    const currentValue = e.target.value;
    const maxValue = e.target.max || 100; // Запасное значение для безопасности
    const fillPercentage = (currentValue / maxValue) * 100;
    
    // Синхронизация с аудио-элементом
    audioPlayerRef.current.currentTime = currentValue;
    
    // Обновление визуального представления
    progressBarRef.current.style.setProperty(
      "--fill-percentage",
      `${fillPercentage}%`
    );
  };

  // Эффект для синхронизации заполнения при изменении времени/длительности
  useEffect(() => {
    if (!progressBarRef.current) return;
    
    const currentValue = progressBarRef.current.value;
    const maxValue = progressBarRef.current.max || 100;
    const fillPercentage = (currentValue / maxValue) * 100;
    
    // Анимированное обновление заполнения
    progressBarRef.current.style.setProperty(
      "--fill-percentage",
      `${fillPercentage}%`
    );
  }, [timeProgress, duration, progressBarRef]);

  return (
    <div className="progress-bar">
      {/* Ползунок для управления временем воспроизведения */}
      <input
        type="range"
        ref={progressBarRef}
        value={timeProgress}
        min="0"
        max={duration || 100} // Запасное значение для корректного отображения
        step="0.1"
        onChange={handleChange}
        aria-label="Прогресс воспроизведения"
      />
      
      {/* Блок с отображением времени */}
      <div className="time-info">
        {/* Текущее время воспроизведения */}
        <span id="time-progress">{formatTime(timeProgress)}</span>
        {/* Общая длительность трека */}
        <span id="duration">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default ProgressBar;