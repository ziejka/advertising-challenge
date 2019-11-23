import React from 'react'
import { Line } from "react-chartjs-2"
import { convertToChartData } from './operations'

const options = {
    responsive: true,
    hoverMode: 'index',
    stacked: false,
    title: {
        display: true,
        text: 'Clicks and impressions in weeks'
    },
    spanGaps: true,
    scales: {
        yAxes: [{
            type: 'linear',
            display: true,
            position: 'left',
            id: 'y-axis-1',
        }, {
            type: 'linear',
            display: true,
            position: 'right',
            id: 'y-axis-2',
            gridLines: {
                drawOnChartArea: false,
            },
        }],
    }
}

export const Chart = ({ dataSet, filters }) => <Line data={convertToChartData(dataSet, filters)} options={options} />