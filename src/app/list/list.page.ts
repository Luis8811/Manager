import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute} from '@angular/router';
import {RestaurateurService} from '../restaurateur.service';
import {Product} from '../models/product';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private language = 'es';
  private searchPlaceHolder = '';
  private textOfSearch = '';
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  public beverages: Array<{ title: string; note: string; icon: string }> = [];
  public dishes: Array<{ title: string; note: string; icon: string }> = [];
  public products: Product[];
  constructor(private restaurateurService: RestaurateurService, private translate: TranslateService, private activatedRoute: ActivatedRoute) {
    const products = ['Soup of vegetables', 'Coffee', 'Pizza', 'Wine', 'Beer', 'Ice cream', 'Beans and pork'];
    const prices = ['10.5 Euros', '1.3 Euros', '3 Euros', '2 Euros', '1.4 Euros', '2 Euros', '13 Euros'];
    const iconsOfProducts = ['nutrition', 'cafe', 'pizza', 'wine', 'beer', 'ice-cream', 'restaurant'];

    for (let i = 0; i < products.length; i++) {
      this.items.push({
        title: products[i],
        note: prices[i],
        icon: iconsOfProducts[i]
      });
    }

    this.beverages.push(this.items[1]);
    this.beverages.push(this.items[3]);
    this.beverages.push(this.items[4]);

    this.dishes.push(this.items[0]);
    this.dishes.push(this.items[2]);
    this.dishes.push(this.items[5]);
    this.dishes.push(this.items[6]);
  }

  search(event) {
    this.textOfSearch = event.detail.value;
  }

  ngOnInit() {
    this.language = this.activatedRoute.snapshot.paramMap.get('language');
    this.translate.use(this.language);
    this.getProducts();
    this.translate.get('search').subscribe((res : string) => {
      this.searchPlaceHolder = res;
    });
  }

  getProducts() {
    this.restaurateurService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      console.log('Getting the products from the API...');
      console.log(this.products);
      console.log('Updating the GUI with the products obtained...');
      this.dishes = [];
      this.beverages = [];
      this.items = [];
      let countOfDishes = 0;
      let countOfBeverages = 0;
      let currentIcon = '';
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].type == 'dish') {
          switch (this.products[i].description) {
            case 'pizza' : {
              currentIcon = 'pizza';
              break;
            }
            case 'vegetales' : {
              currentIcon = 'nutrition';
              break;
            }
            case 'vegetables' : {
              currentIcon = 'nutrition';
              break;
            }
            default : {
              currentIcon = 'restaurant';
              break;
            }
          }
          let item = {title: this.products[i].name, note: this.products[i].price.toString() + ' Euros', icon: currentIcon};
          this.items.push(item);
          this.dishes.push(item);
        } else {
          switch (this.products[i].description) {
            case 'coffee' : {
              currentIcon = 'cafe';
              break;
            }
            case 'café' : {
              currentIcon = 'cafe';
              break;
            }
            case 'wine' : {
              currentIcon = 'wine';
              break;
            }
            case 'vino' : {
              currentIcon = 'wine';
              break;
            }
            default : {
              currentIcon = 'beer';
              break;
            }
          }
          let item = {title: this.products[i].name, note: this.products[i].price.toString() + ' Euros', icon: currentIcon};
          this.items.push(item);
          this.beverages.push(item);
        }
      }
    });
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
