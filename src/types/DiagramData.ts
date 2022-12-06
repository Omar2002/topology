import {Point} from './Point';
import {Domain} from './Domain';

export interface Site {
    x: number;
    y: number;
    voronoiId: number;
}

export interface Edge {
    lSite: Site;
    rSite: Site | null;
    vb: Point;
    va: Point;
}

export type HalfEdge = {
    site: Site;
    edge: Edge;
    angle: number;
}

export type Cell = {
    site: Site;
    halfedges: HalfEdge[];
    closeMe: boolean;
    selected: boolean;
    domain?: Domain;
}

export type DiagramData = {
    cells: Cell[];
    edges: Edge[];
    vertices: Point[];
    execTime: number;
}
