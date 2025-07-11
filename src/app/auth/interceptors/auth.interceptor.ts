import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

import { AuthService } from '../services';
import { LanguageService } from '../services/language.service';

export const authInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);
  const languageService = inject(LanguageService);

  const token = authService.token();

  let headers = req.headers;

  headers = headers.append('Accept-Language', languageService.currentLang());

  if (token) {
    headers = headers.append('Authorization', `Bearer ${token}`);
  }

  const newReq = req.clone({
    headers,
  });

  return next(newReq);
};
