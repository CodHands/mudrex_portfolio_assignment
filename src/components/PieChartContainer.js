import React from 'react'

//pie chart import
import {Pie} from 'react-chartjs-2';

const PieChartContainer = props => {
    return (
        <div style={{width: '60%', margin: '0 auto'}}>
            <Pie data={props.data}
                width={200}
                height={200}
                options={{ 
                            maintainAspectRatio: true,
                            legend: {
                                display: false,
                                position: 'top',
                                labels: {
                                    fontFamily: 'Barlow',
                                    fontSize: 14
                                }
                            },
                            plugins: {
                                labels: {
                                    render: 'value'
                                }
                            },
                            tooltips: {
                                callbacks: {
                                label: function(tooltipItem, data) {
                                    var dataset = data.datasets[tooltipItem.datasetIndex];
                                    var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                                    var total = meta.total;
                                    var currentValue = dataset.data[tooltipItem.index];
                                    var percentage = parseFloat((currentValue/total*100).toFixed(1));
                                    return  percentage + '%';
                                },
                                title: function(tooltipItem, data) {
                                    return data.labels[tooltipItem[0].index];
                                }
                                }
                            } 
                    }}   
            />
        </div>
    )
}

export default PieChartContainer
