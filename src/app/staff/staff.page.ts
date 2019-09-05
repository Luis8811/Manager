import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.page.html',
  styleUrls: ['./staff.page.scss'],
})
export class StaffPage implements OnInit {
  staffChart: Chart;
  @ViewChild('staffChartContainer') staffChartContainer: ElementRef;
  @ViewChild('staffChartCanvas') staffChartCanvas: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.createStaffChart();
  }

  createStaffChart() {
    this.staffChart = new Chart(this.staffChartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['cook (F)', 'cook (M)', 'waitresses (F)', 'waiter (M)'],
        datasets: [{
          data: [32, 20, 10, 30],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2',
            'rgba(54, 162, 235, 0.2'
          ], label: 'Count of personnel'
        }]
      }
    });
  }


}
