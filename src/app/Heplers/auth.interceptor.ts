import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalService } from '../Services/Auth/local.service';
import { environment } from '../Environments/environment';

const excludedPaths: string[] = ['/Forgot-password', '/Reset-password', '/Register','/Login']; // Define paths to exclude here


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenStorage: LocalService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenStorage.getData("userApiKey2");
      const isApiUrl = request.url.startsWith(environment.apiUrl);

      const isExcludedPath = excludedPaths.some(excludedPath => request.url.includes(excludedPath));

      if (token && isApiUrl && !isExcludedPath) {
          request = request.clone({
              setHeaders: { Authorization: `Bearer ${token}` }
          });
          console.log(token)
      }

      return next.handle(request);
  }
}
