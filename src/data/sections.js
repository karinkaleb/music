import { tracks } from './tracks';

export const sectionsData = {
  topHits: tracks.slice(0, 5),
  forYou: tracks.slice(3, 8),
  recent: tracks.slice(5, 10)
};