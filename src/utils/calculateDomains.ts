import {Cell, DiagramData, HalfEdge, Site} from '../types/DiagramData';
import {cloneDeep} from 'lodash';
import {Domain} from '../types/Domain';
import {generateColor} from './generateColor';

function getNeighborCell(halfEdge: HalfEdge, cells: Cell[]): Cell | null {
    const {
        site: {
            voronoiId,
        },
        edge: {
            lSite,
            rSite,
        },
    } = halfEdge;

    const neighborSite = [lSite, rSite].find((site: Site | null) => site === null || site.voronoiId !== voronoiId);

    return neighborSite === null ? null : cells[neighborSite.voronoiId];
}

export function calculateDomains(currentData: DiagramData): [DiagramData, Domain[]] {
    const data = cloneDeep(currentData);
    const {cells} = data;

    // Сбрасываем все домены
    cells.forEach((cell) => delete cell.domain);

    // Подсчет доменов
    let domains: Domain[] = [];
    const createNextDomain = (cell: Cell): Domain => {
        let newDomain: Domain = {
            cells: [cell],
            isSide: false,
            neighbors: [],
            selected: cell.selected,
            id: domains.length,
            color: generateColor(),
        }
        domains.push(newDomain);
        cell.domain = newDomain;
        return newDomain;
    }

    cells.forEach((cell) => {
        if (cell.domain) {
            return;
        }

        const domain = createNextDomain(cell);
        let queue = [cell];

        while (queue.length > 0) {
            let currentCell = queue.shift();
            let neighborCells = currentCell.halfedges.map((halfedge) => getNeighborCell(halfedge, cells));

            neighborCells.forEach((neighborCell: Cell | null) => {
                if (neighborCell === null) {
                    domain.isSide = true;
                    return;
                }

                if (neighborCell.domain) {
                    if (neighborCell.domain.id === domain.id) {
                        return;
                    }
                    if (domain.neighbors.indexOf(neighborCell.domain) === -1) {
                        domain.neighbors.push(neighborCell.domain);
                    }
                    if (neighborCell.domain.neighbors.indexOf(domain) === -1) {
                        neighborCell.domain.neighbors.push(domain);
                    }
                    return;
                }

                if (Boolean(neighborCell.selected) !== Boolean(cell.selected)) {
                    return;
                }

                neighborCell.domain = domain;
                domain.cells.push(neighborCell);

                queue.push(neighborCell);
            });
        }
    });

    return [data, domains];
}
