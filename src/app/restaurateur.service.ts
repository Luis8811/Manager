import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpResponse   } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as moment from 'moment';
import {FinancesSummary} from './models/financesSummary';
import {StatisticsOfOrders} from './models/statisticsOfOrders';
import {DailySummaryOfOrder} from './models/dailySummaryOfOrder';
import {SoldProductsSummary} from './models/soldProductsSummary';
import {Product} from './models/product';
import {LoginResponse} from './models/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class RestaurateurService {

  constructor(private http: HttpClient) { }

  
        /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
     // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
     // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

    private log(message: string) {
      console.log(message);
    }

  // Returns the more sold products today
  getDailyFinances(): Observable<FinancesSummary>{
    const now = moment();
    const dataOfQuery = {
      "beginDate":now.format("YYYY-MM-DD"),
       "endDate":now.format("YYYY-MM-DD")
    };
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post('http://localhost:3000/api/financesInDateRange', dataOfQuery, httpOptions).pipe(
      tap((dailyFinances: FinancesSummary) => this.log('Daily finances were obtained.')),
      catchError(this.handleError<FinancesSummary>('getDailyFinances'))
    );
  }

  getDailyStatisticsOfOrders(): Observable<StatisticsOfOrders>{
    const now = moment();
    const dataOfQuery = {
      "beginDate":now.format("YYYY-MM-DD"),
       "endDate":now.format("YYYY-MM-DD")
    };
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post('http://localhost:3000/api/statisticsOfOrders', dataOfQuery, httpOptions).pipe(
      tap((dailyStatisticsOfOrders: StatisticsOfOrders) => this.log('Daily statistics of orders were obtained.')),
      catchError(this.handleError<StatisticsOfOrders>('getDailyStatisticsOfOrders'))
    );
  }

  getWeeklySummaryOfFinances(): Observable<FinancesSummary[]> {
    return this.http.get('http://localhost:3000/api/weeklySummaryOfFinances').pipe(map((res) => <any[]> res));
  }

  getMonthlySummaryOfFinances(): Observable<FinancesSummary[]> {
    return this.http.get('http://localhost:3000/api/monthlySummaryOfFinances').pipe(map((res) => <any[]> res));
  }

  getWeeklySummaryOfOrders(): Observable<DailySummaryOfOrder[]> {
    return this.http.get('http://localhost:3000/api/getWeeklySummaryOfOrders').pipe(map((res) => <any[]> res));
  }

  getProducts(): Observable<Product[]> {
    return this.http.get('http://localhost:3000/api/products').pipe(map((res) => <any[]> res));
  }

  getMonthlySummaryOfOrders(): Observable<StatisticsOfOrders> {
    return this.http.get<StatisticsOfOrders>('http://localhost:3000/api/getMonthlySummaryOfOrders');
  }

  getSoldProductsSummary(): Observable<SoldProductsSummary> {
    return this.http.get<SoldProductsSummary>('http://localhost:3000/api/getSummaryOfSoldProducts');
  }

   /* login(username: string, password: string): Observable<LoginResponse> {
    const dataOfQuery = {
      "user": username,
      "password": password
    };
    console.log('Login method in the service: >>>>')
    console.log('Username: ' + username);
    console.log('Password: ' + password);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post('http://localhost:3000/api/login', dataOfQuery, httpOptions).pipe(
      tap((loginProcess: LoginResponse) => this.log('The login process was performed')),
      catchError(this.handleError<LoginResponse>('login'))
    );
  } */
  login(username: string, password: string): Observable<HttpResponse<LoginResponse>> {
    const dataOfQuery = {
      "user": username,
      "password": password
    };
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'body'
    };
    return this.http.post<HttpResponse<LoginResponse>>('http://localhost:3000/api/loginAsAdmin', dataOfQuery, httpOptions).pipe(
      map(response => {return response})
    );
  }
}
