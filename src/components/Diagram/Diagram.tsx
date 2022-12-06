import * as React from 'react';

import styles from './Diagram.css';
import {DiagramData} from '../../types/DiagramData';
import {getPolygonPoints} from '../../utils/getPolygonPoints';

interface DiagramProps {
    diagramData: DiagramData | null;
    width?: number;
    height?: number;
    onCellClick: (voronoiId: number) => void;
}

const DiagramBase = (props: DiagramProps) => {
    const {
        diagramData,
        width = 600,
        height = 400,
        onCellClick,
    } = props;

    if (!diagramData) {
        return (<div className={styles.root}>Нет данных для отображения</div>);
    }

    const {cells} = diagramData;

    return (
        <div className={styles.root}>
            <svg
                className={styles.svg}
                viewBox={`0 0 ${width} ${height}`}
            >
                {
                    cells.map((cell) => {
                        const {
                            site,
                            selected,
                            domain,
                        } = cell;

                        const key = site.voronoiId;
                        const points = getPolygonPoints(cell);
                        const className = selected ? styles.selected : null;
                        const style = selected && domain?.color
                            ? {
                                fill: domain.color,
                            }
                            : null;

                        return (
                            <g key={key}>
                                <circle cx={site.x} cy={site.y} r='2' key={`circle_${key}`} />
                                <polygon
                                    points={points}
                                    key={`polygon_${key}`}
                                    className={className}
                                    style={style}
                                    onClick={() => onCellClick(site.voronoiId)}
                                />
                            </g>
                        )
                    })
                }
            </svg>
        </div>
    );
}

export const Diagram = React.memo(DiagramBase);
