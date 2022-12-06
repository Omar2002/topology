import {Statistics} from '../types/Statistics';
import {Domain} from '../types/Domain';
import {DiagramData} from '../types/DiagramData';

const STAT_MAX_LENGTH = 10;

export function getStat(
    currentStatistics: Statistics[],
    domains: Domain[],
    diagramData: DiagramData,
    cellsCount: number,
    probability: number,
): Statistics[] {
    const selectedDomains = domains.filter((domain) => domain.selected);

    const notSimplyDomainsCount = selectedDomains
        .filter((domain) => domain.neighbors.filter(
            (neighborDomain) => !neighborDomain.selected && !neighborDomain.isSide).length > 0
        ).length;

    const selectedCellsCount = diagramData.cells.filter((cell) => cell.selected).length

    const newStat = {
        timestamp: new Date().getTime(),
        domainsCount: selectedDomains.length,
        notSimplyDomainsCount,
        probability,
        cellsCount,
        selectedCellsCount,
    };

    if (currentStatistics.push(newStat) > STAT_MAX_LENGTH) {
        currentStatistics.splice(0,1);
    }

    return currentStatistics.concat();
}
