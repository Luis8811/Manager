import { Component, OnInit, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { Chart } from 'chart.js';
import {RestaurateurService} from '../restaurateur.service';
import {FinancesSummary} from '../models/financesSummary';
import * as moment from 'moment';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-finances',
  templateUrl: './finances.page.html',
  styleUrls: ['./finances.page.scss'],
})
export class FinancesPage implements OnInit {
  myChart: Chart;
  lineChart: Chart;
  barChart: Chart;
  @ViewChild('chartContainer') chartcontainer: ElementRef;
  @ViewChild('chartcanvas') chartcanvas: ElementRef;
  @ViewChild('chartLineContainer') chartLineContainer: ElementRef;
  @ViewChild('chartLineCanvas') chartLineCanvas: ElementRef;
  @ViewChild('barChartContainer') barChartContainer: ElementRef;
  @ViewChild('barChartCanvas') barChartCanvas: ElementRef;
  public lineChartType: string = 'line';
  public lineChartLabels: string[] =["Mon", "Tue", "Wed", "Thurs", "Fri", "Sát", "Sun"];
  public lineChartDatasets: any[] = [{data:[10, 5, 3, 4, 2, 0, 2], label:"Income", backgroundColor: 'rgba(255, 99, 132, 0.2)'},{data:[3, 1, 1, 3, 2, 3, 3], label:"Costs", backgroundColor:'rgba(54, 162, 235, 0.2)'},{ data:[7, 4, 2, 3, 3, 2, 1], label:"Balance",backgroundColor: 'rgba(255, 206, 86, 0.2)'}];
  // public lineChartsColors = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'];
  public labelsOfDayOfWeekInEnglish = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  public labelsOfDayOfWeekInSpanish = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  private language = 'es';

  // Bar chart de la diferencia entre gastos e ingresos
  // FIXME Arreglar para poner en el gráfico los datos reales
  public financesBarChartType: string ='bar';
  public financesBarChartLabels: string[] = ["Income", "Costs", "Balance"];
  public financesBarChartLabelsInSpanish: string[] = ["Ingresos", "Costos", "Saldo"];
  public financesBarChartLabelsInEnglish: string[] = ["Income", "Costs", "Balance"];
  public financesBarChartData: any[] = [{data:[100, 60, 40], label:"Current month", backgroundColor: 'rgba(255, 99, 132, 0.2)'}, {data:[170, 70, 100], label:"Previous month"}];
  public weeklySummary: FinancesSummary[];
  public monthlySummary: FinancesSummary[];
  /*
   monthlySummary[0] is the current month
   monthlySummary[1] is the previous month
  */



  constructor(private restaurateurService: RestaurateurService,  private translate: TranslateService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.language = this.activatedRoute.snapshot.paramMap.get('language');
    this.translate.use(this.language);
    this.getWeeklySummary();
    this.getMonthlySummary();

  }

  ngAfterViewInit() {
   // this.createChart();
    this.createLineChart();
    this.createBarChart();
  }

  createChart() {   
    this.myChart = new Chart(this.chartcanvas.nativeElement, {
      type: 'horizontalBar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  createLineChart() {
    this.lineChart = new Chart(this.chartLineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.lineChartLabels,
        datasets: this.lineChartDatasets},
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  createBarChart() {
    this.barChart = new Chart(this.barChartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.financesBarChartLabels,
        datasets: this.financesBarChartData},
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  // Gets the weekly summary of finances
  getWeeklySummary() {
    this.restaurateurService.getWeeklySummaryOfFinances().subscribe((data: FinancesSummary[]) => {
      this.weeklySummary = data;
      console.log('Getting the weekly summary of finances...');
      console.log(this.weeklySummary);
      console.log('Updating the chart of weekly summary of finances...');
      for (let i = 0; i < this.weeklySummary.length; i++) {
        this.lineChartDatasets[0].data[i] = this.weeklySummary[i].income;
        this.lineChartDatasets[1].data[i] = this.weeklySummary[i].cost;
        this.lineChartDatasets[2].data[i] = this.weeklySummary[i].balance;
        if (this.language == 'en'){
          this.lineChartLabels[i] = this.labelsOfDayOfWeekInEnglish[this.getDayOfWeek(this.weeklySummary[i].date)];
          this.lineChartDatasets[0].label = 'Income';
          this.lineChartDatasets[1].label = 'Costs';
          this.lineChartDatasets[2].label = 'Balance';
        } else {
          this.lineChartLabels[i] = this.labelsOfDayOfWeekInSpanish[this.getDayOfWeek(this.weeklySummary[i].date)];
          this.lineChartDatasets[0].label = 'Ingresos';
          this.lineChartDatasets[1].label = 'Costos';
          this.lineChartDatasets[2].label = 'Saldo';
        }  
      }
      this.createLineChart();
  });
}
// Returns the day of the week
getDayOfWeek(date: string) {
  const currentDate = moment(date);
  const dayOfWeek = currentDate.weekday();
  return dayOfWeek;
}

// Gets the monthly summary of finances
getMonthlySummary() {
console.log('Method getMonthlySummary in finances.page.ts>>>');
this.restaurateurService.getMonthlySummaryOfFinances().subscribe((data: FinancesSummary[]) => {
  this.monthlySummary = data;
  console.log('Getting the monthly summary of finances...');
  console.log(this.monthlySummary);
  console.log('Updating the chart of monthly summary of finances...');
  for (let i = 0; i < this.monthlySummary.length; i++) {
    this.barChart.data.datasets[i].data[0] = this.monthlySummary[i].income;
    this.barChart.data.datasets[i].data[1] = this.monthlySummary[i].cost;
    this.barChart.data.datasets[i].data[2] = this.monthlySummary[i].balance;
    this.financesBarChartData[i].data[0] = this.monthlySummary[i].income;
    this.financesBarChartData[i].data[1] = this.monthlySummary[i].cost;
    this.financesBarChartData[i].data[2] = this.monthlySummary[i].balance;
  }
  if (this.language == 'es'){
    console.log('Language is Spanish:')
    this.financesBarChartLabels =  ['Ingresos', 'Costos', 'Saldo'];//this.financesBarChartLabelsInSpanish;
    this.financesBarChartData[0].label = 'Mes actual';
    this.financesBarChartData[1].label = 'Mes anterior';
  } else {
    console.log('Language is English:');
    this.financesBarChartLabels = this.financesBarChartLabelsInEnglish;
    this.financesBarChartData[0].label = 'Current month';
    this.financesBarChartData[1].label = 'Previous month';
  }
  this.createBarChart();
});
console.log('End of method getMonthlySummary>>>>>');
}
  
}
