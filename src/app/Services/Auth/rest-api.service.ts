import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/Environments/environment';

  const apiUrl = 'http://127.0.0.1:8000/api';


@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  public httpOptions: any;
  public token?: string;
  public loggued: any = false;
  public user: any;



  constructor(private http: HttpClient) { }

  login(data:any): Observable<any> {
    const url = `${apiUrl}/login`;
    return this.http.post(url, data).pipe();
  }

  register(data:any): Observable<any> {
    const url = `${apiUrl}/register`;
    return this.http.post(url, data).pipe();
  }
  profile(): Observable<any> {
    const url = `${apiUrl}/profile`;
    return this.http.get(url, this.httpOptions).pipe();
  }
  resetPassword(data:any): Observable<any> {
    const url = `${apiUrl}/change-password`;
    return this.http.post(url, data,this.httpOptions).pipe();
  }

  sendPasswordResetEmail(data:any): Observable<any> {
    const url = `${apiUrl}/send-reset-password-link`;
    return this.http.post(url, data).pipe();
  }
}
