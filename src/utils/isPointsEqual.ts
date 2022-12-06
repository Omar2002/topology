import {Point} from '../types/Point';

export function isPointsEqual(a: Point, b: Point, epsilon = 0.000001): boolean {
    return Math.abs(a.x - b.x) <= epsilon && Math.abs(a.y - b.y) <= epsilon;
}
