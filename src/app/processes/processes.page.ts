import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import {DailySummaryOfOrder} from '../models/dailySummaryOfOrder';
import {RestaurateurService} from '../restaurateur.service';
import * as moment from 'moment';
import {StatisticsOfOrders} from '../models/statisticsOfOrders';
import {SoldProductsSummary} from '../models/soldProductsSummary';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.page.html',
  styleUrls: ['./processes.page.scss'],
})
export class ProcessesPage implements OnInit {
  private language = 'es';
  public salesSummary: Array<{ nameOfProduct: string; weeklySales: string; monthlySales: string; dailySales: string}> = [];
  weeklySummaryOfOrdersChart: Chart;
  @ViewChild('weeklySummaryOfOrdersChartContainer') weeklySummaryOfOrdersChartContainer: ElementRef;
  @ViewChild('weeklySummaryOfOrdersChartCanvas') weeklySummaryOfOrdersChartCanvas: ElementRef;
  monthlySummaryOfOrdersChart: Chart;
  @ViewChild('monthySummaryOfOrdersChartContainer') monthlySummaryOfOrdersChartContainer: ElementRef;
  @ViewChild('monthlySummaryOfOrdersChartCanvas') monthlySummaryOfOrdersChartCanvas: ElementRef;
  public weeklySummaryOfOrders: DailySummaryOfOrder[]; 
  public labelsOfWeeklySummaryOrOrder = ['Opened orders', 'Closed orders', 'Canceled orders'];
  public weeklySummaryOfOrdersBarChartData: any[] = [
   {data:[100, 60, 40], label:"L", backgroundColor: 'rgba(255, 99, 132, 0.2)'},
   {data:[170, 70, 100], label:"M", backgroundColor: 'rgba(190, 99, 132, 0.2)'},
   {data:[150, 32, 100], label:"X", backgroundColor: 'rgba(110, 99, 132, 0.2)'},
   {data:[110, 12, 90], label:"J", backgroundColor: 'rgba(90, 99, 100, 0.2)'},
   {data:[160, 122, 90], label:"V", backgroundColor: 'rgba(70, 99, 130, 0.2)'},
   {data:[160, 122, 90], label:"S", backgroundColor: 'rgba(170, 120, 130, 0.2)'},
   {data:[150, 122, 90], label:"D", backgroundColor: 'rgba(140, 120, 100, 0.2)'}
  ];
  private daysOfWeekInEnglish = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'];
  private daysOfWeekInSpanish = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  private monthlySummaryOfOrders: StatisticsOfOrders;
  private monthlySummaryOfOrdersDoughnutData = [{
    data: [120, 40, 30],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(50, 100, 200, 0.2)'
    ]
  }];
  private labelsOfMonthlySummaryOfOrdersInEnglish = ['Closed', 'Canceled', 'Opened'];
  private labelsOfMonthlySummaryOfOrdersInSpanish = ['Cerrados', 'Cancelados', 'Abiertos'];
  private labelsOfMonthlySummaryOfOrders = ['Closed', 'Canceled', 'Opened'];
  private soldProductsSummary: SoldProductsSummary;

  constructor(private restaurateurService: RestaurateurService, private translate: TranslateService, private activatedRoute: ActivatedRoute) { 
    // FIXME Change for the real data from the API
   // this.createMockupDataOfSales();
  }

  createMockupDataOfSales() {
    const products = ['Soup of vegetables', 'Coffee', 'Pizza', 'Wine', 'Beer', 'Ice cream', 'Beans and pork'];
    const weeklySales = ['10', '10', '10', '7', '7', '6', '0'];
    const monthlySales = ['20', '19', '18', '25', '35', '40', '20'];
    const dailySales = ['1', '3', '4', '4', '1', '0', '2'];

    for (let i = 0; i < products.length; i++) {
      this.salesSummary.push({
        nameOfProduct: products[i],
        weeklySales: weeklySales[i],
        monthlySales: monthlySales[i],
        dailySales: dailySales[i]
      });
    }
  }

  ngOnInit() {
    this.language = this.activatedRoute.snapshot.paramMap.get('language');
    this.translate.use(this.language);
    this.getWeeklySummaryOfOrders();
    this.getMonthlySummaryOfOrders();
    this.getSoldProductsSummary();
  }

  ngAfterViewInit() {
   // this.createWeeklySummaryOfOrdersChart();
   // this.createMonthlySummaryOfOrdersChart();
  }

  createWeeklySummaryOfOrdersChart() {
    this.weeklySummaryOfOrdersChart = new Chart(this.weeklySummaryOfOrdersChartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.labelsOfWeeklySummaryOrOrder,
        datasets: this.weeklySummaryOfOrdersBarChartData},
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

  createMonthlySummaryOfOrdersChart() {
    this.monthlySummaryOfOrdersChart = new Chart(this.monthlySummaryOfOrdersChartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.labelsOfMonthlySummaryOfOrders,
        datasets: this.monthlySummaryOfOrdersDoughnutData
      }
    });
  }

  getWeeklySummaryOfOrders() {
    this.restaurateurService.getWeeklySummaryOfOrders().subscribe((data: DailySummaryOfOrder[]) => {
      this.weeklySummaryOfOrders = data;
      console.log('Getting the weekly summary of orders...');
      console.log(this.weeklySummaryOfOrders);
      for(let i = 0; i < this.weeklySummaryOfOrders.length; i++) {
        this.weeklySummaryOfOrdersBarChartData[i].label = this.weeklySummaryOfOrders[i].date;

        if (this.language == 'es') {
          this.weeklySummaryOfOrdersBarChartData[i].label += ' (' + this.daysOfWeekInSpanish[moment(this.weeklySummaryOfOrders[i].date).weekday()] + ')';
        } else {
          this.weeklySummaryOfOrdersBarChartData[i].label += ' (' + this.daysOfWeekInEnglish[moment(this.weeklySummaryOfOrders[i].date).weekday()] + ')';
        }
        this.weeklySummaryOfOrdersBarChartData[i].data[0] = this.weeklySummaryOfOrders[i].openedOrders;
        this.weeklySummaryOfOrdersBarChartData[i].data[1] = this.weeklySummaryOfOrders[i].closedOrders;
        this.weeklySummaryOfOrdersBarChartData[i].data[2] = this.weeklySummaryOfOrders[i].canceledOrders;
      }
      if (this.language == 'es') {
        this.labelsOfWeeklySummaryOrOrder = ['Pedidos abiertos', 'Pedidos cerrados', 'Pedidos cancelados'];
      } else {
        this.labelsOfWeeklySummaryOrOrder = ['Opened orders', 'Closed orders', 'Canceled orders'];
      }
      this.createWeeklySummaryOfOrdersChart();
    });
  }

  getMonthlySummaryOfOrders() {
    this.restaurateurService.getMonthlySummaryOfOrders().subscribe((data: StatisticsOfOrders) => {
      this.monthlySummaryOfOrders = data;
      console.log('Getting the monthly summary of orders...');
      console.log(this.monthlySummaryOfOrders);
      console.log('Updating the chart of monthly summary of orders...');
      this.monthlySummaryOfOrdersDoughnutData[0].data[0] = this.monthlySummaryOfOrders.closedOrders;
      this.monthlySummaryOfOrdersDoughnutData[0].data[1] = this.monthlySummaryOfOrders.canceledOrders;
      this.monthlySummaryOfOrdersDoughnutData[0].data[2] = this.monthlySummaryOfOrders.openedOrders;
      if (this.language == 'es') {
        this.labelsOfMonthlySummaryOfOrders = this.labelsOfMonthlySummaryOfOrdersInSpanish;
      } else {
        this.labelsOfMonthlySummaryOfOrders = this.labelsOfMonthlySummaryOfOrdersInEnglish;
      }
      this.createMonthlySummaryOfOrdersChart();
    });
  }

  getSoldProductsSummary() {
    this.restaurateurService.getSoldProductsSummary().subscribe((data: SoldProductsSummary) => {
      this.soldProductsSummary = data;
      console.log('getting the sold products summary...');
      console.log(this.soldProductsSummary);
      console.log('Updating the GUI with the data from the sold products obtained from the API...');
      this.salesSummary = [];
      for (let i = 0; i < this.soldProductsSummary.soldProducts.length; i++) {
        this.salesSummary.push({
          nameOfProduct: this.soldProductsSummary.namesOfProducts[i],
          weeklySales: this.soldProductsSummary.countOfSellsInPreviousWeek[i].toString(),
          monthlySales: this.soldProductsSummary.countOfSellsInCurrentMonth[i].toString(),
          dailySales: this.soldProductsSummary.countOfSellsToday[i].toString()
        });
      }
    });
  }

}
