import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import Nora from '@primeuix/themes/material';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({ theme: { preset: Nora } }),
    provideHttpClient(withFetch()),
  ]
};
