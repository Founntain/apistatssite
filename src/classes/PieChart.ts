import * as Chart from "chart.js";
import { BaseChart } from "./BaseChart";

export class PieChart extends BaseChart{

    private Chart: Chart;
    private Responsive: boolean;
    private MaintainAspecRatio: boolean;

    constructor(chartHeader: string, legendTitles: string[], legendColors: [number, number, number][], chartData: any, canvas: any, responsive: boolean, maintainAspectRatio: boolean, chartSize: string = "256"){
        super(chartHeader, "pie", legendTitles, legendColors, chartData, canvas, chartSize);

        this.Responsive = responsive;
        this.MaintainAspecRatio = maintainAspectRatio;
    }

    Refresh(){
        console.log(this.ChartHeader + " refreshed");
        this.Chart.update();
    }

    Draw(){
        this.Chart = new Chart(this.Canvas.getContext("2d"), {
            type: this.ChartType,
            data: {
                labels: this.ChartTitles,
                datasets: [{
                    data: this.ChartData,
                    backgroundColor: super.GetChartColors(true),
                    borderColor: super.GetChartColors(),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: this.Responsive,
                maintainAspectRatio: this.MaintainAspecRatio,
                legend: {
                    display: false
                }
            }
        });

        this.Chart.canvas.style.height = this.ChartSize;
        this.Chart.canvas.style.maxHeight = "512px";
        this.Chart.canvas.style.maxWidth = "512px";
    }
}