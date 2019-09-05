import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {
  sexOfClientsChart: Chart;
  rangeOfAgeOfClientsChart: Chart;
  @ViewChild('sexOfClientsChartContainer') sexOfClientsChartContainer: ElementRef;
  @ViewChild('sexOfClientsChartCanvas') sexOfClientsChartCanvas: ElementRef;
  @ViewChild('rangeOfAgeOfClientsChartContainer') rangeOfAgeOfClientsChartContainer: ElementRef;
  @ViewChild('rangeOfAgeOfClientsChartCanvas') rangeOfAgeOfClientsChartCanvas: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
     this.createSexOfClientsDoughnutChart();
     this.createRangeOfAgeOfClientsChart();
   }

  createSexOfClientsDoughnutChart() {
    this.sexOfClientsChart = new Chart(this.sexOfClientsChartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Women', 'Men'],
        datasets: [{
          data: [32, 20],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)']
        }]
      }
    });
  }

  createRangeOfAgeOfClientsChart() {
    this.rangeOfAgeOfClientsChart = new Chart(this.rangeOfAgeOfClientsChartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['teenagers (F)', 'teenagers (M)', 'adults (F)', 'adults (M)'],
        datasets: [{
          data: [32, 20, 10, 30],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 0, 0, 0.8)',
            'rgba(0, 0, 255, 0.8'
          ]
        }]
      }
    });
  }

}
