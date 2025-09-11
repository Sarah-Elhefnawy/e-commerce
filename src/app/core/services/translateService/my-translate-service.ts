import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {
  constructor(private _TranslateService: TranslateService, @Inject(PLATFORM_ID) id: object) {
    let defaultLang = 'en';
    if (isPlatformBrowser(id)) {
      const storedLang = localStorage.getItem('lang');
      if (storedLang !== null) {
        defaultLang = storedLang;
        this.changeLang(defaultLang);
      }
      this._TranslateService.setFallbackLang(defaultLang);
      this._TranslateService.use(defaultLang);
      this.changeLang(defaultLang);
    }
  }

  changeLang(lang: string) {
    // save localstorage
    localStorage.setItem('lang', lang)
    // set fallback
    this._TranslateService.setFallbackLang(lang)
    // use apply lang
    this._TranslateService.use(lang)
    // change direction
    this.changeDirection(lang)
  }

  changeDirection(lang: string) {
    if (lang === 'en') {
      document.dir = 'ltr'
    } else if (lang === 'ar') {
      document.dir = 'rtl'
    }
  }
}
