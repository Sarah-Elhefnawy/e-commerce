import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";
import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { setTokenInterceptor } from './core/interceptors/setToken/set-token-interceptor';
import { errMsgInterceptor } from './core/interceptors/messageErr/err-msg-interceptor';
import { loadingInterceptor } from './core/interceptors/globalSpinner/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions(), withInMemoryScrolling()), provideClientHydration(withEventReplay()),
    provideAnimations(),
    NgxSpinnerModule,
    provideToastr(),
    provideHttpClient(withFetch(),withInterceptors([setTokenInterceptor,errMsgInterceptor,loadingInterceptor]))
  ]
};
