import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  subscription: Subscription;

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this.subscription = this._authService.isLoggedIn
      .subscribe(
        isLoggedIn => {
          this.isLoggedIn = isLoggedIn
        }
      )

    let token = localStorage.getItem('token');
    console.log('token value :', token)
    console.log('loggedIn user value is:', this.isLoggedIn)
    if (this.isLoggedIn === undefined && token) {
      this._authService.getUser();
      this._authService.isLoggedIn.next(true);
    }
  }

  onLogIn() {
    this._router.navigate(['/sign-in'])
  }

  onLogout() {
    this._authService.logout()
      .subscribe(
        result => {
          console.log('response:', result)
          if (result.status === 200) {
            localStorage.removeItem('token')
            this._router.navigate([''])
          }
        },
        error => { console.log('logout error:', error) },
      )
  }

  onGetUserInfo() {
    let token = localStorage.getItem('token');
    if (token) {
      this._authService.getUser()
        .subscribe(
          result => console.log('user info result:', result)
        )
    }
  }

  onSignUp() {
    this._router.navigate(['/sign-up'])
  }

}
