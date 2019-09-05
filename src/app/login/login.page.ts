import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {RestaurateurService} from '../restaurateur.service';
import { LoginResponse } from '../models/loginResponse';
import {HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public user = '';
  public password = '';
  private language = 'es';
  private userPlaceHolder = 'Usuario';
  private passwordPlaceHolder = 'Contraseña';
  loginResponse: LoginResponse;
  

  constructor(private router: Router, private alertController: AlertController, private translate: TranslateService,
     private restaurateurService: RestaurateurService) { }

  ngOnInit() {
  }

  /* async login() {
      this.restaurateurService.login(this.user, this.password).subscribe((data: LoginResponse) => {
        console.log('Calling the service of login:');
        this.loginResponse = data;
      });
      console.log('Waiting 9 seconds for the response of the service of login...');
      await this.delay(9000);
} */

async login() {
  let responseOfService = new LoginResponse();
  this.restaurateurService.login(this.user, this.password).subscribe((data : HttpResponse<LoginResponse>) => {
    if (data.status == 204) {
      this.router.navigate(['/home',this.language]);
    }
  }, error => {
    this.failedLogin();
  });
}

/* async delay(ms: number) {
  await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=> {

    if (this.loginResponse === undefined) {
      console.log('After  9 seconds the login response is undefined...');
      this.failedLogin(); 
    } else {
      console.log('The login response obtained:');
      console.log(this.loginResponse);
      if (this.loginResponse.loginSuccessful === true) {
        this.router.navigate(['/home',this.language]);
      } else {
        this.failedLogin();
      }
    }

  });
} */
  
    async failedLogin() {
    let keysToTranslate = ['message_access_denied', 'message_User_or_password_invalids'];
    let translations = new Array();
    for(let i = 0; i < keysToTranslate.length; i++) {
      this.translate.get(keysToTranslate[i]).subscribe((res: string) => {
        console.log(res)
        translations.push(res);
      });
    }
    const alert = await this.alertController.create({
      header: 'Restaurateur Manager',
      subHeader: translations[0],
      message: translations[1],
      buttons: ['OK']
    });
    await alert.present();
  }

    englishLanguage() {
      this.translate.use('en');
      this.language = 'en';
      this.translate.get('user_placeholder').subscribe((res: string) => {
        this.userPlaceHolder = res;
      });
      this.translate.get('password_placeholder').subscribe((res: string) => {
        this.passwordPlaceHolder = res;
      });
    }
  
    spanishLanguage() {
      this.translate.use('es');
      this.language = 'es';
      this.translate.get('user_placeholder').subscribe((res: string) => {
        this.userPlaceHolder = res;
      });
      this.translate.get('password_placeholder').subscribe((res: string) => {
        this.passwordPlaceHolder = res;
      });
    }
}
