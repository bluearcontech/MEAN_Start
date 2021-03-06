import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  isLoggedIn = new Subject<boolean>();

  constructor(private _http: Http, private router: Router) { }

  signInUser(email: string, password: string) {
    let body = { username: email, password: password };
    let bodyString = JSON.stringify(body);
    let headers = new Headers({ 'Content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post('api/v1/login', body, options)
      .map(res => {
        if (res.status === 200) {
          this.isLoggedIn.next(true);
        } else {
          this.isLoggedIn.next(false);
        }
        return res.json()
      })
  }

  getUser() {
    let headers = new Headers({ 'Content-type': 'application/json' });
    let token = localStorage.getItem('token');
    headers.append('Authorization', `${token}`);
    let options = new RequestOptions({ headers: headers });
    return this._http.get('api/v1/getuser', options)
      .map(res => {
        if (res.status === 200) {
          this.isLoggedIn.next(true);
        }
        return res.json()
      })
  }

  logout() {
    let headers = new Headers({ 'Content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this._http.get('api/v1/logout', options)
      .map(res => {
        if (res.status === 200) {
          this.isLoggedIn.next(false);
        }
        return res
      })
  }

  signUpUser(email: string, password: string): Observable<Response> {
    let body = { username: email, password: password };
    let bodyString = JSON.stringify(body);
    let headers = new Headers({ 'Content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post('api/v1/register', body, options)
      .map(res => res.json())
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

}