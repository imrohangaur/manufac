import data from '../Wine-Data.json';
import { calculateMean, calculateMedian, calculateMode } from '../utils/statistics';
import '../styles/Flavanoids.css';

function Flavanoids(): JSX.Element {

    // Utility function to calculate class-wise statistics for Flavanoids
    const calculateClassStatistics = (data: any[]) => {
        const statistics: any = {};

        for (const item of data) {
            const nameOfClass = item.Alcohol.toString(); // Get class name
            const flavanoids = Number(item.Flavanoids);

            if (!statistics[nameOfClass]) {
                statistics[nameOfClass] = {
                    mean: [],
                    median: [],
                    mode: []
                };
            }

            statistics[nameOfClass].mean.push(flavanoids);
            statistics[nameOfClass].median.push(flavanoids);
            statistics[nameOfClass].mode.push(flavanoids);
        }

        for (const nameOfClass in statistics) {
            statistics[nameOfClass].mean = calculateMean(statistics[nameOfClass].mean).toFixed(3);
            statistics[nameOfClass].median = calculateMedian(statistics[nameOfClass].median).toFixed(3);
            statistics[nameOfClass].mode = calculateMode(statistics[nameOfClass].mode);
        }

        return statistics;
    };


    const classStatistics = calculateClassStatistics(data);

    return (
        <div>
            <h1>Flavanoids Table</h1>
            <table className='custom-table'>
                <thead>
                    <tr>
                        <th>Class</th>
                        <th>Flavanoids Mean</th>
                        <th>Flavanoids Median</th>
                        <th>Flavanoids Mode</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(classStatistics).map(([nameOfClass, stats]: [string, any]) => (
                        <tr key={nameOfClass}>
                            <td>Class {nameOfClass}</td>
                            <td>{stats.mean}</td>
                            <td>{stats.median}</td>
                            <td>{stats.mode.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Flavanoids;