import {Point} from '../../types/Point';

export class PointsGenerator {
    public static generate(count: number, maxX: number, maxY: number): Point[]  {
        return Array.from(new Array(count), () => ({
            x: Math.round(maxX * Math.random()),
            y: Math.round(maxY * Math.random()),
        }));
    }
}
