export class BaseChart{
    ChartHeader: string;
    ChartType: string;
    ChartTitles: string[];
    ChartColors: [number, number, number][];
    ChartData: any;
    Canvas: HTMLCanvasElement;
    ChartSize: string;

    constructor(chartHeader: string, chartType: string, chartTitles: string[], chartColors: [number, number, number][], chartData: any, canvas: HTMLCanvasElement, chartSize: string = "256"){
        this.ChartHeader = chartHeader;
        this.ChartType = chartType;
        this.ChartTitles = chartTitles;
        this.ChartColors = chartColors;
        this.ChartData = chartData;
        this.Canvas = canvas
        this.ChartSize = chartSize;
    }

    public Draw() {
        return;
    }

    public Refresh() {
        return;
    }

    protected GetChartColors(backgroundColors: boolean = false): string[] {
        let output: string[] = [];

        for(const color of this.ChartColors)
            output.push('rgba('+ color[0] +', '+color[1]+', '+color[2]+', ' + (backgroundColors ? '0.2)' : '1)'));

        return output;
    }
}