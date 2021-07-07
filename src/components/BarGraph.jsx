import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarGraphs = ({ data, langChartlabel, langChartbackgroundColor, langChartborderColor }) => {
        return (
              <div className="bar">
               <Bar
                    data={{
                        labels: langChartlabel,
                        datasets: [{
                            label: null,
                            data: data,
                             backgroundColor: langChartbackgroundColor,
                              borderColor: langChartborderColor,
            borderWidth: 1
                        },
                    ],
                }}
                width={400}
                height={600}
                options={{
                maintainAspectRatio: false,
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                    beginAtZero: true,
                                },
                            },
                          ]
                        }
                    }}
            />
                </div>
         );
}
 
export default BarGraphs;