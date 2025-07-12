import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideRouter, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {
  LucideAngularModule,
  LogOut,
  Eye,
  Pencil,
  Trash,
  CircleCheck,
  CircleX,
  CircleAlert,
  Plus,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
} from 'lucide-angular';

import { authInterceptor } from './auth/interceptors/auth.interceptor';

const lucideIcons = {
  LogOut,
  Eye,
  Pencil,
  Trash,
  CircleCheck,
  CircleX,
  CircleAlert,
  Plus,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
};

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (
  http: HttpClient
) => new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'reload' })),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ]),
    importProvidersFrom(LucideAngularModule.pick({ ...lucideIcons })),
  ],
};
