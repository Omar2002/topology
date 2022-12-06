import {Cell} from '../types/DiagramData';
import {Point} from '../types/Point';
import {isPointsEqual} from './isPointsEqual';

export function getPolygonPoints(cell: Cell): string {
    const points: Point[] = [];
    const segments = cell.halfedges.map(({edge: {va, vb}}) => [va, vb]);
    points.push(segments[0][0]);

    while (segments.length > 0) {
        const lastPoint = points[points.length - 1];
        const index = segments.findIndex(([va, vb]) => {
            if (isPointsEqual(va, lastPoint)) {
                points.push(vb);
                return true;
            } else if (isPointsEqual(vb, lastPoint)) {
                points.push(va);
                return true;
            }
        });

        segments.splice(index, 1);
    }

    return points.map(({x, y}) => `${x},${y}`).join(' ');
}
