import { getRandomPoint } from '../mock/point';

const POINT_COUNT = 3;

export default class PointsModel {
  points = Array.from({length: POINT_COUNT}, getRandomPoint);

  getPoints() {
    return this.points;
  }
}
