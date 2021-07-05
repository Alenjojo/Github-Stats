import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

const PieGraph = ({ data, langChartlabel, langChartbackgroundColor, langChartborderColor }) => {
    console.log(langChartbackgroundColor)
        return (
              <div className="bar">
                <Doughnut
                width={400}
                height={600}
                    data={{
                        langChartlabel,
                        datasets: [{
                            data:data,
                             backgroundColor: langChartbackgroundColor,
                             borderColor: langChartborderColor,
                             borderWidth: 1
                        },
                         ],
                    }}
                    options={{
                responsive: true,
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
 
export default PieGraph;