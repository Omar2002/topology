import {Cell} from './DiagramData';

export interface Domain {
    cells: Cell[];
    id: number;
    selected: boolean;
    neighbors: Domain[];
    isSide: boolean;
    color: string;
}
