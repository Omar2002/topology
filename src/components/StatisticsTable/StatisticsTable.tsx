import * as React from 'react';
import {Statistics} from '../../types/Statistics';
import styles from './StatisticsTable.css';

interface StatisticsProps {
    stats: Statistics[];
}

export const StatisticsTable = (props: StatisticsProps) => {
    const {
        stats,
    } = props;

    if (stats.length === 0) {
        return null;
    }

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th rowSpan={2}>Вероятность</th>
                    <th colSpan={2}>Количество доменов в диаграмме Вороного</th>
                    <th rowSpan={2}>Количество ячеек в диаграмме Вороного, из них имеющих значение 1</th>
                </tr>
                <tr>
                    <th>Всего</th>
                    <th>Из них неодносвязных</th>
                </tr>
            </thead>
            <tbody>
                {stats.map((stat) => {
                    return (
                        <tr
                            key={stat.timestamp}
                        >
                            <td>{stat.probability}</td>
                            <td>{stat.domainsCount}</td>
                            <td>{stat.notSimplyDomainsCount}</td>
                            <td>{`${stat.cellsCount} (${stat.selectedCellsCount})`}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
