import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { localKeys } from './core/constants/localStorage.keys';
import { LocalStorageService } from './core/services/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
 
  public appPages = [
    { title: 'CREATED_SESSIONS', url: '', icon: 'person-add' },
    { title: 'LANGUAGE', url: '', icon: 'language' },
    { title: 'SETTINGS', url: '', icon: 'settings' },
    { title: 'HELP', url: '', icon: 'help-circle' }
  ];
  constructor(
    private translate :TranslateService,
    private platform : Platform,
    private localStorage: LocalStorageService
  ) {
    this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      setTimeout(()=>{
        this.languageSetting();
      },1000);
      setTimeout(() => {
        document.querySelector('ion-menu').shadowRoot.querySelector('.menu-inner').setAttribute('style', 'border-radius:8px 8px 0px 0px');
      }, 2000);
    });
  }
  languageSetting() {
    this.localStorage.getLocalData(localKeys.SELECTED_LANGUAGE).then(data =>{
      if(data){
        this.translate.use(data);
      }
    }).catch(error => {
      this.setLanguage('en');
    })
  }

  setLanguage(lang){
    this.localStorage.setLocalData(localKeys.SELECTED_LANGUAGE,'en').then(data =>{
      this.translate.use(lang);
    }).catch(error => {
    })
  }
}
