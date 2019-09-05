import { Component } from '@angular/core';
import {RestaurateurService} from '../restaurateur.service';
import {FinancesSummary} from '../models/financesSummary';
import {StatisticsOfOrders} from '../models/statisticsOfOrders';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public kpiOfFinances: Array<{ title: string; value: string; }> = [{title: 'Income', value: '-1'}, {title: 'Costs', value: '-1'}, {title: 'Balance', value: '-1'}];
  public kpiOfProcesses: Array<{ title: string; value: string; }> = [{title: 'Orders completed', value: '-1'}, {title: 'Orders canceled', value: '-1'}, {title: 'Orders opened', value: '-1'}];
  public dailyFinances: FinancesSummary;
  public dailyStatisticsOfOrders: StatisticsOfOrders;
  private language = null;
  constructor(private restaurateurService: RestaurateurService, private activatedRoute: ActivatedRoute, private translate: TranslateService, private appComponent: AppComponent) {
    this.getDailyFinances();
    this.getDailyStatisticsOfOrders();
    this.language = this.activatedRoute.snapshot.paramMap.get('language');
    this.translate.use(this.language);
    this.translateKPIs();
    this.appComponent.language = this.language;
    this.appComponent.setLanguage();
  }

  getDailyFinances() {
    this.restaurateurService.getDailyFinances().subscribe((data: FinancesSummary) => {
      this.dailyFinances = data;
      console.log(this.dailyFinances);
      console.log('Updating the KPIs of finances...');
      this.kpiOfFinances[0].value = this.dailyFinances.income.toString();
      this.kpiOfFinances[1].value = this.dailyFinances.cost.toString();
      this.kpiOfFinances[2].value = this.dailyFinances.balance.toString();
  });  
  }

  getDailyStatisticsOfOrders() {
    this.restaurateurService.getDailyStatisticsOfOrders().subscribe((data: StatisticsOfOrders) => {
      this.dailyStatisticsOfOrders = data;
      console.log(this.dailyStatisticsOfOrders);
      console.log('Updating the KPIs of orders...');
      this.kpiOfProcesses[0].value = this.dailyStatisticsOfOrders.closedOrders.toString();
      this.kpiOfProcesses[1].value = this.dailyStatisticsOfOrders.canceledOrders.toString();
      this.kpiOfProcesses[2].value = this.dailyStatisticsOfOrders.openedOrders.toString();
  });  
  }

  translateKPIs() {
    let keysToTranslate = ['income', 'costs', 'balance', 'orders_completed', 'orders_canceled', 'orders_opened'];
    let translations = new Array();
    for(let i = 0; i < keysToTranslate.length; i++) {
      this.translate.get(keysToTranslate[i]).subscribe((res: string) => {
        translations.push(res);
        switch (i) {
          case 0: {
            this.kpiOfFinances[0].title = translations[0];
            break;
          }
          case 1: {
            this.kpiOfFinances[1].title = translations[1];
            break;
          }    
          case 2: {
            this.kpiOfFinances[2].title = translations[2];
            break;
          }    
          case 3: {
            this.kpiOfProcesses[0].title = translations[3];
            break;
          }    
          case 4: {
            this.kpiOfProcesses[1].title = translations[4];
            break;
          }
          default: {
            this.kpiOfProcesses[2].title = translations[5];
            break;
          }                
        }
      });
    }
  }



}
