import { BaseChart } from "./BaseChart";
import * as Chart from "chart.js";

export class LineChart extends BaseChart{

    LineLabel: string;
    LineColor: [number, number, number];

    constructor(chartHeader: string, nodeTitles: string[], nodeColors: [number, number, number][], chartData: any, canvas: any, lineLabel: string, lineColor: [number, number, number], chartSize: string = "256"){
        super(chartHeader, "line", nodeTitles, nodeColors, chartData, canvas, chartSize);
        this.LineLabel = lineLabel;
        this.LineColor = lineColor;
    }

    Draw(){
        let chart = new Chart(this.Canvas.getContext("2d"), {
            type: this.ChartType,
            data: {
                labels: this.ChartTitles,
                datasets: [{
                    label: this.LineLabel,
                    data: this.ChartData,
                    backgroundColor: 'rgba('+ this.LineColor[0] +', '+this.LineColor[1]+', '+this.LineColor[2]+', 0.2)',
                    borderColor: 'rgba('+ this.LineColor[0] +', '+this.LineColor[1]+', '+this.LineColor[2]+', 1)',
                    pointBackgroundColor: super.GetChartColors(true),
                    pointBorderColor: super.GetChartColors(),
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: false
            }
        });

        chart.canvas.style.height = this.ChartSize;
        chart.canvas.style.height = this.ChartSize;
    }
}
