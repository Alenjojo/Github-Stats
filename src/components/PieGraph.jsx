import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const PieGraph = ({ data, langChartlabel, langChartbackgroundColor, langChartborderColor }) => {

    const buildLegend = legend => {
    const leg = {
        position: 'right',
        langChartlabel: {
        fontFamily: 'Roboto',
        },
    };
  return legend ? leg : null;
};        return (
              <div className="bar">
                <Doughnut
                width={400}
                height={600}
                    data={{
                        labels: langChartlabel,
                        datasets: [{
                            data: data,
                            label:langChartlabel,
                             backgroundColor: langChartbackgroundColor,
                             borderColor: langChartborderColor,
                             borderWidth: 1
                        },
                         ],
                    }}
                    options={{
                responsive: true,
                        maintainAspectRatio: false,
                legend: buildLegend(true),
                    }}
            />
                </div>
         );
}
 
export default PieGraph;