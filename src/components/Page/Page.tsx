import * as React from 'react';
import {Diagram} from '../Diagram';
import {NumberInput} from '../NumberInput';
import {Button} from '../Button/Button';
import {PointsGenerator} from '../../services/PointsGenerator';
import * as Voronoi from '../../utils/rhill-voronoi-core';
import {DiagramData} from '../../types/DiagramData';
import {calculateDomains} from '../../utils/calculateDomains';
import {Domain} from '../../types/Domain';
import {Statistics} from '../../types/Statistics';
import {getStat} from '../../utils/getStat';
import {StatisticsTable} from '../StatisticsTable';

const DIAGRAM_WIDTH = 600;
const DIAGRAM_HEIGHT = 400;

export const Page = () => {
    const [pointsCount, setPointsCount] = React.useState<number>(30);
    const [diagramData, setDiagramData] = React.useState<DiagramData>(null);
    const [domains, setDomains] = React.useState<Domain[]>([]);
    const [probability, setProbability] = React.useState<number>(0.5);
    const [stat, setStat] = React.useState<Statistics[]>([]);

    const onGenerateStart = React.useCallback(() => {
        let points = PointsGenerator.generate(pointsCount, DIAGRAM_WIDTH, DIAGRAM_HEIGHT);

        const voronoi = new Voronoi();
        const newResult: DiagramData = voronoi.compute(points, {xl: 0, xr: DIAGRAM_WIDTH, yt: 0, yb: DIAGRAM_HEIGHT});

        setDiagramData(newResult);
    }, [pointsCount, setDiagramData]);

    const onCellCLick = React.useCallback((voronoiId: number) => {
        diagramData.cells[voronoiId].selected = !diagramData.cells[voronoiId].selected;
        const [data, newDomains] = calculateDomains(diagramData);

        setDiagramData(data);
        setDomains(newDomains);
    }, [diagramData, setDiagramData]);

    const onFillAuto = React.useCallback(() => {
        diagramData.cells.forEach((cell) => cell.selected = Math.random() <= probability);
        const [data, newDomains] = calculateDomains(diagramData);

        setDiagramData(data);
        setDomains(newDomains);
        setStat(getStat(stat, newDomains, data, pointsCount, probability));
    }, [diagramData, probability, pointsCount, stat]);

    const domainsCount = React.useMemo(() => {
        return `Количество доменов: ${domains.filter((domain) => domain.selected).length}`;
    }, [domains]);

    const intConverter = React.useCallback((value: string): number => Number.parseInt(value, 10), []);

    return (
        <div>
            <NumberInput
                value={pointsCount}
                onChange={setPointsCount}
                convert={intConverter}
                min={0}
                max={100}
            />
            <Button
                title='Сгенерировать'
                onClick={onGenerateStart}
            />
            <NumberInput
                value={probability}
                onChange={setProbability}
                enabled={Boolean(diagramData)}
                min={0.01}
                max={0.99}
                step={0.1}
            />
            <Button
                title='АВТО'
                onClick={onFillAuto}
                enabled={Boolean(diagramData)}
            />
            <Diagram
                onCellClick={onCellCLick}
                diagramData={diagramData}
                width={DIAGRAM_WIDTH}
                height={DIAGRAM_HEIGHT}
            />
            <span>
                {domainsCount}
            </span>
            <StatisticsTable
                stats={stat}
            />
        </div>
    );
}
