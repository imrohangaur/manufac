import data from '../Wine-Data.json';
import { calculateMean, calculateMedian, calculateMode } from '../utils/statistics';

function GammaStatistics(): JSX.Element {

    // Utility function to calculate class-wise statistics for Gamma
    const calculateClassStatistics = (data: any) => {
        const statistics: any = {};

        for (const item of data) {
            const className = item.Alcohol.toString(); // Get class name
            const gamma = (item.Ash * item.Hue) / item.Magnesium;

            if (!statistics[className]) {
                statistics[className] = {
                    gamma: []
                };
            }

            statistics[className].gamma.push(parseFloat(gamma.toFixed(3)));
        }

        for (const className in statistics) {
            statistics[className].mean = calculateMean(statistics[className].gamma).toFixed(3);
            statistics[className].median = calculateMedian(statistics[className].gamma).toFixed(3);
            statistics[className].mode = calculateMode(statistics[className].gamma);
        }

        return statistics;
    };

    const classStatistics = calculateClassStatistics(data);

    return (
        <div>
            <h1>Gamma Table</h1>
            <table className='custom-table'>
                <thead>
                    <tr>
                        <th>Class</th>
                        <th>Gamma Mean</th>
                        <th>Gamma Median</th>
                        <th>Gamma Mode</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(classStatistics).map(([className, stats]: [string, any]) => (
                        <tr key={className}>
                            <td>Class {className}</td>
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

export default GammaStatistics;