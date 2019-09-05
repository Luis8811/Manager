import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public language = 'es';
  keysOfTitlesOfPages = ['home_menu_button', 'products_menu_button', 'finances_menu_button', 'processes_menu_button', 'close_session_menu_button'];
  public appPages = [
    {
      title: 'home_menu_button',
      url: '/home/es',
      icon: 'home'
    },
    {
      title: 'products_menu_button',
      url: '/list/es',
      icon: 'list'
    },
    {
      title: 'finances_menu_button',
      url: '/finances/es',
      icon: 'cash'
    }, 
    {
      title: 'processes_menu_button',
      url: '/processes/es',
      icon: 'settings'
    },
    {
      title: 'close session_menu_button',
      url:'/login',
      icon: 'key'
    } 
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    this.setLanguage();
  }

  setLanguage() {
    console.log('Method setLanguage>>>>>');
    this.translate.use(this.language);
    let translations = new Array();
    for(let i = 0; i < this.keysOfTitlesOfPages.length; i++) {
      this.translate.get(this.keysOfTitlesOfPages[i]).subscribe((res: string) => {
        console.log(res)
        translations.push(res);
        this.appPages[i].title = translations[i];
        if (this.appPages[i].url.indexOf('/es') >= 0 || this.appPages[i].url.indexOf('/en') >= 0) {
          console.log('Current url:' + this.appPages[i].url);
          let url = this.appPages[i].url.substring(0, this.appPages[i].url.length-2);
          this.appPages[i].url = url;
          this.appPages[i].url += this.language;
          console.log('New url: ' + this.appPages[i].url);
        }
      });
    }
    console.log('End of method setLanguage>>>>');
  }
}
