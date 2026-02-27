/**
 * Форматирует время в секундах в строку формата "мм:сс"
 * @param {number} time - Время в секундах
 * @returns {string} Отформатированная строка времени
 */
export const formatTime = (time) => {
  if (time && !isNaN(time)) {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  }
  return "0:00";
};

/**
 * Парсит строку времени формата "мм:сс" в количество секунд
 * @param {string} timeString - Время в формате строки
 * @returns {number} Общее количество секунд
 */
export const parseTime = (timeString) => {
  const [minutes, seconds] = timeString.split(':').map(Number);
  return minutes * 60 + (seconds || 0);
};